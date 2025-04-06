import { Redirect, Slot } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuthContext } from '@/store';
import { HomeHeader } from '@/components/HomeHeader';

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
      <Slot />
    </>
  );
}
