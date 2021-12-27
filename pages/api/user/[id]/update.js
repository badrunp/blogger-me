import jsonwebtoken from 'jsonwebtoken';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export default async function handler(req, res) {

    if (req.method !== "POST") return res.status(404).json({})

    await dbConnect();

    const { id } = req.query;

    if (id) {

        const data = req.body;

        User.findOne({ _id: id })
            .then(user => {

                if (!user) return res.status(404).json({ status: res.statusCode, message: "User not found!" })

                User.findByIdAndUpdate(id, {
                    $set: data
                }, { new: true })
                    .then(newUser => {

                        const {
                            _id,
                            username,
                            email,
                            title,
                            createdAt,
                            updatedAt
                        } = newUser;

                        const token = jsonwebtoken.sign({
                            _id,
                            username,
                            email,
                            title,
                            createdAt,
                            updatedAt
                        }, process.env.JWT_SECRET, {
                            expiresIn: '7d'
                        })

                        return res.status(200).json({
                            status: res.statusCode,
                            token: token
                        })

                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(400).json({
                            status: res.statusCode,
                            error
                        })
                    })
            })
            .catch(error => {
                console.log(error);
                return res.status(400).json({
                    status: res.statusCode,
                    error
                })
            })

    }

}