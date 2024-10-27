import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleList from '@/components/article-list';
import { Button } from "@/components/ui/button";
import { signOut } from 'next-auth/react';
import axios from 'axios';
import ArticleFormDialog from '@/pages/articles/components/article-form';
import Image from 'next/image';
import { Article } from '@/types/articles';
import { useQuery } from 'react-query';

const fetchArticles = async () => {
    try {
        const response = await axios.get('/api/articles/get-all-articles');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch articles', error);
    }
};

const Articles = () => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);
    const { data: articles = [], refetch } = useQuery<Article[]>('articles', fetchArticles, {
        refetchOnWindowFocus: false,
    });

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/articles/delete?id=${id}`);
            if (response.status === 200) {
                refetch();
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
        router.push(`/articles/articles-details/${id}`);
    };

    return (
        <div className="container flex-1 mx-auto">
            <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-800"><Image src={'/logo.png'} alt='not found' width={40} height={40} /></h1>
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
                refetch={refetch}
                articleToEdit={articleToEdit!}
            />
            <div className="p-8 pt-20">
                <h1 className="text-2xl font-bold mb-4">Articles</h1>
                <ArticleList articles={articles} onDelete={handleDelete} onUpdate={handleUpdate} onExpand={handleExpand} />
            </div>
        </div>
    );
};

export default Articles;
