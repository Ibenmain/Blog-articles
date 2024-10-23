import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProduct: (product: { title: string; description: string; price: number; image: File | null }) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onClose, onAddProduct }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = () => {
        if (title && description && price && image) {
            onAddProduct({
                title,
                description,
                price: parseFloat(price),
                image,
            });
            onClose();
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
        }
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1"
                            placeholder="Enter product title"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                                    setImage(e.target.files[0]);
                                } else {
                                    setImage(null);
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
