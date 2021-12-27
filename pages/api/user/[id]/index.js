import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export default async function handler(req, res) {

    if(req.method !== "GET") return res.status(404).json({})

    await dbConnect();

    const { id } = req.query;
    if (id) {
        User.findOne({ _id: id }, { password: 0 })
            .then(user => {

                if (!user) return res.status(404).json({ status: res.statusCode, message: "user not found!" })

                return res.status(200).json({
                    status: res.statusCode,
                    user
                })

            })
            .catch(error => {
                return res.status(400).json({ status: res.statusCode, message: "user not found!" })
            })
    }

}