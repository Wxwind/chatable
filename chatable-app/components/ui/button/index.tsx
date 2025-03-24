// tslint:disable:no-empty
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewStyle,
} from 'react-native';
import AutoView from '../auto-view';
import { WithTheme, WithThemeStyles } from '../style';
import buttonStyles, { ButtonStyles } from './style';

export interface ButtonProps extends WithThemeStyles<ButtonStyles>, TouchableHighlightProps {
  type?: 'primary' | 'warning' | 'ghost';
  size?: 'large' | 'small';
  loading?: boolean;
  activeStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const {
    size = 'large',
    type = 'default',
    disabled = false,
    activeStyle,
    onPress,
    style,
    styles,
    underlayColor,
    loading,
    onPressIn,
    onPressOut,
    onShowUnderlay,
    onHideUnderlay,
    children,
    ...restProps
  } = props;

  const [state, setState] = useState<{ pressIn: boolean; touchIt: boolean }>({
    pressIn: false,
    touchIt: false,
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    setState({ pressIn: true, touchIt: state.touchIt });
    onPressIn?.(event);
  };
  const handlePressOut = (event: GestureResponderEvent) => {
    setState({ pressIn: false, touchIt: state.touchIt });
    onPressOut?.(event);
  };
  const handleShowUnderlay = () => {
    setState({ pressIn: state.pressIn, touchIt: true });
    onShowUnderlay?.();
  };

  const handleHideUnderlay = () => {
    setState({ pressIn: state.pressIn, touchIt: false });
    onHideUnderlay?.();
  };

  return (
    <WithTheme themeStyles={buttonStyles} styles={styles}>
      {(_styles) => {
        const textStyle = [
          _styles[`${size}RawText`],
          _styles[`${type}RawText`],
          disabled && _styles[`${type}DisabledRawText`],
          state.pressIn && _styles[`${type}HighlightText`],
        ];

        const wrapperStyle = [
          _styles.wrapperStyle,
          _styles[`${size}Raw`],
          _styles[`${type}Raw`],
          disabled && _styles[`${type}DisabledRaw`],
          state.pressIn && activeStyle && _styles[`${type}Highlight`],
          activeStyle && state.touchIt && activeStyle,
          style,
        ];

        const underlayColor = (StyleSheet.flatten(activeStyle ? activeStyle : _styles[`${type}Highlight`]) as any)
          .backgroundColor;

        const indicatorColor = (
          StyleSheet.flatten(state.pressIn ? _styles[`${type}HighlightText`] : _styles[`${type}RawText`]) as any
        ).color;

        return (
          <TouchableHighlight
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            activeOpacity={0.4}
            {...restProps}
            style={wrapperStyle}
            disabled={disabled}
            underlayColor={underlayColor}
            onPress={(e) => onPress && onPress(e)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onShowUnderlay={handleShowUnderlay}
            onHideUnderlay={handleHideUnderlay}
          >
            <View style={_styles.container}>
              {loading ? (
                <ActivityIndicator style={_styles.indicator} animating color={indicatorColor} size="small" />
              ) : null}
              <AutoView style={textStyle}>{children}</AutoView>
            </View>
          </TouchableHighlight>
        );
      }}
    </WithTheme>
  );
}
