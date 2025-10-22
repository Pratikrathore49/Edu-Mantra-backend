
import jwt from 'jsonwebtoken';

export const makeToken = async (data) => {
  try {
     return jwt.sign(data,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
  } catch (error) {
    throw new Error("Error in creating token");
  }
};

export const verifyToken = async(token) =>{
  try{
    return jwt.verify(token,process.env.JWT_SECRET);

  }catch(error){
    throw new Error('Error in verifying token');
  }
}
 
 