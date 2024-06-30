import Markdown from '@/components/Markdown';

type Props = {
  content: string;
};

const BlogPageContent = ({ content }: Props) => {
  return (
    <div>
      <Markdown source={content} />
    </div>
  );
};

export default BlogPageContent;
