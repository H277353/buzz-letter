import { PrismaClient } from "@/lib/generated/prisma/client"
import {z} from "zod"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const signUpSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string()
})

export async function POST(request : Request){
    try {
        const { email, password, username } = await request.json()
    const prisma = new PrismaClient()
    const validateInput = signUpSchema.parse({ username, email, password })
    
    const salt = bcrypt.genSaltSync()
    const hashedPass = bcrypt.hashSync(validateInput.password,salt)

    const newUser = await prisma.user.create({
                            data: {
                                email:validateInput.email,
                                password:hashedPass,
                                username:validateInput.username
                            }
                            })

        const message = `User ${newUser.username} created successfully!!`
        return NextResponse.json({ message }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error}, {status:400})
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}