import { useEffect, useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getProducts } from './api/get_products';
import { toggleFavorite as apiToggleFavorite, getFavoritesAsync } from './api/favorites';
import ProductCard from './components/ProductCard';
import Product from './types/product';

type SortOrder = 'ASC' | 'DESC' | 'NONE';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('NONE');

  useEffect(() => {
    getProducts(setProducts);
    getFavoritesAsync(setFavorites);
  }, []);

  const toggleFavorite = (productId: number) => {
    apiToggleFavorite(productId, (updatedFavorites) => {
      setFavorites(updatedFavorites);
    });
  };

  const sortProducts = (products: Product[]): Product[] => {
    switch (sortOrder) {
      case 'ASC':
        return [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'DESC':
        return [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'NONE':
      default:
        return products;
    }
  };

  const displayProducts = showOnlyFavorites
    ? products.filter((product) => favorites.includes(product.id))
    : products;

  const sortedProducts = sortProducts(displayProducts);

  const toggleFavoritesDisplay = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<SortOrder>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
        <Button variant="outlined" onClick={toggleFavoritesDisplay}>
          {showOnlyFavorites ? 'Alle Anzeigen' : 'Nur Favoriten anzeigen'}
        </Button>
        <Select value={sortOrder} onChange={handleSortOrderChange} displayEmpty>
          <MenuItem value="NONE">Keine Sortierung</MenuItem>
          <MenuItem value="ASC">Aufsteigend</MenuItem>
          <MenuItem value="DESC">Absteigend</MenuItem>
        </Select>
      </Box>
      <Grid sx={{ padding: 2 }} justifyContent="center" container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {sortedProducts.map((product) => (
          <Grid key={product.id} item xs={3}>
            <ProductCard
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(product.id)}
            />
          </Grid >
        ))}
      </Grid>
    </Box>
  );
}

export default App;
