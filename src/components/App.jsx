import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { PhoneForm } from './phoneForm/PhoneForm';
import { ContactList } from './contactList/ContactList';
import { FilterContact } from './filterContact/FilterContact';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(`contacts`, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    setContacts(savedContacts());
  }, []);

  const savedContacts = () => {
    const listSaveContacts = JSON.parse(localStorage.getItem(`contacts`));
    if (listSaveContacts.length > 0) return listSaveContacts;
    return [];
  };

  const addContacts = newContact => {
    const isexsist = contacts.find(
      contactName =>
        contactName.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isexsist) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(), ...newContact }]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(cont => cont.id !== contactId));
  };

  const changeFilter = newfilter => {
    setFilter(newfilter);
  };

  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibeleItem = getVisibleContact();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 40,
        color: '#010101',
        alignItems: `flex-start`,
        padding: `35px`,
      }}
    >
      <h1>Phonebook</h1>
      <PhoneForm onAdd={addContacts} />
      <h2>Contacts</h2>
      <FilterContact filter={filter} onChangeFilter={changeFilter} />
      <ContactList items={visibeleItem} onDelete={deleteContact} />
    </div>
  );
};
