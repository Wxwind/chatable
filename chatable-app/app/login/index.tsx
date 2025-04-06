import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { authService } from '@/services';
import { Input, Button } from '@/components/core';
import { IconSymbol } from '@/components/IconSymbol';
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import * as AuthSession from 'expo-auth-session';
import { useAuthContext } from '@/store';
import { Link, useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { LoginDto } from '@/services/generated/data-contracts';

const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID;

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
};

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'chatable',
  path: 'login/callback-github',
});

console.log('redirectUri', redirectUri);

export default function Login() {
  const [loginDto, setLogonDto] = useImmer<LoginDto>({ account: '', password: '' });
  const { signIn } = useAuthContext();
  const router = useRouter();
  const { run, loading } = useRequest(authService.authControllerLogin, {
    manual: true,
    onSuccess: (result, params) => {
      setLogonDto({} as LoginDto);
      signIn(result.access_token);
      router.replace('/');
    },
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientId,
      scopes: ['read:user'],
      redirectUri: redirectUri,
      state: Crypto.randomUUID(),
    },
    discovery
  );

  const handleLoginByGitHub = async () => {
    try {
      const result = await promptAsync({
        createTask: false,
      });
      console.log('登录', result.type);

      if (result.type === 'success') {
        const { code, state } = result.params;
        if (!request) {
          console.error(`request is null`);
          return;
        }
        if (request.state !== state) {
          console.error(`invalid state ${request.state}`);
          return;
        }
        const res = await authService.authControllerLoginByGithubCallback({ code, state });
        signIn(res.access_token);
        router.replace('/');
      } else if (result.type === 'error') {
        console.error(result.error);
        router.replace('/login');
        return;
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Chatable
      </ThemedText>

      <Input
        style={styles.input}
        placeholder="手机号/邮箱"
        value={loginDto.account}
        onChangeText={(value) => {
          setLogonDto((draft) => void (draft.account = value));
        }}
        onSubmitEditing={() => {}}
      />
      <Input
        style={styles.input}
        prefix={<IconSymbol name="lock-outline" />}
        secureTextEntry
        placeholder="密码"
        value={loginDto.password}
        onChangeText={(value) => {
          setLogonDto((draft) => void (draft.password = value));
        }}
      />

      <Button
        type="primary"
        loading={loading}
        style={{ width: '100%', height: 48 }}
        disabled={loading || !request}
        onPress={() => {
          run(loginDto);
        }}
      >
        登录
      </Button>

      <Link href="/login/register" replace>
        暂无账号？去注册
      </Link>

      <TouchableOpacity onPress={handleLoginByGitHub}>
        <AntDesignIcon name="github" size={18}></AntDesignIcon>
      </TouchableOpacity>
    </ThemedView>
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
    width: '100%',
    textAlign: 'center',
  },
  input: {
    borderRadius: 8,
    borderColor: '#AFE8F0',
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 12,
  },
});
