import connectdb from "@/lib/db";
import Product from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  await connectdb();
  try {
    data.file = "dummy_img.webp";
    const readyData = {
      image: data.file,
      name: data.name,
      price: parseInt(data.price),
      stock: parseInt(data.stock),
      tags: data.tags,
      desc: data.description,
      categories: data.categories,
    };

    const product = await Product.create(readyData);

    return NextResponse.json(
      { message: "Product created successfully", product: product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const req = await request.json();

    await Product.findByIdAndDelete(req.id);
    return NextResponse.json(
      { message: "Product successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
