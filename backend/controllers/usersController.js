import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import db from "../config/db.js";
import generateToken from "../util/utilities.js";

const getAllUsers = asyncHandler(async (req, res) => {

  const all = await db.models.Users.findAll();

  const error = new Error("There is no user in the database");

  if (all.length == 0) {
    throw error;
  }

  res.status(200).json(all);
});

const registerUser = asyncHandler(async (req,res)=>{
  const {username,email,password,confirmedPassword} = req.body;

  const userExists = await db.models.Users.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error('User already exists');
  }

  const user = await db.models.Users.create({
    username,
    email,
    password,
    confirmedPassword
  })

  if(user){
    res.status(201).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id),
    })
  }else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

const postNewUser = asyncHandler(async (req, res) => {
  const u = req.body;
  const checkUser = await db.models.Users.findOne({
    where: {
      email: u.email,
    },
  });
  if (checkUser !== null) {
    return res
      .status(500)
      .send("A users with this email address allready exists");
  } else {
    const newUser = await db.models.Users.create(u);
    return res.status(200).json(newUser);
  }
});

const authentificateUser = asyncHandler(async (req, res) => {
  const {email,password} = req.body;

  const user = await db.models.Users.findOne({email});

  if(user){
    const authentificated = bcrypt
    .compareSync(password, user.confirmedPassword);

    if(authentificated){
      console.log(`Authentification successful for username: ${user.email}`);
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id)
      })
    }
  }else{
    res.status(401)
    throw new Error('Invalid email or password');
  }

});

export { getAllUsers, registerUser, authentificateUser };
