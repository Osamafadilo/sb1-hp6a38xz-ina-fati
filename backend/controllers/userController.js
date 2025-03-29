import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists with increased timeout
    const userExists = await User.findOne({ email })
      .maxTimeMS(60000)
      .exec();

    if (userExists) {
      return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
    }

    // Create user with increased timeout
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'بيانات المستخدم غير صالحة' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى',
      error: error.message 
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .maxTimeMS(60000)
      .exec();

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى',
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .maxTimeMS(60000)
      .exec();

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'المستخدم غير موجود' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      message: 'حدث خطأ أثناء جلب بيانات المستخدم',
      error: error.message 
    });
  }
};