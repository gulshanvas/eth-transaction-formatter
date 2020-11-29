## ETH Transaction parser

## Pre-requisite :
1. Node.js > 11
2. npm > 6

### Steps to be followed for running the application
1. npm install
2. Provide the value for `WEB3_URL` at env.sh with web3 endpoint(ropsten, goerli, ethereum mainnet)
3. source env.sh 
4. import `eth-transaction-formatter.postman_collection.json` file in postman.


### Note :
1. Query param `type` in the api is used to determine whether formatting for ERC20 token contract's transfer method or account is to be done.
2. There are two possible values for `type` params. They are `ACCOUNT` and `CONTRACT`.
3. Application runs on `http://localhost:8080`.
