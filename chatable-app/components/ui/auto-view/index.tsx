import React from 'react';
import { StyleProp, Text, TextProps, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

export interface AutoViewProps extends Omit<ViewProps & TextProps, 'style'> {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
}

export default function AutoView(props: AutoViewProps) {
  const { children, style, ...restProps } = props;

  if (Array.isArray(children)) {
    return (
      <View style={style as StyleProp<ViewStyle>} {...restProps}>
        {children.map((child) => {
          if (React.isValidElement(child)) {
            return child;
          }
          return <Text>{child}</Text>;
        })}
      </View>
    );
  }

  if (['number', 'string'].includes(typeof children)) {
    return (
      <Text style={style as StyleProp<TextStyle>} {...restProps}>
        {children}
      </Text>
    );
  }

  return (
    <View style={style as StyleProp<ViewStyle>} {...restProps}>
      {children}
    </View>
  );
}
