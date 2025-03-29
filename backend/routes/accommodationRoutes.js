import express from 'express';
import {
  getAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
} from '../controllers/accommodationController.js';
import { protect, provider } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAccommodations)
  .post(protect, provider, createAccommodation);

router.route('/:id')
  .get(getAccommodationById)
  .put(protect, provider, updateAccommodation);

export default router;