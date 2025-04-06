import { ThemedView } from '@/components/ThemedView';
import { authService } from '@/services';
import { useAuthContext } from '@/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AutoView } from '@/components/core';

WebBrowser.maybeCompleteAuthSession();

export default function LoginCallbackGitHub() {
  const router = useRouter();
  const { signIn } = useAuthContext();
  const params = useLocalSearchParams<{ code: string; state: string }>();

  useEffect(() => {
    try {
      const code = params.code;
      console.log('code', code, params);
      // 移动端会跳转回此页面
      // if (code) {
      //   authService.authControllerLoginByGithubCallback({ code, state: '' }).then((res) => {
      //     console.log('set token');

      //     signIn(res.access_token);
      //     router.replace('/'); // 跳转回首页
      //   });
      // } else {
      //   router.replace('/login'); // 无 code 则返回登录页
      // }
    } catch (err) {
      console.error((err as Error).message);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录中...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    rowGap: 32,
  },
  title: {
    textAlign: 'center',
  },
});
