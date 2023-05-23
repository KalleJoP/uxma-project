import Product from "../types/product";
import { Card, CardHeader, CardMedia, CardContent, IconButton, Typography, Grid } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';


interface ProductCardProps {
    product: Product;
    toggleFavorite: (productId: number) => void;
    isFavorite: boolean;
}

function RenderFavoriteIcon({ isFavorit }: { isFavorit: boolean }) {
    if (isFavorit) {
        return <FavoriteIcon />
    }
    return <FavoriteBorderIcon />
}



export default function ProductCard(
    {
        product,
        toggleFavorite,
        isFavorite
    }:
        ProductCardProps) {
    return (
        <Grid item xs={3} >
            <Card sx={{ height: "100%" }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={product.image}
                    alt={product.title}
                />
                <CardHeader
                    title={product.title}
                    action={
                        <IconButton onClick={() => toggleFavorite(product.id)}>
                            <RenderFavoriteIcon isFavorit={isFavorite} />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography data-testid="product-price" variant="h6" color="text.secondary">
                        {product.price}€
                    </Typography>
                </CardContent>
            </Card>
        </Grid >
    )
}