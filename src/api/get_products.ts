import Product, {ProductsZod} from "../types/product";

export function getProducts(callback: (products: Product[]) => void) {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> callback(ProductsZod.parse(json)))
            .catch(error => {
                callback([])
                console.error('parsing failed', error)
            })
}