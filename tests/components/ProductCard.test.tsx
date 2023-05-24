import { render, screen } from '@testing-library/react';
import ProductCard from '../../src/components/ProductCard';
import Product from '../../src/types/product';

test('renders the ProductCard with favorite', () => {

    const product: Product = {
        id: 1,
        title: 'Product 1',
        price: 10,
        image: 'image.jpg',
    };

    render(
        <ProductCard
            product={product}
            toggleFavorite={jest.fn()}
            isFavorite={true}
        />
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.price + '€')).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();

});

test('renders the ProductCard without favorite', () => {
    const product: Product = {
        id: 1,
        title: 'Product 1',
        price: 10,
        image: 'image.jpg',
    };

    render(
        <ProductCard
            product={product}
            toggleFavorite={jest.fn()}
            isFavorite={false}
        />
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.price + '€')).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
});
