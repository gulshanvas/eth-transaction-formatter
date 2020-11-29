const Web3Wrapper = require("../lib/Web3Wrapper");

/**
 * Account formatter
 */
class AccountFormatter {

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

      const isAccountAddress = await Web3Wrapper.isAccountAddress(transaction.to);

      if (isAccountAddress) {
        ins.push({
          "address": transaction.to,
          "value": transaction.value
        });

        outs.push({
          "address": transaction.from,
          "value": transaction.value
        });
      }

    }

    return {
      "block": {
        blockHeight: this.blockInfo.number
      },
      "hash": this.blockInfo.hash,
      "currency": "ETH",
      "state": this.blockInfo.number ? "confirmed" : "pending",
      "depositType": "account",
      ins,
      outs,
      "chain": await Web3Wrapper.getNetwork()
    }

  }

}

module.exports = AccountFormatter;