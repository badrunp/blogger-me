import dbConnect from "../../../../lib/dbConnect"
import Post from "../../../../models/Posts";

export default async function handler(req,res){

    if(req.method != "GET") return res.status(404).json()

    await dbConnect();

    const {id, limit, expect} = req.query;

    try {
        if(id){
            const query = expect ? { $and: [{_id: {$nin: expect}}, {author: id}] } : {author: id}
            const posts = await Post.find(query, {author: 0}).sort({'createdAt': -1}).limit(parseInt(limit) || 'none')

            return res.status(200).json({
                status: res.statusCode,
                posts
            })

        }else{
            throw new Error('id not found!')
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: res.statusCode,
            error
        })
    }

}