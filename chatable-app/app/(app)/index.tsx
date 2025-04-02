import { StyleSheet } from 'react-native';
import React from 'react';
import { AutoView } from '@/components/core';
import { ChatInputBox } from '@/components/ChatInputBox';
import { HomeDrawer } from '@/components/HomeDrawer';

export default function ChatScreen() {
  const handleSubmitMessage = (value: string) => {};

  return (
    <AutoView>
      <HomeDrawer />
      <ChatInputBox onSubmit={handleSubmitMessage} />
    </AutoView>
  );
}

const styles = StyleSheet.create({});
