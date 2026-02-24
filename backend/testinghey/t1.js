import User from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, address, password } = req.body;

    // validation
    if (!username || !email || !address || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create and save new user
    const newUser = new User({ username, email, address, password });
    const savedData = await newUser.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// gett_allUsers
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getUserById
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   update user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExists);
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const deleteData = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully", deleteData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
