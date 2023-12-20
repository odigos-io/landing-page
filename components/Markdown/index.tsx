import React from 'react';
import ReactMarkdown from 'react-markdown';

import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {value}
    </SyntaxHighlighter>
  );
};

const MarkdownRenderer = ({ markdownContent }) => {
  return (
    <ReactMarkdown
      components={{
        // code: CodeBlock,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={prism}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props} />
          );
        },
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
