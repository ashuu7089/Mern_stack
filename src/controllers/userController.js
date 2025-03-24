const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createUserRegisterAPI = async(req, res) =>{
    try {
        const { userName, email, type, password } = req.body;
        const userData = new user(req.body);
       
        const findUser = await user.findOne({
            email : email
        })
       
        if(findUser){
            return res.status(409).json({
                status : false,
                message : "User is already exists with this mail"
            })
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            userData.password =hashPassword;
            await userData.save();
            return res.status(200).json({
                status : true,
                message: " User Registration successfully",
                data : userData
            })
        }
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
}

const userLoginAPI = async(req, res) => {
    try {
        const { email, password, type } = req.body;
        const checkUser = await user.findOne({ email : email })
        if(!checkUser){
            return res.status(404).json({
                status : false,
                message : "User not found"
            })
        }
        else{
            const passwordCheck = await bcrypt.compare(password, checkUser.password)
            if(!passwordCheck){
                return res.status(400).json({
                    status : false,
                    message : "Password are Invalid"
                })
            }
    
            
            const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET,  { expiresIn: "24h" })
            return res.status(200).json({
                status : true,
                message : "Login successfully",
                token,
                role: checkUser.type
            })

        }

    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
}

const getUsers = async (req, res) => {
  try {
    const users = await user.find({}, "userName email type");
    return res.status(200).json({status : true, 
        message : "Data retrieved successfully..",
        users
    });
  } catch (error) {
    return res.status(500).json({
        status : false,
        message : error.message
    })
  }
};

module.exports = {
    createUserRegisterAPI,
    userLoginAPI,
    getUsers
}
