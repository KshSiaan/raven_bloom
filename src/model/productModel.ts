import mongoose, { Schema } from 'mongoose';

interface ProductType {
    image: string,
    name: string,
    price: number,
    stock:number,
    tags: Array<string>,
    desc: string,
    categories: Array<boolean>
}

const ProductSchema = new Schema<ProductType>({
    image: {type:String,required:true},
    name: {type:String,required:true},
    price: {type:Number,required:true},
    stock: {type:Number,required:true},
    tags: {type:[String],required:true},
    desc: {type:String,required:true},
    categories: {type:[Boolean], required:true}
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;