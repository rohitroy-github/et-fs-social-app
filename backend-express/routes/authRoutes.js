import express from 'express';
import {
  handleLoginToInstagram,
  handleRedirect,
} from '../controllers/instagramController.js';

const router = express.Router();

router.get('/login', handleLoginToInstagram);
router.get('/redirect', handleRedirect);

export default router;
