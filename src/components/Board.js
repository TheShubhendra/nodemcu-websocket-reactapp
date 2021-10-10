import React from 'react';
import Switch from './Switch';
class Board extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			is_on: {"1":false}
		};
		this.props.ws.onmessage = this.handleWebhook;
	}
handleWebhook = (event) =>{
        var data = JSON.parse(event.data);
	var is_on = this.state.is_on;
        is_on[data.id] = data.is_on;
        this.setState({"is_on":is_on});
}
toggle = (e, id)=>{
        var data = {id:id, is_on: !this.state.is_on[id]};
	this.props.ws.send(JSON.stringify(data));
    }
render(){
	return (
	<Switch id="1" name="Fan1" toggle={this.toggle} is_on={this.state.is_on["1"]} />
	)
}
}
export default Board;
