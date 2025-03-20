import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { authService } from '@/services';
import * as SecureStore from 'expo-secure-store';
import { StoreKeyEnum } from '@/constants';

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
    <ThemedView>
      <ThemedText type="title">Chatable</ThemedText>
      <View style={styles.container}>
        <TextInput placeholder="用户名" onChangeText={() => {}} onSubmitEditing={() => {}} />
        <TextInput secureTextEntry placeholder="密码" />
      </View>
      <Button
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
    marginTop: '20%',
  },
});
