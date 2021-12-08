import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Phonebook.module.scss';
import Contacts from './Contacts';
import AddContact from './AddContact';
import Filter from './Filter';

class Phonebook extends Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    let contacts = localStorage.getItem('contacts');
    if (contacts) {
      contacts = JSON.parse(contacts);
      this.setState({
        contacts: [...contacts],
      });
    }
  }

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleOnFiler = event => {
    this.setState({ filter: event.target.value });
  };

  handleDeleteContact = id => {
    this.setState(previousState => ({
      contacts: previousState.contacts.filter(contactItem => contactItem.id !== id),
    }));
    console.log(this.state.contacts);
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
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
    const isShowFilter = contacts.length > 1;

    return (
      <div className={styles.componenet}>
        <h1 className={styles.title}>Phonebook</h1>
        <AddContact onSubmit={this.handleAddContact} />
        <h2 className={styles.title}>Contacts</h2>
        {isShowFilter && <Filter filter={filter} onChange={this.handleOnFiler} />}
        <Contacts contctsList={contacts} onDelete={this.handleDeleteContact} />
      </div>
    );
  }
}

export default Phonebook;
