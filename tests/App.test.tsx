import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../src/App'
import { getProducts } from '../src/api/get_products'

jest.mock('../src/api/get_products');

const products = [
    {
        id: 1,
        title: 'Product 1',
        price: '100',
        image: 'image1.jpg',
    },
    {
        id: 2,
        title: 'Product 2',
        price: '200',
        image: 'image2.jpg',
    },
    {
        id: 3,
        title: 'Product 3',
        price: '300',
        image: 'image3.jpg',
    },
];

beforeEach(() => {

    (getProducts as jest.Mock).mockImplementation((callback) => {
        callback(products);
    });
});

test('renders the App without crashing', () => {
    render(<App />);
});

test('toggle favorites filter', async () => {
    render(<App />);
    const toggleButton = screen.getByText(/Nur Favoriten anzeigen/i);
    userEvent.click(toggleButton);
    await waitFor(() => {
        expect(screen.getByText(/Alle Anzeigen/i)).toBeInTheDocument();
    });
});

test('sort products', async () => {
    render(<App />);

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /Keine Sortierung/i }));
    });

    await waitFor(() => expect(screen.getByText(/Aufsteigend/i)).toBeInTheDocument());
    await act(async () => {
        userEvent.click(screen.getByText(/Aufsteigend/i));
    });

    await waitFor(() => {
        expect(screen.getByRole('button', { name: /Aufsteigend/i })).toBeInTheDocument();
    });

    const displayedProducts = screen.getAllByTestId('product-price');
    const expectedPrices = products.map((product) => parseInt(product.price));
    displayedProducts.forEach((product, index) => {
        expect(product).toHaveTextContent(expectedPrices[index].toString());
    });
});
