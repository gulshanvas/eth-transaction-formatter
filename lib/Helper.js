const abiDecoder = require('abi-decoder');

/**
 * Class contains helper methods.
 */
class Helper {

  /**
   * It decode the logs in the receipt
   * @param {array<object>} abi Abi of the contract
   * @param {object} receipt Transaction receipt
   */
  static decodeReceipt(abi, receipt) {
    abiDecoder.addABI(abi);

    return abiDecoder.decodeLogs(receipt.logs);

  }

}

module.exports = Helper;