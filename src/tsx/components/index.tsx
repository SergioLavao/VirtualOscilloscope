import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import Toggle from './PORTHandler';
import Client from '../client/Client';
import XYGraph from './XYGraph';

type Props = { client: Client };
type States = {};

class Header extends React.Component<Props , States> {

  constructor( props:any ) {
    
    super(props);

  }

  render() {

	return(
	<nav className="navbar navbar-default navbar-fixed-top">
		<h2>Virtual Osciloscope</h2>
		<Toggle client={this.props.client}/>
	</nav>);

  }

}

export default Header;