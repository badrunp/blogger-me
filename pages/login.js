import Link from "next/link"
import { useEffect, useState } from "react"
import Alert from "../components/Alert"
import AuthInput from "../components/AuthInput"
import AuthLabel from "../components/AuthLabel"
import Button from "../components/Button"
import GuestLayout from "../components/GuestLayout"
import ValidationMessage from "../components/ValidationMessage"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { userLogin } from "../action/userAction"
import AuthTitle from "../components/AuthTitle"
import AuthFooter from "../components/AuthFooter"
import { userConstant } from "../constant/redux"

function Login() {

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const { loading, validations, message, messageSuccess } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();

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
            dispatch({ type: userConstant.USER_REMOVE_MESSAGE })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (router.query.message) {
            router.replace('/login', undefined, {
                shallow: true
            })
        }
        const isLogin = await dispatch(userLogin(data))
        if (isLogin) {
            router.push('/')
            await setData({
                email: '',
                password: ''
            })

            setTimeout(() => {
                dispatch({ type: userConstant.USER_REMOVE_MESSAGE })
            }, 3000)

            return
        }

        await setData({
            ...data,
            password: ''
        })

        setTimeout(() => {
            dispatch({ type: userConstant.USER_REMOVE_MESSAGE })
        }, 3000)
    }

    return (
        <>
            <GuestLayout title="Sign In">

                <AuthTitle title={'Masuk ke akun anda'} />

                {
                    message && (
                        <Alert className="bg-red-500 text-white" message={message} />
                    )
                }

                {
                    messageSuccess && (
                        <Alert className="bg-emerald-500 text-white" message={messageSuccess} />
                    )
                }

                <div className="mt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <AuthLabel inputFor={'email'} title={'Email'} />
                            <AuthInput
                                type="text"
                                placeholder="example@example.com"
                                name="email"
                                value={data.email}
                                onChange={handleChangeInput}
                            />
                            <ValidationMessage validations={validations} name={'email'} />
                        </div>

                        <div className="mb-6">
                            <AuthLabel inputFor={'password'} title={'Password'} />
                            <AuthInput
                                type="password"
                                placeholder="*******"
                                name="password"
                                value={data.password}
                                onChange={handleChangeInput}
                            />
                            <ValidationMessage validations={validations} name={'password'} />
                        </div>

                        <Button type="submit" disabled={loading} className={`${loading ? 'cursor-wait' : 'cursor-pointer'} primary`}>{loading ? 'Loading...' : 'Masuk'}</Button>

                        <AuthFooter>
                            Tidak punya akun? silahkan <Link href="/register"><a className="inline-block underline text-blue-500">Daftar</a></Link>
                        </AuthFooter>
                    </form>
                </div>
            </GuestLayout>
        </>
    )
}

export default Login
