'use client';

import type { BlogPost } from '@/types';
import { createContext, useContext } from 'react';

const INITIAL_STATE: {
  blogs: BlogPost[];
} = {
  blogs: [],
};

const BlogsContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

const BlogsProvider = ({ blogs, children }: { blogs: BlogPost[]; children: React.ReactNode }) => {
  return <BlogsContext.Provider value={{ blogs }}>{children}</BlogsContext.Provider>;
};

const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
};

export { useBlogs };
export default BlogsProvider;
