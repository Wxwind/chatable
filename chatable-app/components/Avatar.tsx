import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType } from 'react-native';

type AvatarProps = {
  source?: ImageSourcePropType;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  style?: object;
};

const Avatar = ({ source, size = 32, borderWidth = 0, borderColor = 'white', style }: AvatarProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderColor,
        },
        style,
      ]}
    >
      <Image
        source={source || require('@/assets/images/avatar-default.png')}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        onError={() => console.log('图片加载失败')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;
