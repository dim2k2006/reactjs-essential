import React from 'react';
import Contact from '../Contact/Contact.jsx';
import style from './style.css';

const CONTACTS = [
    {
        id: 1,
        name: 'Dart Vader',
        address: 'Иллинойс',
        email: 'dart@empire.com',
        phoneNumber: '+23423423423',
        image: 'images/darth.gif'
    },
    {
        id: 2,
        name: 'Princess Leia',
        address: 'Шиото',
        email: 'leia@empire.com',
        phoneNumber: '+93949523',
        image: 'images/leia.gif'
    },
    {
        id: 3,
        name: 'Luke Skywalker',
        address: 'Майло-Гроган',
        email: 'luke@empire.com',
        phoneNumber: '+5553392220',
        image: 'images/luke.gif'
    },
    {
        id: 4,
        name: 'Chewbacca',
        address: '4227 E Broad St',
        email: 'chuwi@empire.com',
        phoneNumber: '+9994445588',
        image: 'images/chewbacca.gif'
    }
];

const ContactList = React.createClass({
    getInitialState: function() {
        return {
            displayedContact: CONTACTS
        };
    },

    handleSearch: function(event) {
        var searchQuery = event.target.value.toLocaleLowerCase();
        var displayedContacts = CONTACTS.filter(function(item) {
            var searchValue = item.name.toLocaleLowerCase();

            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedContact: displayedContacts
        });
    },

    render: function() {
        return (
            <div className="contacts">
                <input type="text" className="search-field" onChange={this.handleSearch} />
                <ul className="contacts-list">
                    {
                        this.state.displayedContact.map(function(item) {
                            return <Contact
                                key={item.id}
                                name={item.name}
                                phoneNumber={item.phoneNumber}
                                address={item.address}
                                email={item.email}
                                image={item.image}
                            />;
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = ContactList;