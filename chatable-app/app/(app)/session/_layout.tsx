import { Slot } from 'expo-router';
import { View } from 'react-native';
import { HomeHeader } from '@/components/HomeHeader';

export default function SessionLayout() {
  return (
    <>
      <Slot />
    </>
  );
}
