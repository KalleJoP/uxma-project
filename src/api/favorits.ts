export function toggleFavorit(productId: number, callback: (favorits: number[]) => void) {
    let favorits = getFavorits();
    if (favorits.includes(productId)) {
        favorits = favorits.filter((id) => id !== productId);
    } else {
        favorits.push(productId);
    }
    localStorage.setItem("favorit_products", JSON.stringify(favorits));

    callback(favorits);
}

export function isFavorit(productID: number) : boolean {
   const favorits = getFavorits()
    return favorits.includes(productID)
}


export function getFavoritsAsync(callback: (favorits: number[]) => void) {
    callback(getFavorits())
}

function getFavorits() : number[] {
    return JSON.parse(localStorage.getItem("favorit_products") || "[]") as number[]
}