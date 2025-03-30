import { Stack } from 'expo-router';
import React from 'react';

export default function LoginLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="callback-github" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
