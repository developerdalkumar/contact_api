import express from 'express'
import { deleteContactById, getAllContact, getContactById, getContactByUserId, newContact, updateContactById } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

// user contact
// @api name :- creating contact
// @api method :- post
// @api endPoint :- api/user/contact

router.post('/new', isAuthenticated ,newContact)


// get all contact
router.get('/', getAllContact)

// get contact by id

router.get('/:id', getContactById)

// update contact by id 

router.put('/:id', isAuthenticated,updateContactById)

// delete by id

router.delete('/:id', isAuthenticated,deleteContactById)

router.get('/userId/:id',getContactByUserId)


export default router;