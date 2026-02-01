import ratelimiter from "../lib/upstash.js";

const rateLimiter = async(req,res,next)=>{
  try {
    //harusnya di bagian ini diisi userId/ipAddress cuman karena auth belom di setup jadi sementara pake ini
    const {success} = await ratelimiter.limit("m=my-rate-limit")

    //429 = too many request
    if(!success){
      return res.status(429).json({message : "Too many requests, please try again later"})
    }
    next()
  } catch (error) {
    console.log("Rate limit error");
    next(error)
  }
}

export default rateLimiter