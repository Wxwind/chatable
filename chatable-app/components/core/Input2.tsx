import { TextInput, TextInputProps, StyleSheet, View, Platform } from 'react-native';

export interface ProInputProps extends TextInputProps {
  prefix?: React.ReactNode;
}

export function Input2(props: ProInputProps) {
  const { prefix, ...rest } = props;
  return (
    <View style={styles.container}>
      {prefix}
      <TextInput
        style={[
          styles.input,
          Platform.select({
            web: {
              outline: 'none',
              boxShadow: 'none',
            },
          }),
        ]}
        {...rest}
        underlineColorAndroid={'transparent'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 42,
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderRadius: 8,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 24,
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
    borderWidth: 0,
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    textAlignVertical: 'center',
    includeFontPadding: true,
  },
});
