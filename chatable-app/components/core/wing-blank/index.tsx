import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { WithTheme } from '../style';

export interface WingSpaceProps {
  style?: StyleProp<ViewStyle>;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}
export function WingSpace(props: WingSpaceProps) {
  const { size = 'lg', style, children } = props;

  return <WithTheme>{(_, theme) => <View style={[{ height: theme[`v_spacing_${size}`] }, style]} />}</WithTheme>;
}
