import connectdb from "@/lib/db";
import Product from "@/model/productModel";
import { NextResponse } from "next/server";


export async function GET() {
    connectdb();
    try {
        const cart = await Product.find().select("name stock price")
        return NextResponse.json({cart},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:400})
    }
}