import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../action/userAction'
import Alert from '../components/Alert'
import AuthFooter from '../components/AuthFooter'
import AuthInput from '../components/AuthInput'
import AuthLabel from '../components/AuthLabel'
import AuthTitle from '../components/AuthTitle'
import Button from '../components/Button'
import GuestLayout from '../components/GuestLayout'
import ValidationMessage from '../components/ValidationMessage'
import { userConstant } from '../constant/redux'

function Register() {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const router = useRouter();
    const dispatch = useDispatch();
    const [isRemoveMessage, setIsRemoveMessage] = useState(false)
    const { loading, validations, message } = useSelector(state => state.auth)

    const handleChangeInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })

    }

    useEffect(() => {
        return () => {
            dispatch({ type: userConstant.USER_CLEAR_VALIDATIONS })
        }
    }, [])

    useEffect(() => {
        if (isRemoveMessage) {
            dispatch({ type: userConstant.USER_REMOVE_MESSAGE })
        }
    }, [isRemoveMessage])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isRegister = await dispatch(userRegister(data))
        if (isRegister) {
            setIsRemoveMessage(false)
            router.push('/login');
            await setData({
                username: '',
                email: '',
                password: '',
            })

            setTimeout(() => {
                dispatch({ type: userConstant.USER_REMOVE_MESSAGE })
            }, 3000)

            return;
        }

        await setData({
            ...data,
            password: ''
        })

        setIsRemoveMessage(true)

        setTimeout(() => {
            dispatch({ type: userConstant.USER_REMOVE_MESSAGE })
        }, 3000)

    }

    return (
        <>
            <GuestLayout title="Sign Up">
                <AuthTitle title={'Daftar akun'} />

                {
                    message && (
                        <Alert className="bg-red-500 text-white mt-6" message={message} />
                    )
                }

                <div className="mt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <AuthLabel inputFor={'username'} title={'Username'} />
                            <AuthInput
                                type="text"
                                placeholder="Example"
                                name="username"
                                onChange={handleChangeInput}
                                value={data.username}
                            />
                            <ValidationMessage validations={validations} name='username' />
                        </div>
                        <div className="mb-6">
                            <AuthLabel inputFor={'email'} title={'Email'} />
                            <AuthInput
                                type="text"
                                placeholder="example@example.com"
                                name="email"
                                onChange={handleChangeInput}
                                value={data.email}
                            />
                            <ValidationMessage validations={validations} name='email' />
                        </div>
                        <div className="mb-6">
                            <AuthLabel inputFor={'password'} title={'Password'} />
                            <AuthInput
                                type="password"
                                placeholder="*******"
                                name="password"
                                onChange={handleChangeInput}
                                value={data.password}
                            />
                            <ValidationMessage validations={validations} name='password' />
                        </div>

                        <Button type="submit" className="primary">{loading ? 'Loading...' : 'Daftar'}</Button>


                        <AuthFooter>
                            Sudah punya akun? silahkan <Link href="/login"><a className="inline-block underline text-blue-600">Masuk</a></Link>
                        </AuthFooter>
                    </form>
                </div>
            </GuestLayout>
        </>
    )
}

export default Register
