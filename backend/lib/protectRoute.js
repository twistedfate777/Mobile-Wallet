export const protectRoute = (req,res,next)=>{
  try {

    next()
  } catch (error) {
    
  }
}