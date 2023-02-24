const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const e = require("express");

// GET  contacts
router.get('/', (req, res, next) => {
    Contact.find((err, contacts) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).json({ error: 'Could not retrieve contacts.' });
        } else {
            res.json({title:"Liste des contacts", contacts: contacts});
        }
    });
});


router.post('/', (req, res, next) => {
    const contact = new Contact({
        fullname: req.body.contactName,
        phone: req.body.contactPhone
    });

    contact.save((err, newContact) => {
        if (err) {
            console.log('there is an error : ',err);
            res.status(500).json({ error: 'Could not create contact.' });
        }
        else {
            res.json(newContact);
        }
    });
});


router.delete('/:id', (req, res, next) => {
    const contactId = req.params.id;
    Contact.findByIdAndRemove(contactId, (err, removedContact) => {
        if (err) {
            console.log('there is an error: ', err);
            res.status(500).json({ error: 'Could not delete contact.' });
        } else {
            res.json(removedContact);
        }
    });
});



router.put('/:id', (req, res, next) => {
    const contactId = req.params.id;
    console.log('Updating contact with ID:', contactId);
    console.log('New contact data:', req.body);

    Contact.findByIdAndUpdate(contactId, { fullname: req.body.contactName, phone: req.body.contactPhone }, { new: true }, (err, updatedContact) => {
        if (err) {
            console.log('Error updating contact:', err);
            res.status(500).json({ error: 'Could not update contact.' });
        } else {
            console.log('Updated contact:', updatedContact);
            res.json(updatedContact);
        }
    });
});
// GET by ID
router.get('/:id', (req, res, next) => {
    const contactId = req.params.id;

    Contact.findById(contactId, (err, contact) => {
        if (err) {
            console.log('Error finding contact:', err);
            res.status(500).json({ error: 'Could not retrieve contact.' });
        } else if (!contact) {
            res.status(404).json({ error: 'Contact not found.' });
        } else {
            res.json(contact);
        }
    });
});




module.exports = router;