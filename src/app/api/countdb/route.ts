import connectdb from "@/lib/db";
import Product from "@/model/productModel";
import User from "@/model/userModel";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectdb();

        const productAmm = await Product.countDocuments({})
        const userAmm = await User.countDocuments({});
            
        return NextResponse.json({userAmm:userAmm,productAmm:productAmm},{status:200})
    } catch (err) {
        return NextResponse.json({error:err},{status:400})
    }
}