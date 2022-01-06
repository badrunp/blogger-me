import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import Post from '../../../../models/Posts';

export default async function handler(req, res) {

    if(req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    const { id } = req.query;
    if (id) {
        User.findOne({ _id: id }, { password: 0 })
            .then(async user => {

                if (!user) return res.status(404).json({ status: res.statusCode, message: "user not found!" })

                const totalPost = await Post.find({author: id}).countDocuments()

                return res.status(200).json({
                    status: res.statusCode,
                    user,
                    total: totalPost
                })

            })
            .catch(error => {
                return res.status(400).json({ status: res.statusCode, message: "user not found!" })
            })
    }

}