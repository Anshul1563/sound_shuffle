'use client'

import { CheckUser, HashAndStore } from '@/logic/server_actions/Login'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginForm() {
    const [loginType, setLoginType] = useState('Login')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function HandleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        const form: HTMLFormElement = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        const plainPass = formJson.password.toString()
        const email = formJson.email.toString()
        let res = null

        if (loginType == 'Register') {
            const username = formJson.username.toString()
            const details = { username, email, plainPass }
            res = await HashAndStore(details)
        } else {
            res = await CheckUser(email, plainPass)
            const name = res.name
            if (res.status == 'successful') {
                setTimeout(() => {
                    router.push(`/${name}`)
                },2000)
            }
        }

        setLoading(false)

        if (res.status == 'successful') {
            toast.success(res.message, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }

        if (res.status == 'failed') {
            toast.error(String(res.error), {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }
    }
    return (
        <div className="flex flex-grow flex-col items-start justify-start p-8 font-work">
            <div className="flex w-fit flex-col items-center">
                <form
                    method="post"
                    onSubmit={HandleSubmit}
                    className="mb-4 flex w-96 flex-col items-start justify-center gap-8"
                >
                    <h1 className=" w-full text-start text-3xl font-bold tracking-wider text-accent">
                        {loginType} to Sound Shuffle
                    </h1>
                    <div className="flex w-full flex-col gap-2">
                        <div className="text-lg font-semibold ">
                            Enter your email
                        </div>
                        <input
                            disabled={loading}
                            name="email"
                            className="  rounded-sm border-2 border-slate-300 p-2"
                            placeholder="enter your email"
                        />
                    </div>
                    {loginType == 'Register' && (
                        <div className="flex w-full flex-col gap-2">
                            <div className="text-lg font-semibold ">
                                Enter your username
                            </div>
                            <input
                                disabled={loading}
                                name="username"
                                className="  rounded-sm border-2 border-slate-300 p-2"
                                placeholder="enter your username"
                            />
                        </div>
                    )}
                    <div className="flex w-full flex-col gap-2">
                        <div className="text-lg font-semibold ">
                            Enter your password
                        </div>
                        <input
                            disabled={loading}
                            name="password"
                            className=" w-full rounded-sm border-2 border-slate-300 p-2"
                            placeholder="enter your password"
                            type="password"
                        />
                    </div>
                    <button
                        className="w-full rounded-md bg-secondary p-3"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading!' : loginType}
                    </button>
                </form>
                {loginType == 'Login' ? (
                    <p>
                        Dont&apos; have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setLoginType('Register')}
                            className="font-bold text-accent"
                        >
                            Register
                        </button>
                    </p>
                ) : (
                    <p>
                        Have an account?{' '}
                        <button
                            onClick={() => setLoginType('Login')}
                            className="font-bold text-accent"
                        >
                            Login
                        </button>
                    </p>
                )}
            </div>
        </div>
    )
}

export default LoginForm
