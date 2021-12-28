import validate from "../../../lib/validation";
import dbConnect from '../../../lib/dbConnect';
import Post from "../../../models/Posts";
import jsonwebtoken from "jsonwebtoken";

export default async function handler(req,res){

    if(req.method !== "POST") return res.status(404).json({})

    const {title, category, content} = req.body;
    const {_TOKEN} = req.cookies;

    await dbConnect();

    if(!_TOKEN) return res.status(404).json({})

    const validations = validate([
        {
            label: "title",
            required: true,
            value: title
        },
        {
            label: "category",
            required: true,
            value: category
        },
        {
            label: "content",
            required: true,
            value: content
        }
    ])

    if(Object.keys(validations).length > 0) return res.status(402).json({status: res.statusCode, validations});

    const {_id} = jsonwebtoken.decode(_TOKEN);

    const newPost = new Post({
        title,
        category,
        content,
        author: _id
    })

    newPost.save()
        .then(post => {

            if(post){
                return res.status(200).json({
                    status: res.statusCode,
                    message: "Create post berhasil",
                    post
                })
            }

        })
        .catch(error => {

            console.log(error);
            return res.status(400).json({status: res.statusCode, error})

        })


}