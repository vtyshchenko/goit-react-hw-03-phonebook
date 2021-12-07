import styles from './ContactsItem.module.scss';
import PropTypes from 'prop-types';

const ContactsItem = ({ item, onDelete }) => (
  <>
    <span>
      {item.name}: {item.number}
    </span>

    <button className={styles.button} type="button" onClick={() => onDelete(item.id)}>
      Delete
    </button>
  </>
);

ContactsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsItem;
