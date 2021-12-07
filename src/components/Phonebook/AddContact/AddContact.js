import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { Component } from 'react';

import styles from './AddContact.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class AddContact extends Component {
  state = {
    ...INITIAL_STATE,
  };

  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const id = nanoid();
    this.props.onSubmit({ ...this.state, id });
    this.reset();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="John Jonson"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </label>

        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            placeholder="123-55-66"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </label>
        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default AddContact;
