import React from 'react';
import Client from '../client/Client';

type Props = { client:Client };
type States = { isConnected: boolean, client: Client };

class Toggle extends React.Component<Props , States> {

  constructor( props:any ) {
    
    super(props);
    this.state = { isConnected: false , client: props.client };
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {

    this.state.isConnected ? this.props.client.DisconnectPort() : this.props.client.ConnectPort();
    this.setState(state => ({ isConnected: !state.isConnected })); 

  }

  render() {
    return (
      <button onClick={this.handleClick} className={this.state.isConnected ? 'btn btn-danger' : 'btn btn-success'}>
      {this.state.isConnected ? 'Disconnect[COM10]' : 'Connect[COM10]'}
      </button>
    );
  }

}

export default Toggle;