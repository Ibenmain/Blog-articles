import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

interface AddProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onClose }) => {
    const session = useSession();
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        price: '',
    });

    console.log('session ', session);

    const AddProduct = async () => {

        const formData = { ...data, image: imageUrl?.name, userId: session.data?.user?.id};

        console.log(formData);
       


        try {
            const response = await axios.post('/api/product/add', formData);
            console.log(response.data);
            if (response.status === 201) {
                toast.success('Product added successfully');
            } else {
                toast.error('Failed to add product');
            }
        }
        catch (error) {
            toast.error('Failed to add product');
        }
    }

    const handleSubmit = () => {
        AddProduct();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-6 rounded-lg shadow-lg max-w-md mx-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            // value={title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="mt-1"
                            placeholder="Enter product title"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            // value={description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Enter product description"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            // value={price}
                            onChange={(e) => setData({ ...data, price: e.target.value })}
                            className="mt-1"
                            placeholder="Enter product price"
                            required
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input
                            id="picture"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImageUrl(e.target.files[0] as File);
                                } else {
                                    setImageUrl(null);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button onClick={handleSubmit} variant="default">Add Product</Button>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductDialog;
