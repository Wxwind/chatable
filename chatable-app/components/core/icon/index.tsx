import { IconOutline, OutlineGlyphMapType } from '@ant-design/icons-react-native';
import React from 'react';
import { TextProps } from 'react-native';
import { WithTheme } from '../style';
export type IconNames = OutlineGlyphMapType;
export interface IconProps extends TextProps {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | number;
  color?: string;
  name: IconNames;
}

export function Icon(props: IconProps) {
  const { size = 'md', color, name, ...rest } = props;
  const sizeMap: { [key: string]: number } = {
    xxs: 15,
    xs: 18,
    sm: 21,
    md: 22,
    lg: 36,
  };
  const fontSize = typeof size === 'string' ? sizeMap[size] : size;

  return (
    <WithTheme>
      {(_, theme) => <IconOutline size={fontSize} color={color || theme.color_icon_base} name={name} {...rest} />}
    </WithTheme>
  );
}
