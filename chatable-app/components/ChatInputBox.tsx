import { useState } from 'react';
import { Input } from './core';
import { StyleProp, View, ViewStyle, StyleSheet, Pressable } from 'react-native';
import { InputProps } from './core/input/PropsType';
import { Icon } from './core/icon';

interface ChatInputBoxProps extends Omit<InputProps, 'value' | 'onChangeText'> {
  wrapperStyle?: StyleProp<ViewStyle>;
  onSubmit: (value: string) => void;
}

export function ChatInputBox(props: ChatInputBoxProps) {
  const { wrapperStyle, onSubmit, ...rest } = props;
  const [inputMsg, setInputMsg] = useState<string>('');

  return (
    <View style={[wrapperStyle, styles.chatInputBox]}>
      <Input
        value={inputMsg}
        onChangeText={setInputMsg}
        placeholder="给AI发送消息"
        {...rest}
        suffix={
          <View style={styles.submitIconWrapper}>
            <Pressable
              disabled={inputMsg.length === 0}
              onPress={() => {
                onSubmit(inputMsg);
                setInputMsg('');
              }}
            >
              <Icon size={20} name="arrow-up" color={inputMsg.length === 0 ? '#85c1e9' : '#fff'} />
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatInputBox: {
    flexDirection: 'row',
    marginHorizontal: 16,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 12,
  },

  submitIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#5DADE2',
  },

  submitIcon: {
    color: '#ffffff',
  },
});
