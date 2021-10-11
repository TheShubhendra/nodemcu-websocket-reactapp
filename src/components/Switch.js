import React from 'react';
import './Switch.sass';

class Switch extends React.Component{
    render(){
        return (
<div data-id={this.props.id} className={this.props.isOn ? 'switch-bar switch-on' : 'switch-bar switch-off'} >
    <div className="sub">
        <div className="led"></div>
        <div className="switch-name">{this.props.name}</div>
    </div>
    <div className="toggle" onClick={(e)=> this.props.toggle(e, this.props.id)}>
        <div className="toggle-btn">
		<i className={this.props.isLoading ? "fa fa-spinner fa-spin spinner": " "}></i>
	</div>
    </div>
</div>
            )
    }
}
export default Switch;
