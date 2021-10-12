const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const fetchuser = require('../Middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//creating jwt secret token
const JWT_SECRET = "kdisbes@t"


//ROUTE 1: Creating a New User path-> localhost:500/api/auth/createuser no login required
router.post('/createuser', [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid Email').isEmail(), body('password', 'Enter a valid password').isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req);
  //valingdating new user details
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {

      return res.status(400).json({success, error: "Try again, this email already exist" })
    }

    const salt = await bcrypt.genSalt(10)

    const secPass = await bcrypt.hash(req.body.password, salt)

    //Creating a New User
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success=true
    res.json({ success,authtoken })
  } //catching errors 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured while creating the user")
  }

})


//ROUTE 2: Authentication: log in page path--> lcoalhost:500/api/auth/login login required

router.post('/login', [body('email', 'Enter a valid Email').isEmail(), body('password', 'Enter valid password').exists(),], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body
  let success = false;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success,error: "sorry user does not exist" })
    }
    let passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({ success,error: "try again,bad credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    success= true;
    const authtoken = jwt.sign(data, JWT_SECRET)
    res.json({ success,authtoken })


  } catch (error) {
    console.error(error.message)
    res.status(500).send("internal server error")
  }

})



//ROUTE 3: User Details--> lcoalhost:500/api/auth/getuser login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }
})


module.exports = router