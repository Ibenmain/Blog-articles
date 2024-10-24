import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleList from '@/components/component';
import { Button } from "@/components/ui/button";
import { signOut } from 'next-auth/react';
import axios from 'axios';
import ArticleFormDialog from '@/components/new-article';
import Image from 'next/image';

interface Article {
    id: string;
    title: string;
    content: string;
}

const Profile = () => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await axios.get('/api/articles/get-all-articles');
                setArticles(response.data);
            } catch (error) {
                console.error('Failed to fetch articles', error);
            }
        };
        getArticles();
    }, [isDialogOpen]);

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/articles/delete?id=${id}`);
            if (response.status === 200) {
                setArticles(articles.filter(article => article.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete article', error);
        }
    };

    const handleUpdate = (article: Article) => {
        setArticleToEdit(article);
        setIsDialogOpen(true);
    };

    const handleExpand = (id: string) => {
        router.push(`/articles/${id}`);
    };

    return (
        <div className="container flex-1 mx-auto">
            <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-800"><Image src={'/logo.png'} alt='not found' width={40} height={40}/></h1>
                    <div className="space-x-4">
                        <Button onClick={() => {
                            setArticleToEdit(null);
                            setIsDialogOpen(true);
                        }} variant="default">
                            Add Article
                        </Button>
                        <Button variant={"outline"} onClick={() => signOut({ callbackUrl: '/' })}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>
            <ArticleFormDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setArticleToEdit(null);
                }}
                articleToEdit={articleToEdit!}
            />
            <div className="p-8 pt-20">
                <h1 className="text-2xl font-bold mb-4">Articles</h1>
                <ArticleList articles={articles} onDelete={handleDelete} onUpdate={handleUpdate} onExpand={handleExpand} />
            </div>
        </div>
    );
};

export default Profile;
