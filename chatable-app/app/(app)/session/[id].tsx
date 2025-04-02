import { MessageBubble } from '@/components/MessgeBubble';
import { useGetSession } from '@/hooks/services';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function SessionPage() {
  const localParams = useLocalSearchParams<{ id: string }>();
  const { data: session } = useGetSession(Number(localParams.id));

  return (
    <View>
      <View>{session?.map((a) => <MessageBubble sender={a.sender} message={a.message} />)}</View>
    </View>
  );
}
