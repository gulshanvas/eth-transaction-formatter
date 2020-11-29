const ServiceBase = require('./Base');
const accountConstants = require('../constants/account');
const Web3Wrapper = require('../lib/Web3Wrapper');

const AccountFormatter = require('../formatter/AccountFormatter');
const ERC20TokenContractFormatter = require('../formatter/ERC20TokenContractFormatter');

/**
 * It fetches based on block hash formats the transactions.
 */
class Transaction extends ServiceBase {

  /**
   * Constructor
   * 
   * @param {*} params 
   * @param {*} params.type ACCOUNT/CONTRACT 
   * @param {*} params.txId Hash of the block
   */
  constructor(params) {
    super(params);
    console.log('params.type :', params.type);
    console.log('params.txId :', params.txId);

    this.type = params.type;

    this.transactionId = params.txId;

    this.blockInfo = {};

    this.formattedResponse = {};

  }

  /**
   * Main performer of the class.
   */
  async perform() {

    this._validateType();

    await this._fetchBlockInfo();

    if (accountConstants.contract === this.type) {

      await this._formatContractResponse();

    } else if (accountConstants.account === this.type) {

      await this._formatAccountResponse();

    }

    return this._prepareResponse();
  }

  /**
   * Validates the type of the request.s
   */
  _validateType() {
    if (!(this.type === accountConstants.contract ||
      this.type === accountConstants.account)) {

      throw new Error(`Unsupported type ${this.type}`);

    }
  }

  /**
   * Fetches block information based on transaction hash of the block.
   */
  async _fetchBlockInfo() {

    // TODO: validate transaction id -- basic sanitation checks
    this.blockInfo = await Web3Wrapper.getBlockInfo(this.transactionId, true);

    console.log('this.blockInfo : ', this.blockInfo);

  }

  /**
   * Formats the transactions of the block if the type is 'CONTRACT'
   */
  async _formatContractResponse() {
    this.formattedResponse = await new ERC20TokenContractFormatter({ blockInfo: this.blockInfo }).format();
  }

  /**
   * Formats the transactions of the block if the type is 'ACCOUNT'
   */
  async _formatAccountResponse() {

    this.formattedResponse = await new AccountFormatter({ blockInfo: this.blockInfo }).format();

  }

  /**
   * Prepares response
   */
  _prepareResponse() {

    return {
      serviceResponse: this.formattedResponse
    };
  }
}

module.exports = Transaction;