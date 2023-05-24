import {z} from "zod"

export const ProductZod = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    image: z.string()
})

export const ProductsZod = z.array(ProductZod)

export default interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}