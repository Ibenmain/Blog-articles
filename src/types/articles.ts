export interface Article {
    id: string;
    title: string;
    content: string;
}

export interface ArticleListProps {
    articles: Article[];
    onDelete: (id: string) => void;
    onUpdate: (article: Article) => void;
    onExpand: (id: string) => void;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    author?: string;
    createdAt?: string;
}

export interface ArticleDetailProps {
    article: Article | null;
}

export interface ArticleFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    articleToEdit?: { id: string; title: string; content: string };
}
