"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"




export default function Signup(){


    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        if (formData.get("password") !== formData.get("confirmPassword")) {
            alert("Password do not match")
            throw new Error("Password no match")
        }
        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
            username: formData.get("username")
        }
        console.log("signing up", formData.get("email"), formData.get("password"))
        try {
            const response = await fetch("api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                router.push("/login")
            }
        } catch (error) {
            console.error(error)
        
        }
    }

    return (
        <div className="flex justify-center items-center content-center min-h-screen bg-black">
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="text-white bg-gray-700 p-20 m-4 rounded-2xl shadow-md shadow-green-500">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-200">Username:</label>
                        <input
                            type="text"
                            required
                            name="username"
                            className="p-2 bg-gray-300 text-gray-800 rounded-md shadow-md shadow-green-500"
                            placeholder="Enter username"
                        
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-200">Email:</label>
                        <input
                            type="email"
                            required
                            name="email"
                            className="p-2 bg-gray-300 text-gray-800 rounded-md shadow-md shadow-green-500"
                            placeholder="Enter email"
                        
                        />
                    </div>
                    <div className="flex">
                         <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-200">Password:</label>
                        <input
                            type="password"
                            required
                            name="password"
                            className="p-2 bg-gray-300 text-gray-800 rounded-md shadow-md shadow-green-500"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-200">Confirm Password:</label>
                        <input
                            type="password"
                            required
                            name="confirmPassword"
                            className="p-2 bg-gray-300 text-gray-800 rounded-md shadow-md shadow-green-500"
                            placeholder="Enter password"
                        />
                    </div>
                   </div>
                    <button className="p-2 m-2 bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition w-full" type="submit">Submit</button>
                    <Link href={"/login"}>Already have account!</Link> 
            </form>
            </div>
        </div>
    )
}