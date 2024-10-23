import React, { useState } from 'react';
import ProductCard from '@/components/component';
import AddProductDialog from '@/components/new-product';
import { Button } from "@/components/ui/button";

const Profile = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 1",
            description: "This is a description for product 1.",
            price: 29.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
        {
            id: 2,
            imageUrl: "https://peacefull.com/cdn/shop/collections/Cleanser-scaled.jpg?v=1684240485",
            title: "Product 2",
            description: "This is a description for product 2.",
            price: 39.99,
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [
            ...prevProducts,
            { id: prevProducts.length + 1, ...newProduct },
        ]);
    };

    return (
        <div className="container w-screen h-screen">
            <Button onClick={() => setIsDialogOpen(true)} variant="default">
                Add New Product
            </Button>
            <AddProductDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAddProduct={handleAddProduct}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageUrl={product.imageUrl}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Profile;