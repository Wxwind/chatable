import { AIChatMessageBase } from '@/services/generated/data-contracts';
import { View } from 'react-native';

interface MessageBubbleProps {
  message: string;
  sender: AIChatMessageBase['sender'];
}

export function MessageBubble(props: MessageBubbleProps) {
  const { message, sender } = props;

  return <View>{message} </View>;
}
