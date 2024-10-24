import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Eye } from 'lucide-react';
import { ArticleListProps } from '@/types/articles';


const ArticleList: React.FC<ArticleListProps> = ({ articles, onDelete, onUpdate, onExpand }) => {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="p-4 border border-gray-300 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div className="flex-1 mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-gray-600">
              {article.content.length > 50 ? `${article.content.substring(0, 50)}...` : article.content}
            </p>
          </div>
          <div className="ml-4 flex space-x-2">
            <Button variant="outline" onClick={() => onUpdate(article)} className="flex items-center">
              <Edit className="mr-1" size={16} />
            </Button>
            <Button variant="outline" color="red" onClick={() => onDelete(article.id)} className="flex items-center">
              <Trash2 className="mr-1" size={16} />
            </Button>
            <Button variant="outline" onClick={() => onExpand(article.id)} className="flex items-center">
              <Eye className="mr-1" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
