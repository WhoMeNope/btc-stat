const fetch = require('node-fetch');

function getBlockData(hash) {
  return fetch('https://blockchain.info/rawblock/' + hash)
  .then(res => res.json())
  .then(json => {
    return {
      hash: json.hash,
      prevBlock: json.prev_block,
      blockIndex: json.block_index,
      nonce: json.nonce,
      height: json.height,
      time: json.time
    };
  });
}

function getFirstFour(hash) {
  let s = hash.replace(/^0*/, '');
  return s.substring(0, 4);
}

//MAIN
const latestHash = '000000000000000000034e14858fe38d433b83905379aeaa695fee871822887d';
const searchTerm = '21e8';
(function checkBlock(hash) {
  getBlockData(hash)
    .then(data => {
      let prefix = getFirstFour(data.hash);
      console.log(prefix);
      if(prefix != searchTerm) {
        checkBlock(data.prevBlock);
      }
    });
}
(latestHash));

