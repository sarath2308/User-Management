import Users from '../model/UserSchema.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const signin = async (req, res) => {
  console.log("In admin signin");

  try {
    const { email, password } = req.body;

 
    const user = await Users.findOne({ email: email, isAdmin: true });

    if (!user) {
      return res.status(403).json({ message: "Admin does not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res
      .cookie('AdminToken', token, {
        httpOnly: true,
        secure: false,          
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000  
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: { id: user._id, email: user.email }
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUsers=async(req,res)=>
{
      console.log("In getUsers");
    try {
        const userData=await Users.find({isAdmin:false,isDeleted:false})
        if(userData)
        {
            return res.status(200).json({userData,messgae:"fetched all data"})
        }
        else{
            return res.status(403).json({message:"No data found"})
        }
    } catch (error) {
        return res.status(500).json({message:'Internal Server error '})
    }
}

const addUser=async(req,res)=>
{
     try
        {
        const {name,email,password}=req.body;
       const userData=await Users.findOne({email:email})
       if(userData)
       {
        return res.status(403).json({message:"Email Already exist"})
       }
       else{
          const hashedPassword=await bcrypt.hash(password,10)
    
          const user=await Users.create({
            name:name,
            email:email,
            password:hashedPassword
          })
          
    
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

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await Users.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.status(200).json({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });
  } catch (error) {
    res.status(400).json({

 message: error.message });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isDeleted=true;
    await user.save();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default{
    signin,
    getUsers,
    editUser,
    deleteUser,
    addUser
}