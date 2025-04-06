import { ChatInputBox } from '@/components/ChatInputBox';
import Toast from '@/components/core/toast';
import { HomeHeader } from '@/components/HomeHeader';
import { MessageBubble } from '@/components/MessgeBubble';
import { StoreKeyEnum } from '@/constants';
import { useGetSessionMessages, usePostMessage } from '@/hooks/services';
import { useGetCurSession } from '@/hooks/useGetCurSession';
import { getStorageStateExternal } from '@/hooks/useStorageState';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import EventSource, { EventSourceOptions } from 'react-native-sse';

export default function SessionPage() {
  const localParams = useLocalSearchParams<{ id: string }>();
  const sessionId = Number(localParams.id);
  const { data: session } = useGetSessionMessages(sessionId);
  const curSession = useGetCurSession(sessionId);
  const eventSourceRef = useRef<EventSource | null>(null);
  const { init_message: initMessage } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const { mutate } = usePostMessage();

  const handlePostMessage = async (value: string) => {
    if (eventSourceRef.current !== null) {
      Toast.fail('当前对话尚未结束');
      return;
    }
    if (!curSession) {
      console.log('session数据尚未加载完毕');
      return;
    }

    const token = await getStorageStateExternal(StoreKeyEnum.Token);
    const options: EventSourceOptions = { headers: {}, method: 'post', body: { message: value } };
    if (token) {
      options.headers = {
        Authorization: 'Bearer ' + token,
      };
    }
    const eventSource = new EventSource(
      `${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}/ai-chat-session/session/${sessionId}/chat`,
      options
    );
    eventSourceRef.current = eventSource;
    let messageOrigin = '';
    eventSource.addEventListener('message', (event) => {
      try {
        if (event.data !== '[DONE]') {
          const data = JSON.parse(event.data!);
          const content = data.choices[0]?.delta?.content || '';
          messageOrigin += content;
        }
        //  messages.value[messages.value.length - 1].msg = md.render(messageOrigin);
        // 调用滚动方法

        if (event.data === '[DONE]') {
          eventSourceRef.current = null;
        }
      } catch (error) {
        console.error('消息异常:', error);
      }
    });

    eventSource.addEventListener('error', (event) => {
      console.error('SSE 错误:', JSON.stringify(event));
      eventSource.close();
      eventSourceRef.current = null;
    });
  };

  const handlePostMessageImme = (value: string) => {
    mutate({ sessionId, message: value });
  };

  useEffect(() => {
    if (initMessage && typeof initMessage === 'string') {
      handlePostMessageImme(initMessage);
    }
  }, [initMessage]);

  return (
    <HomeHeader title={curSession?.title || ''}>
      <View style={styles.wrapper}>
        <FlatList
          style={styles.chatContent}
          data={session}
          renderItem={(a) => {
            return <MessageBubble sender={a.item.sender} message={a.item.message} />;
          }}
          keyExtractor={(item) => item.id.toString()}
        />
        <ChatInputBox disabled={!session} onSubmit={handlePostMessageImme} />
      </View>
    </HomeHeader>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  chatContent: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 16,
  },
});
