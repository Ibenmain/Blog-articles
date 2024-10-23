import React, { useEffect, useState } from 'react';
// import ProductCard from '@/components/component';
import AddProductDialog from '@/components/new-product';
import { Button } from "@/components/ui/button";
import { signOut } from 'next-auth/react';
import axios from 'axios';

const Profile = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [products, setProducts] = useState([{
        id: null,
        imageUrl: null,
        title: '',
        description: '',
        price: '',
    }]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/product/get-product');
                console.log('hello ',response.data);
                setProducts(response.data);
            }
            catch (error) {
                console.log('Failed to fetch products');
            }
        }

        fetchProducts();
    }, []);

    console.log('product' ,products);

    return (
        <div className="container flex-1 mx-auto">
            <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-800">My Website</h1>
                    <div className="space-x-4">
                        <Button onClick={() => setIsDialogOpen(true)} variant="default">
                            Add New Product
                        </Button>
                        <Button variant={"outline"} onClick={() => signOut({ callbackUrl: '/' })}>signOut</Button>
                    </div>
                </div>
            </header>
            <AddProductDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-24">
                {/* {products && products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageUrl={product.imageUrl!}
                        title={product.title}
                        description={product.description}
                        price={parseInt(product.price)}
                    />
                ))} */}
            </div>
        </div>
    );
};

export default Profile;