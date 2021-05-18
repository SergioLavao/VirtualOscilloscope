const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const http = require('http');

const PORT = 9000;
var port;
var dem = 0xA;
var counterBuffer = 0;

var BufferTX = [];

const server = http.createServer();
const app = express();
server.on('request', app);

const io = require('socket.io')(server,{
	 cors:true,
	 origins:["http://127.0.0.1:8000"],
});

io.on('connection', socket =>{ 

	console.log('Web Application Connected!'); 
	let counter = 0;

	socket.on('ConnectPort', data => { 
		
		port = new SerialPort('COM10');
		var parser = port.pipe(new Delimiter({ delimiter: '\r\n' }));

		parser.on('data', function(data){

			BufferTX[counterBuffer] = data;

			if(counterBuffer >= 5){
				counterBuffer = 0;
				socket.emit('PortData', { buffer: BufferTX });
			}
			counterBuffer++;

		})

	});

	socket.on('DisconnectPort', () => {

		console.log('COM10 Disconnected');
		port.close();

	}); 

});

server.listen(PORT, () =>
	console.log(chalk.italic.magenta(`Server listening on ${PORT}...`)));