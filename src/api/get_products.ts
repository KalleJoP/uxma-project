export interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
    isFavorit: boolean;
}


export function getProducts(callback: (products: [Product]) => void) {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> callback(json))
}