import multer from 'multer';
import crypto from 'crypto';

const storage = multer.memoryStorage();

const calculateFileHash = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest('hex');
};

const fileFilter = (req, file, cb) => {
  // Allowed file types and their max sizes (in bytes)
  const fileTypes = {
    'image/jpeg': 5 * 1024 * 1024,  // 5MB
    'image/png': 5 * 1024 * 1024,   // 5MB
    'image/gif': 5 * 1024 * 1024,   // 5MB
    'application/pdf': 10 * 1024 * 1024, // 10MB
  };

  if (!fileTypes[file.mimetype]) {
    cb(new Error('نوع الملف غير مدعوم'), false);
    return;
  }

  // Add file hash to request for duplicate detection
  file.hash = calculateFileHash(file.buffer);

  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

export const validateFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          message: 'حجم الملف يتجاوز الحد المسموح به'
        });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default { validateFile };