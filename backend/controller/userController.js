import userModel from "../models/userModel.js"


export const registrationController = async (req,res) =>{
    try {
        const user = new userModel(req.body);
        await user.save();
        res.status(201).json({ message: "User record created successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}

export const getAllUsersController = async(req,res) =>{
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}