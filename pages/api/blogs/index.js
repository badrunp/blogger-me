import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Posts";
import User from "../../../models/User";


async function handler(req, res) {

    if (req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    const { limit, skip } = req.query;

    try {

        if (limit) {

            const posts = await Post.find({}).populate({path: 'author', model: User}).limit(parseInt(limit))
            
            return res.status(200).json({
                status: res.statusCode,
                posts
            })
            
        } else {
            
            const posts = await Post.find({}).populate({path: 'author', model: User})

            return res.status(200).json({
                status: res.statusCode,
                posts
            })

        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: res.statusCode,
            error
        })
    }

}

export default handler;