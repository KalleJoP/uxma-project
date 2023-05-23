export function toggleFavorite(productId: number, callback: (favorites: number[]) => void) {
    let favorites = getFavorites();
    if (favorites.includes(productId)) {
        favorites = favorites.filter((id) => id !== productId);
    } else {
        favorites.push(productId);
    }
    localStorage.setItem("favorit_products", JSON.stringify(favorites));

    callback(favorites);
}

export function getFavoritesAsync(callback: (favorites: number[]) => void) {
    callback(getFavorites())
}

function getFavorites() : number[] {
    return JSON.parse(localStorage.getItem("favorit_products") || "[]") as number[]
}