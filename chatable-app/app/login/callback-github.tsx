import { ThemedView } from '@/components/ThemedView';
import { authService } from '@/services';
import { useAuthContext } from '@/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuthContext();
  const params = useLocalSearchParams<{ code: string; state: string }>();

  useEffect(() => {
    const code = params.code;

    if (code) {
      authService.authControllerLoginByGithubCallback({ code, state: '' }).then((res) => {
        signIn(res.access_token);
        router.replace('/'); // 跳转回首页
      });
    } else {
      router.replace('/login'); // 无 code 则返回登录页
    }
  }, []);
  return <ThemedView style={styles.container}>登录中</ThemedView>;
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
    width: '100%',
    textAlign: 'center',
  },
});
