import PropTypes from 'prop-types';

import styles from './Filter.module.scss';

function Filter({ onChange, filter }) {
  return (
    <>
      <label className={styles.label}>
        Find contscts by name
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="John Jonson"
          value={filter}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onChange}
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
};

export default Filter;
