import { Redirect, Slot } from 'expo-router';
import { Text } from 'react-native';
import { useAuthContext } from '@/store';
import { AutoView } from '@/components/core';
import Drawer from '@/components/core/drawer';
import { useGetSessions } from '@/hooks/services';
import { HomeDrawer } from '@/components/HomeDrawer';

export default function SessionLayout() {
  return (
    <AutoView>
      <HomeDrawer />
      <Slot />
    </AutoView>
  );
}
