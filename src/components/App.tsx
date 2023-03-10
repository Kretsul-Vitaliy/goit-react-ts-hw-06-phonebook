import GlobalStyle from '../theme/GlobalStyle.styled';
import ContactForm from '../components/ContactForm/ContactForm';
import Section from '../components/Section';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';
import { FC } from 'react';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <h3>Find contacts by name</h3>
        <Filter />
        <ContactList />
      </Section>
    </>
  );
};

export default App;
