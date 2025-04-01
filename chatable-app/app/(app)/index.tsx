import { StyleSheet } from 'react-native';
import React from 'react';
import { AutoView } from '@/components/core';
import { ChatInputBox } from '@/components/ChatInputBox';

export default function ChatScreen() {
  const handleSubmitMessage = (value: string) => {};

  return (
    <AutoView>
      <ChatInputBox onSubmit={handleSubmitMessage} />
    </AutoView>
  );
}

const styles = StyleSheet.create({});
