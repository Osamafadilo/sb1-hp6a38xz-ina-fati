// Development middleware to simulate authentication
export const devAuth = (req, res, next) => {
  // Simulate a logged-in user for development
  req.user = {
    _id: 'dev_user_id',
    name: 'Dev User',
    email: 'dev@example.com',
    role: 'user'
  };
  next();
};

// Development error handler with MongoDB specific handling
export const devErrorHandler = (err, req, res, next) => {
  console.error('Development Error:', err);
  
  // Handle MongoDB connection errors specifically
  if (err.name === 'MongooseError' || err.name === 'MongoError') {
    return res.status(503).json({
      message: 'Database service temporarily unavailable. Running in development mode.',
      error: err.message
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// In-memory storage for development
const devStorage = {
  users: new Map([
    ['dev@example.com', {
      _id: 'dev_user_id',
      name: 'Dev User',
      email: 'dev@example.com',
      password: '$2a$10$devpasswordhash', // Simulated hash
      role: 'user'
    }]
  ]),
  sessions: new Map()
};

// Development authentication handlers
export const devAuthHandlers = {
  login: (req, res) => {
    const { email, password } = req.body;
    const user = devStorage.users.get(email);

    if (user) {
      // Simulate successful login
      const token = 'dev_token_' + Date.now();
      devStorage.sessions.set(token, user._id);
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  },

  register: (req, res) => {
    const { name, email, password } = req.body;
    
    if (devStorage.users.has(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
      _id: 'dev_user_' + Date.now(),
      name,
      email,
      password: '$2a$10$devpasswordhash', // Simulated hash
      role: 'user'
    };

    devStorage.users.set(email, newUser);
    const token = 'dev_token_' + Date.now();
    devStorage.sessions.set(token, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token
    });
  }
};