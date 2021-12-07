import PropTypes from 'prop-types';

import ContactsItem from './ContactsItem';
import styles from './Contacts.module.scss';

function Contacts({ contctsList, onDelete }) {
  return contctsList.length > 0 ? (
    <ul>
      {contctsList.map(contactsItem => (
        <li key={contactsItem.id} className={styles.item}>
          <ContactsItem item={contactsItem} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No contacts here</p>
  );
}

Contacts.propTypes = {
  contctsList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contacts;
