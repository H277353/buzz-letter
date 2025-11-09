import { PrismaClient } from "@/lib/generated/prisma/client"


export async function POST(request : Request){
    const { email, password, username } = await request.json()
    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
                            data: {
                                email,
                                password,
                                username
                            }
                            })

    return new Response(JSON.stringify({email, password}), {
        status:200
    })
}