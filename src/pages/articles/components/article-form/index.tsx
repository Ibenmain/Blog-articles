import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session } from "../../../../../next-auth";
import { ArticleFormDialogProps } from "@/types/articles";



const ArticleFormDialog: React.FC<ArticleFormDialogProps> = ({ isOpen, onClose, articleToEdit }) => {
    const session = useSession() as { data: Session | null };
    const [data, setData] = useState({
        id: '',
        title: '',
        content: '',
    });

    useEffect(() => {
        if (articleToEdit) {
            setData({
                id: articleToEdit.id,
                title: articleToEdit.title,
                content: articleToEdit.content,
            });
        } else {
            setData({
                id: '',
                title: '',
                content: '',
            });
        }
    }, [articleToEdit]);

    const handleSubmit = async () => {
        const formData = { ...data, userId: session.data?.user?.id as string };

        try {
            if (articleToEdit) {
                const response = await axios.put(`/api/articles/edit`, data);
                if (response.status === 200) {
                    toast.success('Article updated successfully');
                } else {
                    toast.error('Failed to update article');
                }
            } else {
                const response = await axios.post('/api/articles/add', formData);
                if (response.status === 201) {
                    toast.success('Article added successfully');
                } else {
                    toast.error('Failed to add article');
                }
            }
        } catch (error) {
            console.error('Failed to add/update article', error);
            toast.error('Failed to add/update article');
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-6 rounded-lg shadow-lg max-w-md mx-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {articleToEdit ? 'Edit Article' : 'Add New Article'}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="mt-1"
                            placeholder="Enter Article title"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={data.content}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Enter Article description"
                            required
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button onClick={handleSubmit} variant="default">{articleToEdit ? 'Update Article' : 'Add Article'}</Button>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleFormDialog;
