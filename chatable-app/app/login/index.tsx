import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { authService } from '@/services';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui';
import { IconSymbol } from '@/components/IconSymbol';
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import * as AuthSession from 'expo-auth-session';
import { useAuthContext } from '@/store';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';

type LoginDto = {
  account: string;
  password: string;
};

const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID;
const authUrl = `https://github.com/login/oauth/authorize`;
const redirectUri = AuthSession.makeRedirectUri({
  path: 'http://localhost:8081/login/callback-github',
  native: 'chatable://login/callback-github',
});

const generateState = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(16);
  return Buffer.from(randomBytes).toString('hex');
};

export default function Login() {
  const [loginDto, setLogonDto] = useImmer<LoginDto>({} as LoginDto);
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
    },
    { authorizationEndpoint: authUrl }
  );

  const handleLoginByGitHub = async () => {
    try {
      const result = await promptAsync({});
      console.log('登录', result.type);

      // if (result.type === 'success') {
      //   const { code, state } = result.params;
      //   if (!request) {
      //     console.error(`request is null`);
      //     return;
      //   }
      //   if (request.state !== state) {
      //     console.error(`invalid state ${request.state}`);
      //     return;
      //   }
      //   const res = await authService.authControllerLoginByGithubCallback({ code, state });
      //   signIn(res.access_token);
      //   router.replace('/');
      // } else if (result.type === 'error') {
      //   console.error(result.error);
      //   return;
      // }
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
        placeholder="手机号/邮箱"
        value={loginDto.account}
        onChangeText={(value) => {
          setLogonDto((draft) => void (draft.account = value));
        }}
        onSubmitEditing={() => {}}
      />
      <Input
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
        style={{ width: '100%' }}
        disabled={loading || !request}
        onPress={() => {
          run(loginDto);
        }}
      >
        登录
      </Button>

      <TouchableOpacity onPress={handleLoginByGitHub}>
        <AntDesignIcon name="github" size={14}></AntDesignIcon>
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
});
