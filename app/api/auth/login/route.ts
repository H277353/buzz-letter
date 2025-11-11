import { PrismaClient } from "@/lib/generated/prisma/client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import z from "zod"


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


export async function POST(request : Request){
    try {
        const { email, password } = await request.json()
        const validateInput = loginSchema.parse({ email, password })
       
        const prisma = new PrismaClient()
        const exists = await prisma.user.findUnique({
            where: {
              email:validateInput.email  
            }
        })
        if(!exists) return NextResponse.json({message:"Invalid"})
       
        const matchPass = bcrypt.compareSync(validateInput.password, exists?.password)
        if (matchPass) return NextResponse.json({ message: "Login successfull!" }, { status: 200 })
        else return NextResponse.json({ message: "Inavlid Credentails" }, { status: 400})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errors: error }, { status: 400})
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}