import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { authService } from '@/services';
import * as SecureStore from 'expo-secure-store';
import { StoreKeyEnum } from '@/constants';
import { ProInput } from '@/components/ui/ProInput';
import { IconSymbol, ProButton } from '@/components/ui';

type LoginDto = {
  username: string;
  password: string;
};

export default function Login() {
  const [loginDto, setLogonDto] = useImmer<LoginDto>({} as LoginDto);
  const { run, loading } = useRequest(authService.authControllerLogin, {
    manual: true,
    onSuccess: (result, params) => {
      setLogonDto({} as LoginDto);
      SecureStore.setItemAsync(StoreKeyEnum.Token, result.access_token);
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Chatable
      </ThemedText>

      <ProInput placeholder="用户名" onChangeText={() => {}} onSubmitEditing={() => {}} />
      <ProInput prefix={<IconSymbol name="lock-outline" />} secureTextEntry placeholder="密码" />

      <ProButton
        disabled={loading}
        title="登录"
        onPress={() => {
          run(loginDto);
        }}
      />
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
