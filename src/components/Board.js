import React from "react";
import Switch from "./Switch";

class Board extends React.Component {
    constructor(props) {
        super(props);
	var switches = {}
        for (let id in this.props.switches){
	   switches[id] = {isOn: false, isLoading: true};
	}
	Object.keys(this.props.switches).map((id) =>
		({id: id, isOn: false, isLoading: true}));
        this.state = {
            switch: switches
	}
        this.props.ws.onmessage = this.handleWebhook;
    }
    handleWebhook = (event) => {
        var data = JSON.parse(event.data);
	var currentState;
        if (data.state === "on") {
            currentState = true;
        } else if (data.state === "off") {
            currentState = false;
        }
	var _switch = this.state.switch;
	_switch[data.id].isOn = currentState;
	_switch[data.id].isLoading = false;
        this.setState({switch:_switch});
    };
    toggle = (e, id) => {
        var data = { id: id, toggle: this.state.switch[id].isOn ? "off" : "on" };
	var _switch = this.state.switch;
	_switch[id].isLoading = true;
	this.setState({switch:_switch});
        this.props.ws.send(JSON.stringify(data));
    };
    render() {
        const switch_comps = Object.keys(this.props.switches).map((id) => (
            <Switch
                id={id}
                name={this.props.switches[id]}
                toggle={this.toggle}
                isOn={this.state.switch[id].isOn}
		isLoading={this.state.switch[id].isLoading}
            />
        ));
        return <div className="switch-container"> {switch_comps} </div>;
    }
}
export default Board;
