import React from 'react';
import Board from './components/Board.js';

class App extends React.Component{
constructor(props){
	super(props);
	this.ws = new WebSocket("ws://127.0.0.1:4444");
}
render(){
return (
	<Board ws={this.ws} />
)
}
}
export default App;
