const Worker = require('worker_threads');
const Block = require('./Block');
const Blockchain = require('./Blockchain');

function postBlock(block) {
	const address = Worker.workerData[1];
	const address_env = process.env.ADDRESS.split(',');
	const e_Address = address_env || address;

   e_Address.forEach(async addr => {
		let response = await fetch(addr, {
         method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
         body: JSON.stringify(block)
		});
		let result = await response.json();
      if (response.ok) {
         return result;
      }
	});
}

function getBlock() {
	if (Worker.workerData[0].length === 0 || Worker.workerData[2] == 0){
		postBlock(Worker.workerData[0].createGenesisBlock());
	} else {
		postBlock(Worker.workerData[0].createBlock());
	}
}

getBlock();