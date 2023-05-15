const express = require('express');
const Worker = require('worker_threads'); 
const Block = require('./Block');
const Blockchain = require('./Blockchain');

class Server{

	constructor(id){
		this.id = id;
		this.port = process.env.PORT || (3000 + id);
		this.blockchain = new Blockchain();
		this.app;
		this.worker;
	}

	getAddress(){
		const id = this.id;
		let address = [];
		switch(id){
			case 0: {
				address[0] = 'http://localhost:3000';
				address[1] = 'http://localhost:3001';
				address[2] = 'http://localhost:3002';
				break;
			};
			case 1: {
				address[0] = 'http://localhost:3001';
				address[1] = 'http://localhost:3000';
				address[2] = 'http://localhost:3002';
				break;
			};
			case 2: ;
				address[0] = 'http://localhost:3002';
				address[1] = 'http://localhost:3000';
				address[2] = 'http://localhost:3001';
				break;
		}
		return address;
	}

	serverStart(){
		this.worker = new Worker('Worker.js', { workerData: [this.blockchain, this.getAddress(), 0]});
		this.app = express();
		app.use(express.json());
		app.post('/', function(req, res) { 
			 const block = req.body;
			 if (this.blockchain.addBlock(block)) {
				console.log('Block added');
				this.worker.postMessage(this.blockchain);
			 } else {
				console.log('Block was not added');
			 }
			 res.status(200).json({message: 'ok'})
		})
		app.listen(this.port, () => {
			console.log(`Server ${this.id} listening on port ${this.port}`)
		})
	}

	async serverStop(){
		await this.worker.terminate();
		this.app.close();
	}
}