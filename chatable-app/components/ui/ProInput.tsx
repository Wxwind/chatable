import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';

export interface ProInputProps extends TextInputProps {
  prefix?: React.ReactNode;
}

export function ProInput(props: ProInputProps) {
  const { prefix, ...rest } = props;
  return (
    <View style={styles.container}>
      {prefix}
      <TextInput style={styles.input} {...rest} />
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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
