import React from 'react';

const Contact = React.createClass({
    getInitialState: function() {
        return {
            isOpened: false
        };
    },

    handleClick: function() {
        this.setState({
            isOpened: !this.state.isOpened
        });
    },

    render: function() {
        var address = (this.state.isOpened) ? <div className="contact-address">{this.props.address}</div> : '' ;
        var email = (this.state.isOpened) ? <div className="contact-email">{this.props.email}</div> : '' ;

        return (
            <li className="contact" onClick={this.handleClick}>
                <img className="contact-image" src={this.props.image} width="60px" height="60px" />
                <div className="contact-info">
                    <div className="contact-name">{this.props.name}</div>
                    <div className="contact-number">{this.props.phoneNumber}</div>
                    {address}
                    {email}
                </div>
            </li>
        );
    }
});

module.exports = Contact;