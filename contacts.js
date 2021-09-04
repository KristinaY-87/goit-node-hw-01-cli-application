const fs = require("fs/promises");
const path = require("path");
 
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async() =>{
    
    try {
      const data = await fs.readFile(contactsPath)
      const contacts = JSON.parse(data);
      console.table (contacts);
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
    console.log(selectContact);
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
    const delContact = contacts.splice(idx, 1);
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);

    console.table(delContact);

    return delContact
  }
    catch (error) {
        throw error;
  };
}

async function addContact(name, email, phone) {
  try {
    const data = { name, email, phone };
    const contacts = await listContacts();
     function getNextUniqId(arr) {
      return Math.max(...arr.map((contact) => contact.id)) + 1
    }
    const newContact = {id: getNextUniqId(contacts), ...data};
    contacts.push(newContact);
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
 
    console.table(contacts);
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