import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { authService } from '@/services';
import { Input, Button } from '@/components/core';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuthContext } from '@/store';
import { useRouter, Link } from 'expo-router';
import { CreateUserDto } from '@/services/generated/data-contracts';
import Toast from '@/components/core/toast';

export default function Login() {
  const [registerDto, setRegisterDto] = useImmer<Omit<CreateUserDto, 'type'>>({} as Omit<CreateUserDto, 'type'>);
  const { signIn } = useAuthContext();
  const router = useRouter();
  const { run, loading } = useRequest(authService.authControllerRegister, {
    manual: true,
    onSuccess: (result, params) => {
      setRegisterDto({} as Omit<CreateUserDto, 'type'>);
      router.replace('/');
    },
    onError: (error) => {
      Toast.fail(error.message);
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Chatable</ThemedText>

      <Input
        placeholder="手机号/邮箱"
        value={registerDto.account}
        onChangeText={(value) => {
          setRegisterDto((draft) => void (draft.account = value));
        }}
        onSubmitEditing={() => {}}
      />
      <Input
        placeholder="用户名"
        value={registerDto.username}
        onChangeText={(value) => {
          setRegisterDto((draft) => void (draft.username = value));
        }}
        onSubmitEditing={() => {}}
      />
      <Input
        prefix={<IconSymbol name="lock-outline" />}
        secureTextEntry
        placeholder="密码"
        value={registerDto.password}
        onChangeText={(value) => {
          setRegisterDto((draft) => void (draft.password = value));
        }}
      />

      <Button
        type="primary"
        loading={loading}
        style={{ width: '100%' }}
        disabled={loading}
        onPress={() => {
          run({
            type: 'email',
            ...registerDto,
          });
        }}
      >
        注册
      </Button>

      <Link href="/login" replace>
        已有账号？去登录
      </Link>
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
});
