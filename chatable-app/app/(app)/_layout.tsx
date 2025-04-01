import { Redirect, Slot } from 'expo-router';
import { Text } from 'react-native';
import { useAuthContext } from '@/store';
import { AutoView } from '@/components/core';
import Drawer from '@/components/core/drawer';
import { useGetSessions } from '@/hooks/services';

export default function AppLayout() {
  const { token, isLoading } = useAuthContext();
  const sessions = useGetSessions();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <AutoView>
      <Drawer sidebar={<AutoView>123</AutoView>} />
      <Slot />
    </AutoView>
  );
}
