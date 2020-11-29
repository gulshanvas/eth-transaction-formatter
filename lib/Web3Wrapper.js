const Web3 = require('web3');

const web3Url = process.env.WEB3_URL;

const web3 = new Web3(web3Url);

/**
 * It is wrapper over web3 calls.
 */
class Web3Wrapper {

  /**
   * It fetches block information
   * 
   * @param {*} number Blocknumber Number or hash of the block
   * @param {*} isTransactionObjectRequired if true it fetches the transaction information
   */
  static async getBlockInfo(number = 'latest', isTransactionObjectRequired) {
    const blockInformation = await web3.eth.getBlock(number, isTransactionObjectRequired);

    return blockInformation;

  }

  /**
   * It determines if the address is an account address.
   * 
   * @param {string} address 
   */
  static async isAccountAddress(address) {
    // TODO: in-memory cache

    const code = await web3.eth.getCode(address);

    return code === '0x';

  }

  /**
   * It fetches transaction hash.
   * 
   * @param {string} transactionHash 
   */
  static async getTransactionInfo(transactionHash) {

    const transactionObject = await web3.eth.getTransaction(transactionHash);

    return transactionObject;

  }

  /**
   * It fetches network name to which the application is connected.
   */
  static async getNetwork() {
    return web3.eth.net.getNetworkType();
  }

  /**
   * It fetches transaction receipt.
   * 
   * @param {string} transactionHash Hash of the transaction
   */
  static async getTransactionReceipt(transactionHash) {
    const receipt = await web3.eth.getTransactionReceipt(transactionHash);

    return receipt;
  }
}

module.exports = Web3Wrapper