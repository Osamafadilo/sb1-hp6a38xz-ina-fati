import Accommodation from '../models/accommodationModel.js';

// @desc    Get all accommodations
// @route   GET /api/accommodations
// @access  Public
export const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({}).populate('provider', 'name');
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single accommodation
// @route   GET /api/accommodations/:id
// @access  Public
export const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id).populate('provider', 'name');
    
    if (accommodation) {
      res.json(accommodation);
    } else {
      res.status(404);
      throw new Error('Accommodation not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create an accommodation
// @route   POST /api/accommodations
// @access  Private/Provider
export const createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation({
      provider: req.user._id,
      ...req.body
    });

    const createdAccommodation = await accommodation.save();
    res.status(201).json(createdAccommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an accommodation
// @route   PUT /api/accommodations/:id
// @access  Private/Provider
export const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (accommodation) {
      if (accommodation.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to update this accommodation');
      }

      const updatedAccommodation = await Accommodation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updatedAccommodation);
    } else {
      res.status(404);
      throw new Error('Accommodation not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};