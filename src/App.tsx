import { useEffect, useState } from 'react'
import { getProducts, Product } from './api/get_products'
import './App.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProductCard from './components/ProductCard'
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toggleFavorit as apiToggleFavorite, getFavoritsAsync } from './api/favorits';



function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | "NONE">("NONE");

  useEffect(() => {
    getProducts(setProducts);
    getFavoritsAsync(setFavorites);
  }, []);

  const toggleFavorite = (productId: number) => {
    apiToggleFavorite(productId, (favorites) => {
      setFavorites(favorites)
    })
  };

  const sortProducts = (products: Product[]) => {
    switch (sortOrder) {
      case "ASC":
        return [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "DESC":
        return [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "NONE":
      default:
        return products;
    }
  }

  let displayProducts = showOnlyFavorites
    ? products.filter((product) => favorites.includes(product.id))
    : products;

  displayProducts = sortProducts(displayProducts);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button onClick={() => { setShowOnlyFavorites(!showOnlyFavorites) }} >{showOnlyFavorites ? "Alle Anzeigen" : "Nur Favoriten anzeigen"}</Button>
      <Select
        value={sortOrder}
        onChange={(event: SelectChangeEvent<"ASC" | "DESC" | "NONE">) =>
          setSortOrder(event.target.value as "ASC" | "DESC" | "NONE")}
        displayEmpty
      >
        <MenuItem value="NONE">Keine Sortierung</MenuItem>
        <MenuItem value="ASC">Aufsteigend</MenuItem>
        <MenuItem value="DESC">Absteigend</MenuItem>
      </Select>
      <Grid justifyContent="center" container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(product.id)}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default App
