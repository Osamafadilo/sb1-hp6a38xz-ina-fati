import { Storage } from '@google-cloud/storage';
import path from 'path';
import crypto from 'crypto';

const storage = new Storage({
  keyFilename: path.join(process.cwd(), 'google-cloud-key.json'),
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

// Generate secure random filename
const generateSecureFilename = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(16).toString('hex');
  const extension = path.extname(originalName);
  return `${timestamp}-${randomString}${extension}`;
};

export const uploadFile = async (file, userId, serviceId) => {
  try {
    const secureFilename = generateSecureFilename(file.originalname);
    const filePath = `${userId}/${serviceId}/${secureFilename}`;
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
          userId,
          serviceId
        }
      }
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        reject(error);
      });

      blobStream.on('finish', async () => {
        // Make the file public and get signed URL
        await blob.makePublic();
        const [signedUrl] = await blob.getSignedUrl({
          action: 'read',
          expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        resolve({
          url: signedUrl,
          path: filePath,
          size: file.size
        });
      });

      blobStream.end(file.buffer);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  try {
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    
    if (exists) {
      await file.delete();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const getSignedUrl = async (filePath) => {
  try {
    const file = bucket.file(filePath);
    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

export default { uploadFile, deleteFile, getSignedUrl };