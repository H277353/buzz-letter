



export async function POST(request : Request){
    const { email, password } = await request.json()
    
    return new Response(JSON.stringify({email, password}), {
        status:200
    })
}