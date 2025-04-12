import express from 'express';
import {
  redirectToInstagram,
  handleRedirect,
} from '../controllers/instagramController.js';

const router = express.Router();

router.get('/login', redirectToInstagram);
router.get('/redirect', handleRedirect);

export default router;
