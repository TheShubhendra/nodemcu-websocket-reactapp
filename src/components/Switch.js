import React from 'react';
import './Switch.sass';

class Switch extends React.Component{
    render(){
        return (
<div data-id={this.props.id} className={this.props.is_on ? 'switch-bar switch-on' : 'switch-bar switch-off'} >
    <div className="sub">
        <div className="led"></div>
        <div className="switch-name">{this.props.name}</div>
    </div>
    <div className="toggle" onClick={(e)=> this.props.toggle(e, this.props.id)}>
        <div className="toggle-btn"></div>
    </div>
</div>
            )
    }
}
export default Switch;
