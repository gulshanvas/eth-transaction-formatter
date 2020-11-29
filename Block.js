const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/41ccb1927e724b32aad4cb29321d91b5');

async function getBlockInfo() {

  const blockInformation = await web3.eth.getBlock('latest', true);

  console.log('blockInformation :', JSON.stringify(blockInformation));

}


getBlockInfo().then(console.log).catch(console.log);