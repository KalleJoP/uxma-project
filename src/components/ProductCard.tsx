import { Product } from "../api/get_products"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function RenderFavoriteIcon({ isFavorit }: { isFavorit: boolean }) {
    if (isFavorit) {
        return <FavoriteIcon />
    }
    return <FavoriteBorderIcon />
}

type ProductCardProps = {
    product: Product,
    toggleFavorite: (productId: number) => void,
    isFavorite: boolean
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