import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { ArticleDetailProps } from '@/types/articles';


const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    const router = useRouter();
    if (!article) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-700">Article Not Found</h1>
                    <p className="text-gray-500">We could&apos;t find the article you were looking for.</p>
                    <Button onClick={() => router.push('/articles/articles-list')} variant="default" className="mt-4">Go Back Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-20">
            <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold text-gray-800"><Image src={'/logo.png'} alt='not found' width={40} height={40}/></h1>
                    <div className="space-x-4">
                        <Button variant={"outline"} onClick={() => signOut({ callbackUrl: '/' })}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>
            <div>
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 mb-8 ">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
                    <div className="text-sm text-gray-500 mb-6">
                        <p>{new Date(article.createdAt ?? '').toLocaleDateString()}</p>
                    </div>
                    <p>{article.content}</p>
                </div>
                <div className="mt-8">
                    <Button onClick={() => router.push('/articles/articles-list')} variant="outline">Back to Articles</Button>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params || {};

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/get-article/${id}`);
        const article = response.data;

        return {
            props: {
                article,
            },
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        return {
            props: {
                article: null,
            },
        };
    }
};

export default ArticleDetail;
