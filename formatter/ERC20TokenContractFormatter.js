const ERC20TokenArtifact = require('../contracts/abis/ERC20Token.json');
const Helper = require('../lib/Helper');
const Web3Wrapper = require('../lib/Web3Wrapper');

/**
 * ERC20 token formatter
 */
class ERC20TokenContractFormatter {

  /**
   * Constructor
   * @param {*} params 
   * @param {object} params.blockInfo 
   */
  constructor(params) {
    this.blockInfo = params.blockInfo;
  }

  /**
   * Formats the response 
   */
  async format() {
    const ins = [];

    const outs = [];

    for (let index = 0; index < this.blockInfo.transactions.length; index++) {
      const transaction = this.blockInfo.transactions[index];

      // 'to' address is null when transaction is for contract creation.
      if (!transaction.to) {
        continue;
      }
      const isAccountAddress = await Web3Wrapper.isAccountAddress(transaction.to);

      // If contract address then skip
      if (!isAccountAddress && this._isTransferMethodId(transaction.input)) {
        const receipt = await Web3Wrapper.getTransactionReceipt(transaction.hash);
      
        // if transaction is in failed state.
        if (!receipt.status) {
          continue;
        }

        // decode the transaction receipt
        const decodedReceipt = Helper.decodeReceipt(ERC20TokenArtifact.abi, receipt);

        for (let i = 0; i < decodedReceipt.length; i++) {
          const eachReceipt = decodedReceipt[i];

          if (eachReceipt.name === 'Transfer') {
            const from = eachReceipt.events[0].value;
            const to = eachReceipt.events[1].value;
            const transferAmount = eachReceipt.events[2].value;

            ins.push({
              "address": to,
              "value": transferAmount,
              "type": "token",
              "coinspecific": {
                "tokenAddress": eachReceipt.address
              }
            });

            outs.push({
              "address": from,
              "value": transferAmount,
              "type": "token",
              "coinspecific": {
                "tokenAddress": eachReceipt.address
              }
            });
          }
        }
      }
    }

    return {
      "block": {
        blockHeight: this.blockInfo.number
      },
      "hash": this.blockInfo.hash,
      "currency": "ETH",
      "state": this.blockInfo.number ? "confirmed" : "pending",
      "depositType": "Contract",
      ins,
      outs,
      "chain": await Web3Wrapper.getNetwork()
    }
  }

  /**
   * It checks whether the method call is transfer method of ERC20Token standard.
   * @param {string} inputData 
   */
  _isTransferMethodId(inputData) {

    // "0xa9059cbb" : method prefix in solidity for transfer method of ERC20 token
    return inputData.substring(0, 10) === "0xa9059cbb";

  }

}

module.exports = ERC20TokenContractFormatter;