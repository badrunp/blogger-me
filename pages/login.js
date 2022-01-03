import Link from "next/link"
import { useState } from "react"
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

function Login() {


    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const { loading, validations, message } = useSelector(state => state.auth)
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


    const handleSubmit = async (e) => {
        e.preventDefault()
        const isLogin = await dispatch(userLogin(data))
        if (isLogin) {
            router.replace('/')
            setData({
                email: '',
                password: ''
            })
        }

        setData({
            ...data,
            password: ''
        })
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
                    router.query.message && (
                        <Alert className="bg-emerald-500 text-white" message={router.query.message} />
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

                        <Button type="submit" disabled={loading} className={`${loading ? 'cursor-wait' : 'cursor-pointer'} bg-blue-500 text-white font-medium text-sm px-6 hover:bg-blue-600 shadow-sm focus:ring-2 border-transparent focus:ring-offset-1`}>{loading ? 'Loading...' : 'Masuk'}</Button>

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
