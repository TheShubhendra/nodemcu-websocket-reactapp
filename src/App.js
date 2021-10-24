import React from 'react';
import Board from './components/Board.js';

const switches = {
    "0": "Switch 0",
    "1": "Switch 1",
    "2": "Switch 2",
    "3": "Switch 3",
    "4": "Switch 4",
    "5": "Switch 5",
    "6": "Switch 6",
    "7": "Switch 7",
    "8": "Switch 8",
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ws = new WebSocket(`ws://${window.location.hostname}/ws`);
    }
    render() {
        return (
		<Board ws={this.ws} switches={switches}/>
        )
    }
}
export default App;
