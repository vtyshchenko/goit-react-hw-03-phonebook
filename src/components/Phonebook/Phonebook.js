import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Phonebook.module.scss';
import Contacts from './Contacts';
import AddContact from './AddContact';
import Filter from './Filter';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired,
    ),
    filter: PropTypes.string,
  };

  handleAddContact = ({ id, name, number }) => {
    const { contacts } = this.state;

    if (contacts.find(contact => name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${name} is alredy in contacts`);
    } else {
      this.setState({
        contacts: [...contacts, { id, name, number }],
      });
    }
  };

  handleOnFiler = event => {
    this.setState({ filter: event.target.value });
  };

  handleDeleteContact = id => {
    this.setState(previousState => ({
      contacts: previousState.contacts.filter(contactItem => contactItem.id !== id),
    }));
  };

  getFilteredContacts(filterLC, contacts) {
    return contacts.filter(contactItem => contactItem.name.toLowerCase().includes(filterLC));
  }

  getContacts() {
    const { contacts, filter } = this.state;
    const filterLC = filter.toLowerCase();
    return this.getFilteredContacts(filterLC, contacts);
  }

  render() {
    const { filter } = this.state;
    const contacts = this.getContacts();

    return (
      <div className={styles.componenet}>
        <h1 className={styles.title}>Phonebook</h1>
        <AddContact onSubmit={this.handleAddContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleOnFiler} />
        <Contacts contctsList={contacts} onDelete={this.handleDeleteContact} />
      </div>
    );
  }
}

export default Phonebook;
