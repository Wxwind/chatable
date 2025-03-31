import { AutoView } from './ui';

interface ChatInputBoxProps {
  value: string;
  onSubmit: (value: string) => void;
}

export function ChatInputBox(props: ChatInputBoxProps) {
  const {} = props;

  return <AutoView>ChatInputBox</AutoView>;
}
