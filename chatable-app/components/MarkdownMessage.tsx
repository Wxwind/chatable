import Markdown from 'react-native-markdown-display';

interface MarkdownMessageProps {
  content: string;
}

export function MarkdownMessage(props: MarkdownMessageProps) {
  const { content } = props;

  return (
    <Markdown
      // https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js
      style={{
        body: { fontSize: 16, color: '#333' }, // 基础文本样式
        code_inline: { backgroundColor: '#f0f0f0' }, // 行内代码
        code_block: { fontFamily: 'Courier' }, // 代码块
        link: { color: 'blue' }, // 链接
      }}
    >
      {content}
    </Markdown>
  );
}
