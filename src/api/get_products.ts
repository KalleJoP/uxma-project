export interface Product {
    id: number;
    title: string;
    price: string;
    image: string;
}


export function getProducts(callback: (products: [Product]) => void) {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> callback(json))
}