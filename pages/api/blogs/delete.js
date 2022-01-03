import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Posts';

export default async function handler(req, res) {

    if (req.method != "POST") return res.status(404).json({})

    await dbConnect();

    const { id } = req.body;
    
    if (id) {

        try {
            const post = await Post.findOne({ _id: id })
            if (!post) {
                return res.status(404).json({})
            }

            const deletePost = await Post.findOneAndDelete({ _id: id })

            return res.status(200).json({
                status: res.statusCode,
                post: deletePost,
                message: `Post berhasil dihapus`
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                status: res.statusCode,
                error
            })
        }
    }

    return res.status(404).json({})
}