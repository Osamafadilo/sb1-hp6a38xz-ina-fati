import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['active', 'deleted', 'processing'],
    default: 'active',
    index: true
  },
  metadata: {
    type: Map,
    of: String,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for common queries
fileSchema.index({ userId: 1, serviceId: 1, status: 1 });
fileSchema.index({ hash: 1, serviceId: 1, status: 1 });

// Virtual for file extension
fileSchema.virtual('extension').get(function() {
  return this.name.split('.').pop().toLowerCase();
});

// Virtual for formatted size
fileSchema.virtual('formattedSize').get(function() {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  let size = this.size;
  let i = 0;
  while (size >= 1024 && i < sizes.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${sizes[i]}`;
});

const File = mongoose.model('File', fileSchema);

export default File;