import { users } from "../../mock-db/users.js";
import { User } from "./users.model.js";

//get a single user by id from databaase
export const getUser2 = async (req, res, next) => {
  const {id} = req.params

  try {
    const doc = await User.findById(id).select("-password")

    if (!doc ){
      const error = new Error("User not found")
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: doc
    })

  } catch (error) {
    error.status = 500;
    error.name = "DatabaseError";
    error.message = error.message || "Failed to get a user"
    return next(error);
  }
}

//get user mock
export const getUsers1 = (req, res) => {
    res.status(200).json(users);
    console.log(res);
};

//get user in database
export const getUsers2 = async (req, res,next)=> {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return next(error);
  }
}

//delete mock
export const deleteUser1 = (req,res) => {
  const userId = req.params.id;

  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex !== -1) {
     users.splice(userIndex, 1);

  res.status(200).send(`User with ID ${userId} deleted`);
  } else {
    res.status(404).send("User not found.");
  }

 
}

//delete in database
export const deleteUser2 = async (req,res) => {
  const {id} = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      data: null
    })

  } catch(error) {
    return res.status(500).json({
      success: false,
      error: "Fail to delete user"
    })
  }
}

//create newuser mock
export const createUser1 =  (req, res)=>{
    const {name, email} = req.body;

    const newUser = {
        id: String(users.length +1),
        name: name,
        email: email,
    };

    users.push(newUser);

    res.status(201).json(newUser);
}

//create new user in database
export const createUser2 = async (req, res,next) => {
  const {username, email,password} = req.body;

  if (!username || !email || !password) {
    
    const error = new Error("username, email, password are required");
    error.name = "ValidationError";
    error.status = 400;
    
    return next(error);
  }

  try {
    const doc = await User.create({username, email, password})

    const safe = doc.toObject();
    delete safe.password

    return res.status(201).json({
      success: true,
      data: safe
    })
  } catch (error) {
    
    if(error.code === 11000){
      error.status = 409;
      error.name = "DuplicateKeyError"
      error.message = "Email already in use"
    }

    error.status = 500;
    error.name = "DatabaseError";
    error.message = error.message || "Failed to create user"
    return next(error);
  }
}


//route handler : update user in database
export const updateUser2 = async (req, res,next) => {
  const {id} = req.params

  const body = req.body;

  try {
    const updated = await User.findByIdAndUpdate(id, body)

    if (!updated) {

      const error = new Error("User not found")
      return next(error); 
    }

    const safe = updated.toObject()
    delete safe.password

    return res.status(200).json({
      success: true,
      date: safe
    })

  } catch (error) {
    if (error.code === 11000) {
      return next(error)
    }

    return next(error)
  }

}