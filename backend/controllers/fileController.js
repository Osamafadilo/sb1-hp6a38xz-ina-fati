import asyncHandler from 'express-async-handler';
import { uploadFile, deleteFile, getSignedUrl } from '../config/storage.js';
import File from '../models/fileModel.js';
import Service from '../models/serviceModel.js';

// @desc    Upload a file
// @route   POST /api/files
// @access  Private
export const uploadFileHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('لم يتم تحميل أي ملف');
  }

  // Check if service exists and user has access
  const service = await Service.findById(req.body.serviceId);
  if (!service) {
    res.status(404);
    throw new Error('الخدمة غير موجودة');
  }
  
  if (service.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('غير مصرح بالوصول إلى هذه الخدمة');
  }

  // Check for duplicate file
  const existingFile = await File.findOne({
    hash: req.file.hash,
    serviceId: req.body.serviceId,
    status: 'active'
  });

  if (existingFile) {
    res.status(400);
    throw new Error('تم تحميل هذا الملف مسبقاً');
  }

  // Upload file to Google Cloud Storage
  const { url, path, size } = await uploadFile(
    req.file,
    req.user._id,
    req.body.serviceId
  );
  
  // Create file record in database
  const file = await File.create({
    name: req.file.originalname,
    path: path,
    url: url,
    type: req.file.mimetype,
    size: size,
    hash: req.file.hash,
    userId: req.user._id,
    serviceId: req.body.serviceId
  });

  res.status(201).json(file);
});

// @desc    Delete a file
// @route   DELETE /api/files/:id
// @access  Private
export const deleteFileHandler = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    res.status(404);
    throw new Error('الملف غير موجود');
  }

  // Check ownership
  if (file.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('غير مصرح بحذف هذا الملف');
  }

  // Soft delete in database
  file.status = 'deleted';
  await file.save();

  // Delete from cloud storage
  await deleteFile(file.path);

  res.json({ message: 'تم حذف الملف بنجاح' });
});

// @desc    Get files for a service
// @route   GET /api/files/service/:serviceId
// @access  Private
export const getServiceFiles = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.serviceId);
  if (!service) {
    res.status(404);
    throw new Error('الخدمة غير موجودة');
  }

  const files = await File.find({
    serviceId: req.params.serviceId,
    status: 'active'
  }).sort('-createdAt');

  // Generate fresh signed URLs for all files
  const filesWithUrls = await Promise.all(
    files.map(async (file) => {
      const signedUrl = await getSignedUrl(file.path);
      return {
        ...file.toObject(),
        url: signedUrl
      };
    })
  );

  res.json(filesWithUrls);
});