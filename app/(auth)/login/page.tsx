"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"




export default function Login(){


    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const payload = {
            email: formData.get("email"),
            password:formData.get("password")
        }
        console.log("logging in", formData.get("email"), formData.get("password"))
        try {
            const response = await fetch("api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                router.push("/")
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
                        <label className="block text-sm font-medium text-gray-200">Email:</label>
                        <input
                            type="email"
                            required
                            name="email"
                            className="p-2 bg-gray-300 text-gray-800 rounded-md shadow-md shadow-green-500"
                            placeholder="Enter email"
                        
                        />
                    </div>
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
                    <button className="p-2 m-2 bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition w-full" type="submit">Submit</button>
                    <Link href={"/signup"}>Don't have account??</Link>
            </form>
            </div>
        </div>
    )
}