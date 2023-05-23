import Product from "../types/product";

export function getProducts(callback: (products: [Product]) => void) {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> callback(json))
}