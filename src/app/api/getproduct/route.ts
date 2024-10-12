import connectdb from "@/lib/db";
import Product from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
const data = await request.json()
    await connectdb();
    try {    
        
        const product = await Product.findById(data.target);        
        return NextResponse.json({product},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:400})
    }
    
}