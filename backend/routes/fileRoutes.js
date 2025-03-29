import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { validateFile } from '../middleware/uploadMiddleware.js';
import {
  uploadFileHandler,
  deleteFileHandler,
  getServiceFiles
} from '../controllers/fileController.js';

const router = express.Router();

router.route('/')
  .post(protect, validateFile, uploadFileHandler);

router.route('/:id')
  .delete(protect, deleteFileHandler);

router.route('/service/:serviceId')
  .get(protect, getServiceFiles);

export default router;