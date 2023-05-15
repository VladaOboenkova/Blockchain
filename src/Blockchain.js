const Block = require('./Block');

class Blockchain{

	constructor(){
		this.chain = [];
	}

	getLastBlock(){
		return this.chain.at(-1);
	}
	
	createGenesisBlock(){
		return new Block(0, '0')
	}

	createBlock(){
		const prev_block = this.getLastBlock();
		return new Block(prev_block.index + 1, prev_block.hash);
	}

	addBlock(newBlock){
		if (this.blockIsValid(newBlock, this.getLastBlock())) {
			 this.chain.push(newBlock);
			 return true;
		}
		return false;
  	};

  	blockIsValid(block, last_block){
		if (block.index !== last_block.index + 1) {
			return false;
	  } else if (block.prev_hash !== last_block.hash) {
			return false;
	  } 
	  return true;
 	};	
}

module.exports = Blockchain;