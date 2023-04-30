const { createHash } = require('crypto');

class Block {

	constructor (index, prev_hash){
		this.index = index;
		this.prev_hash = prev_hash;
		this.data = this.getData();
		this.nonce = 0;
		this.hash = this.getHash();
	}

	getHash() {
		let string = this.index + this.prev_hash + this.data;
		let string_with_nonce = string + this.nonce;
		let hash = createHash('sha256').update(string_with_nonce).digest('hex');
		while (!hash.endsWith('0000')) {
			this.nonce++;
			string_with_nonce = string + this.nonce;
			hash = createHash('sha256').update(string_with_nonce).digest('hex');
		}
		return hash;
	}

	getData(){
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let str = '';
		for (let i = 0; i < 256; i++) {
			str += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return str;
	}
}

