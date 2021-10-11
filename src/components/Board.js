import React from "react";
import Switch from "./Switch";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_on: Object.keys(this.props.switches).map((id) => (id: false)),
        };
        this.props.ws.onmessage = this.handleWebhook;
    }
    handleWebhook = (event) => {
        var data = JSON.parse(event.data);
        var is_on = this.state.is_on;
        var state_on;
        if (data.state === "on") {
            state_on = true;
        } else if (data.state === "off") {
            state_on = false;
        }
        is_on[data.id] = state_on;
        this.setState({ is_on: is_on });
    };
    toggle = (e, id) => {
        var data = { id: id, toggle: this.state.is_on[id] ? "off" : "on" };
        this.props.ws.send(JSON.stringify(data));
    };
    render() {
        const switch_comps = Object.keys(this.props.switches).map((id) => (
            <Switch
                id={id}
                name={this.props.switches[id]}
                toggle={this.toggle}
                is_on={this.state.is_on[id]}
            />
        ));
        return <div className="switch-container"> {switch_comps} </div>;
    }
}
export default Board;
