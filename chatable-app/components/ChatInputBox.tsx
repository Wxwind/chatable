import { useState } from 'react';
import { AutoView, Input } from './core';

interface ChatInputBoxProps {
  onSubmit: (value: string) => void;
}

export function ChatInputBox(props: ChatInputBoxProps) {
  const {} = props;
  const [inputMsg, setInputMsg] = useState<string>('');

  return (
    <AutoView>
      <Input />
    </AutoView>
  );
}
