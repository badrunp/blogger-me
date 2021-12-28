import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Posts";


async function handler(req,res){
    
    if(req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    Post.find({})
        .then(posts => {
            
            return res.status(200).json({
                status: res.statusCode,
                posts
            })

        })
        .catch(error => {

            console.log(error);
            return res.status(400).json({
                status: res.statusCode,
                error
            })

        })

}

export default handler;