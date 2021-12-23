import Link from 'next/link'
import React from 'react'
import AuthInput from '../components/AuthInput'
import AuthLabel from '../components/AuthLabel'
import Button from '../components/Button'
import GuestLayout from '../components/GuestLayout'

function register() {
    return (
        <>
            <GuestLayout title="Sign Un">
                <div className="flex flex-row items-center justify-start space-x-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="block text-gray-600 font-semibold text-xl">Sign Up your account</h1>
                </div>

                <div className="mt-6">
                    <form>
                        <div className="mb-6">
                            <AuthLabel inputFor={'username'} title={'Username'} />
                            <AuthInput
                                type="text"
                                placeholder="Muhammad Badrun"
                                name="username"
                            />
                        </div>
                        <div className="mb-6">
                            <AuthLabel inputFor={'email'} title={'Email'} />
                            <AuthInput
                                type="text"
                                placeholder="bbadrunn@gmail.com"
                                name="email"
                            />
                        </div>
                        <div className="mb-6">
                            <AuthLabel inputFor={'password'} title={'Password'} />
                            <AuthInput
                                type="password"
                                placeholder="*******"
                                name="password"
                            />
                        </div>

                        <Button type="button" className="bg-blue-500 text-white font-medium text-sm py-3 px-6 hover:bg-blue-600 shadow-sm focus:ring-2 border-transparent focus:ring-offset-1">Sign Up</Button>


                        <div className="mt-8 text-center">
                            <p className="block text-sm text-gray-600 font-medium">You have account? <Link href="/login"><a className="inline-block underline text-blue-500">Sign In</a></Link></p>
                        </div>
                    </form>
                </div>
            </GuestLayout>
        </>
    )
}

export default register
