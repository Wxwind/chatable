import { TextInput, StyleSheet, View, ButtonProps, Button } from 'react-native';

export interface ProButtonProps extends ButtonProps {}

export function ProButton(props: ProButtonProps) {
  const {} = props;
  return (
    <View style={styles.container}>
      <Button {...props} />
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
  button: {},
});
