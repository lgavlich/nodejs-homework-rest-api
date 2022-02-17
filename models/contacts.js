
const { Schema, model } = require("mongoose");

const Joi = require("joi");

const phoneRegexp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    
  },
});

const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchema,
  },

const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [delContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return delContact;
};

const addContact = async (name, email, phone) => {
  const newContact = { name, email, phone, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, name, email, phone };
  await fs.writeFile(contactPath.JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,

};
