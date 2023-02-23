import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { ButtonDelete, ContactListLi } from './ContactListItem.styled';
import { contactsActions } from '../../../redux/contacts';

interface Props {
  id: any;
  name: string;
  phone: string;
}

function ContactListItem({ name, phone, id }: Props) {
  const dispatch = useDispatch();

  const handleRemoveContact = () => {
    dispatch(contactsActions.handleRemoveContact(id));
    Notify.success('Contact is delete');
  };

  return (
    <ContactListLi>
      {name}: {phone}
      <ButtonDelete onClick={handleRemoveContact}>Delete</ButtonDelete>
    </ContactListLi>
  );
}

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ContactListItem;

// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Notify } from 'notiflix';
// import { ButtonDelete, ContactListLi } from './ContactListItem.styled';
// import { contactsActions } from '../../../redux/contacts';

// function ContactListItem({ name, phone, id }) {
//   const dispatch = useDispatch();

//   return (
//     <ContactListLi>
//       {name}: {phone}
//       <ButtonDelete
//         onClick={() =>
//           dispatch(
//             contactsActions.handleRemoveContact(id),
//             Notify.success('Contact is delete')
//           )
//         }
//       >
//         Delete
//       </ButtonDelete>
//     </ContactListLi>
//   );
// }
// ContactListItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
// };
// export default ContactListItem;
