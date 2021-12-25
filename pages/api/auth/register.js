import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import validate from '../../../lib/validation';

export default function handler(req,res){

    if(req.method != "POST") return res.status(404).json({})

    const {username, email, password} = req.body;

    const validations = validate([
        {
            label: "username",
            required: true,
            value: username,
            min: 5
        },
        {
            label: "email",
            required: true,
            value: email,
        },
        {
            label: "password",
            required: true,
            value: password,
            min: 6 
        }
        
    ])

    if(Object.keys(validations).length > 0) return res.status(402).json({ status: res.statusCode, validations })

    User.findOne({email: email})
        .then(user => {
            
            if(user){
                return res.status(403).json({
                    status: res.statusCode,
                    message: "Email sudah digunakan",
                })
            }

            bcrypt.genSalt(10, (error, salt) => {
                if(error) return res.status(400).json({ error })
                
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) return res.status(400).json({ error: err })
                    
                    const newUser = new User({
                        username,
                        email,
                        password: hash
                    })

                    newUser.save()
                        .then(result => {
                            return res.status(200).json({
                                status: res.statusCode,
                                message: "Register berhasil, silahkan login",
                            })
                        })
                        .catch(errno => {
                            return res.status(400).json({ error: errno })
                        })
                })
            })

        })
        .catch(error => {
            return res.status(400).json({error})
        })

}
