import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { Form, FormLabel, Input } from './ContactForm.styled';
import { contactsActions } from '../../redux/contacts';

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector((state: any) => state.contacts.items);
  const [form, setForm] = useState({
    name: '',
    phone: '',
  });

  const handleChangeForm = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const { name, phone } = form;

  const isUniqueContact = () => {
    const isExistContact = contacts.find(
      (contact: { name: string }) => contact.name === name
    );
    if (isExistContact) {
      Notify.failure('Contact is already exist');
    }
    return !isExistContact;
  };
  const validateForm = () => {
    if (!name || !phone) {
      Notify.failure('Some field is empty');
      return false;
    }
    return isUniqueContact();
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValidateForm = validateForm();
    if (!isValidateForm) return;
    dispatch(contactsActions.handleAddContact({ id: nanoid(10), name, phone }));
    Notify.success('Contact is add phonebook');
    const resetForm = () => setForm({ name: '', phone: '' });
    resetForm();
  };

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormLabel>
        Name
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChangeForm}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <Input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={handleChangeForm}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>
      <button type="submit">Add contact</button>
    </Form>
  );
}
export default ContactForm;

// ----------REDUX------------------------
// ContactForm.propTypes = {
//   onAddContact: PropTypes.func.isRequired,
//   // onCheckUnique: PropTypes.func.isRequired,
// };

// export default ContactForm;
// const mapStateToProps = state => ({
//   contacts: state.contacts,
// });

// const mapDispatchToProps = dispatch => ({
//   onAddContact: contact => dispatch(handleAddContact(contact)),
// });

// export default connect(null, mapDispatchToProps)(ContactForm);
