import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Posts';

export default async function handler(req,res){

    if(req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    const {id} = req.query;

    Post.find({author: id}, {createdAt: 0, updatedAt: 0})
        .then(posts => {

            if(posts){
                return res.status(200).json({
                    status: res.statusCode,
                    posts
                })
            }

        })
        .catch(error => {
            
            console.log(error);
            return res.status(400).json({
                status: res.statusCode,
                error
            })

        })

}