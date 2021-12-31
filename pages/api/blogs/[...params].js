import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Posts';

export default async function handler(req, res) {

    if (req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    const { params } = req.query;

    try {
        if (params[1] === 'id') {
            const post = await Post.findOne({ _id: params[0] });
            if (post) {
                return res.status(200).json({
                    status: res.statusCode,
                    post
                })
            }
        } else {
            const posts = await Post.find({ author: params[0] });
            if (posts) {
                return res.status(200).json({
                    status: res.statusCode,
                    posts
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: res.statusCode,
            error
        })
    }


}