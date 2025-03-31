import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { AuthProvider, useAuthContext } from '@/store';

export default function AppLayout() {
  const { token, isLoading } = useAuthContext();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
