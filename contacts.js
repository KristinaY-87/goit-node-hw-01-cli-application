const fs = require("fs/promises");
const path = require("path");
const { v4 } = require('uuid');
 
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async() =>{
    
    try {
      const data = await fs.readFile(contactsPath)
      const contacts = JSON.parse(data);
      // console.table(contacts);
      return contacts;
    }
    catch (error) {
        throw error;
    }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const selectContact = contacts.find(item => item.id === Number(contactId))
      if (!selectContact) {
        throw new Error(`Contacts with id= ${contactId} not found`)
    }
    // console.table(selectContact);
      return selectContact;     
    }
    catch (error) {
        throw error;
  };
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(contactId));
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const newContacts = contacts.filter(item => item.id !== Number(contactId))
    // const delContact = contacts.splice(idx, 1);
    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);

    // console.table(newContacts);

    return contacts[idx]
  }
    catch (error) {
        throw error;
  };
}

async function addContact(name, email, phone) {
  try {
    const data = {name, email, phone}
    const newContact = { ...data, id: v4() };
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact]
    //contacts.push(newContact);
    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);
    // console.table(newContact);
    return newContact;
  }
  catch (error) {
        throw error;
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};