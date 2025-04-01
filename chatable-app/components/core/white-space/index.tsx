import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { WithTheme } from '../style';

export interface WingBlankProps {
  style?: StyleProp<ViewStyle>;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}
export function WingBlank(props: WingBlankProps) {
  const { size = 'lg', style, children } = props;

  return (
    <WithTheme>
      {(_, theme) => {
        const margin = theme[`h_spacing_${size}`];
        return <View style={[{ marginLeft: margin, marginRight: margin }, style]}>{children}</View>;
      }}
    </WithTheme>
  );
}
