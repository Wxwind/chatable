import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { ChatInputBox } from '@/components/ChatInputBox';
import { aiChatSessionService } from '@/services';
import { useRouter } from 'expo-router';
import { HomeHeader } from '@/components/HomeHeader';

export default function ChatScreen() {
  const router = useRouter();
  const handleCreateNewSession = async (value: string) => {
    const result = await aiChatSessionService.aiChatSessionControllerCreateSession({
      modelName: 'theb-ai',
      initialMessage: value,
    });

    router.replace(`/session/${result.sessionId}?init_message=${value}`);
  };

  return (
    <HomeHeader title="新对话">
      <View style={styles.wrapper}>
        <View style={styles.chatContent}>
          <Text style={styles.chatText}>发送消息以开始对话</Text>
        </View>
        <ChatInputBox onSubmit={handleCreateNewSession} placeholder="给AI发送消息" />
      </View>
    </HomeHeader>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  chatContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  chatText: {
    fontSize: 24,
    color: '#b4b7c1',
  },
});
