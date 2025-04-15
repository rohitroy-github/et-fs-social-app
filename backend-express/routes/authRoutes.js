import express from 'express';
import {
  handleLoginToInstagram,
  handleRedirect,
} from '../controllers/IG_businessLogicController.js';

const router = express.Router();

router.get('/login', handleLoginToInstagram);
router.get('/redirect', handleRedirect);

export default router;
