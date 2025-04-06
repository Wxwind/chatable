import { AIChatMessageBase } from '@/services/generated/data-contracts';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { MarkdownMessage } from './MarkdownMessage';

interface MessageBubbleProps {
  message: string;
  sender: AIChatMessageBase['sender'];
}

export function MessageBubble(props: MessageBubbleProps) {
  const { message, sender } = props;

  const style: StyleProp<ViewStyle> =
    sender === 'ai'
      ? { backgroundColor: '#efefef' }
      : {
          backgroundColor: '#eff6ff',
        };

  return (
    <View style={[style, { padding: 20, borderRadius: 10 }]}>
      {sender === 'ai' ? <MarkdownMessage content={message} /> : <Text>{message}</Text>}
    </View>
  );
}
