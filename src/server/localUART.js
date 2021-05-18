const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const path = require('path');

var port = new SerialPort('COM10');

var parser = port.pipe(new Delimiter({ delimiter: '\r\n' }));

parser.on('data', function(data){

	console.log(data);

})

