import dbConnect from "../../../lib/dbConnect";
import Blog from "../../../models/Posts";


async function handler(req,res){
    
    await dbConnect();

    const blogs = await Blog.find({})

    res.status(200).json({blogs})

}

export default handler;