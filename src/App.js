import React from 'react';
import Board from './components/Board.js';

const switches = {
    "1": "Switch 1",
    "2": "Switch 2",
    "3": "Switch 3"
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ws = new WebSocket("ws://127.0.0.1:4444");
    }
    render() {
        return (
		<Board ws={this.ws} switches={switches}/>
        )
    }
}
export default App;
