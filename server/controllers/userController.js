import User from '../model/UserSchema.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const signup=async(req,res)=>
{
    try
    {
    const {name,email,password}=req.body;
   const userData=await User.findOne({email:email})
   if(userData)
   {
    return res.status(403).json({message:"Email Already exist"})
   }
   else{
      const hashedPassword=await bcrypt.hash(password,10)

      const user=await User.create({
        name:name,
        email:email,
        password:hashedPassword
      })
      
const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
 res.cookie('token', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  maxAge: 60 * 60 * 1000 
});

return res.status(201).json({
  message: 'Signup successful',
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
   }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"internal server error"})
    }
}


 const login = async (req, res) => {
  const { email, password } = req.body;
console.log("inside login");

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,          
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000  
      })
      .status(200)
      .json({ message: 'Login successful', user: { id: user._id, email: user.email } });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



export default{
    signup,
    login,
}