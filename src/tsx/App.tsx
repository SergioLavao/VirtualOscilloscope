import * as React from 'react';
import Client from './client/Client';
import Header from './components/index';
import XYGraph from './components/XYGraph';

type Props = {};
type States = { value: any };

class App extends React.Component<Props , States> {

	public client : Client;

	constructor( props:any )
	{

		super( props );
	    this.state = { value : false };
		this.client = new Client();

	}

	render() {
		return(
			<div className="container-fluid">
	    		<Header client={this.client} />
	    		<XYGraph initialData={ [this.client.port_vector] }/>
			</div>);
	}

}

export default App;