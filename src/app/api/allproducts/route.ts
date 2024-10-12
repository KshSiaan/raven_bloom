import connectdb from "@/lib/db";
import Product from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    await connectdb();

    try {
        const allProducts = await Product.find()
        return NextResponse.json({data:allProducts},{status:200});
    } catch (err) {
        return NextResponse.json({error:err},{status:400});
    }
}

export async function POST(request:NextRequest) {
    await connectdb();    

    const req = await request.json();

    try {
        const targetSlot = checkCategories(req.target);
        const result = await Product.find({["categories." + targetSlot]:true});
        console.log(targetSlot);
        
        return NextResponse.json({data:result},{status:200});
    } catch (err) {
        return NextResponse.json({error:err},{status:400});
    }
}

const productCatagoriesList = [
  "fall",
  "flowers",
  "plants",
  "bouquets",
  "gifts",
  "equipments",
];


function checkCategories(x:string):number {
    console.log("target is :", x);
    for (let i = 0; i < productCatagoriesList.length; i++) {
        if (productCatagoriesList[i] === x) {
            return i;
        }
        
    }
    return NaN;
}

