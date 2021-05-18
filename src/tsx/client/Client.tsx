import { io } from "socket.io-client";

class Client
{

	public socket: any;
	public port_data: any = [{ x :0 , y:0 }];
	public port_vector: any = [[{ x :0 , y:0 }], [{ x :0 , y:0 }], [{ x :0 , y:0 }]];
	public n: number;
	public shift_ena: boolean = false;

	constructor()
	{
		console.log(this.port_vector.length);

		var event = document.createEvent('Event');
		event.initEvent('updatePlots', true, true);
		let scope = this;

		this.n = 0;
		this.socket = io("http://127.0.0.1:9000");

		this.socket.on('connect', () => { console.log('Succesfully connected'); });
		this.socket.on('PortData', ({buffer}) => { 

			buffer.forEach(data => {

				if(data == buffer[0])
					return;

				data = new Uint8Array(data);
				var temp = (data[0] << 8) | data[1];
				var inc = (data[2] << 8) | data[3];
				var strain = (data[4] << 8) | data[5];

				this.port_vector[0].push({ x: this.n, y: temp });
				this.port_vector[1].push({ x: this.n, y: inc });
				this.port_vector[2].push({ x: this.n, y: strain });

				this.port_data.push({ x: this.n, y: temp  });
				this.n++;

				if(this.n > 1000)
					this.shift_ena = true;

				if(this.shift_ena){
					this.port_vector[0].shift();				
					this.port_vector[1].shift();				
					this.port_vector[2].shift();				
				}

			});

			document.dispatchEvent(event);

		});
	
	}

	ConnectPort(){ this.socket.emit('ConnectPort', { msg: 'Attemp to connect'}); }
	DisconnectPort(){ this.socket.emit('DisconnectPort'); console.log('PORT CLOSED');}

}

export default Client;