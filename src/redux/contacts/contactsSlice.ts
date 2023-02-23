import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import initialContacts from '../../data/contacts.json';

export interface Contact {
  id?: number | string;
  name: string;
  phone: number | string;
}

interface ContactsState {
  items: Contact[];
  filter: string;
}

const contactsItemsSlice = createSlice({
  name: 'items',
  initialState:
    JSON.parse(localStorage.getItem('contacts')!) || initialContacts || [],
  reducers: {
    handleAddContact: (state, action: PayloadAction<Contact>) => [
      ...state,
      action.payload,
    ],
    handleRemoveContact: (state, action: PayloadAction<number>) =>
      state.filter((contact: { id: number }) => contact.id !== action.payload),
  },
});

const contactsFilterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContact: (_, action: PayloadAction<string>) => action.payload,
  },
});
// console.log("contactsItemsSlice", contactsItemsSlice);
export const { handleAddContact, handleRemoveContact } =
  contactsItemsSlice.actions;
export const { filterContact } = contactsFilterSlice.actions;

const contactsReducer = combineReducers<ContactsState>({
  [contactsItemsSlice.name]: contactsItemsSlice.reducer,
  [contactsFilterSlice.name]: contactsFilterSlice.reducer,
});
export default contactsReducer;
