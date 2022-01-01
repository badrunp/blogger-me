import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Posts';

export default async function handler(req,res){

    if(req.method != "POST") return res.status(404).json({})

    await dbConnect();

    try {

        const {id} = req.query;
        const body = req.body;

        if(id){
            const post = await Post.findOne({ _id: id })
            if(post){
                const newPost = await Post.updateOne({_id: id}, {$set: body}, {new: true})
                return res.status(200).json({
                    status: res.statusCode,
                    post: newPost
                })
            }
        }
        
        throw new "Vailed updated post!";
        

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: res.statusCode,
            error
        })
    }

}