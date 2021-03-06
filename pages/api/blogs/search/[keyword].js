import Post from '../../../../models/Posts'
import dbConnect from '../../../../lib/dbConnect';

export default async function handler(req,res){

    if(req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    const {keyword} = req.query;

    if(keyword){

        try {
            const posts = await Post.find({ title: {$serach: new RegExp(keyword, 'i')} }).limit(7).lean()

            return res.status(200).json({
                status: res.statusCode,
                posts
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                status: res.statusCode,
                error
            })
        }

    }

}