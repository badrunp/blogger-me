import Link from "next/link"
import { useState } from "react"
import AuthInput from "../components/AuthInput"
import AuthLabel from "../components/AuthLabel"
import Button from "../components/Button"
import GuestLayout from "../components/GuestLayout"
import ValidationMessage from "../components/ValidationMessage"

function login() {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false);
    const [validations, setValidations] = useState({})
    const [message, setMessage] = useState('');

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

        setLoading(true);
        try {
                const request = await fetch('/api/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const response = await request.json()

                const {status, validations, message} = response;

                if( status === 402 && Object.keys(validations).length > 0 ){

                    setValidations(validations)

                }

                if( status === 403 && message){

                    setValidations({})

                    setMessage(message);

                }

                setLoading(false);
                console.log(response);

        } catch (error) {
            console.log(error);
            setLoading(false);

        }

    }

    return (
        <>
            <GuestLayout title="Sign In">
                <div className="flex flex-row items-center justify-start space-x-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="block text-gray-500 font-semibold text-xl">Sign In your account</h1>
                </div>

                {
                    true && (
                        <div className="py-4 px-5 rounded mt-6 bg-red-500 text-white">
                            <span className="block text-sm text-left tracking-normal">{"Email atau password salah"}</span>
                        </div>
                    )
                }

                <div className="mt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <AuthLabel inputFor={'email'} title={'Email'} />
                            <AuthInput
                                type="text"
                                placeholder="bbadrunn@gmail.com"
                                name="email"
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
                                onChange={handleChangeInput}
                            />
                            <ValidationMessage validations={validations} name={'password'} />
                        </div>

                        <Button type="submit" disabled={loading} className={`${loading ? 'cursor-wait' : 'cursor-pointer'} bg-blue-500 text-white font-medium text-sm px-6 hover:bg-blue-600 shadow-sm focus:ring-2 border-transparent focus:ring-offset-1`}>{loading ? 'Loading...' : 'Sign In'}</Button>

                        <div className="mt-8 text-center">
                            <p className="block text-sm text-gray-600 font-medium">You have don`t account? <Link href="/register"><a className="inline-block underline text-blue-500">Sign Up</a></Link></p>
                        </div>
                    </form>
                </div>
            </GuestLayout>
        </>
    )
}

export default login
