import React, { useEffect, useRef } from 'react';
import DrawerLayout, { DrawerLayoutProps } from 'react-native-gesture-handler/DrawerLayout';

export interface DrawerProps {
  onOpenChange?: (isOpen: boolean) => void;
  sidebar?: React.ReactNode;
  open?: boolean;
  position?: 'left' | 'right';
}

export interface DrawerNativeProps
  extends Partial<
      Omit<DrawerLayoutProps, 'onDrawerOpen' | 'onDrawerClose' | 'drawerPosition' | 'renderNavigationView'>
    >,
    DrawerProps {
  drawerRef?: (el: DrawerLayout | null) => void;
  drawerWidth?: number;
  drawerBackgroundColor?: string;
  children?: React.ReactNode;
}
export default function Drawer(props: DrawerNativeProps) {
  const { sidebar, position = 'left', open = false, drawerRef, drawerWidth = 300, onOpenChange, ...restProps } = props;

  const drawer = useRef<DrawerLayout | null>(null);

  useEffect(() => {
    if (drawer.current) {
      open ? drawer.current.openDrawer() : drawer.current.closeDrawer();
    }
  }, [open]);

  return (
    <DrawerLayout
      ref={(el) => {
        if (drawerRef) {
          drawerRef(el);
        }
        drawer.current = el;
      }}
      renderNavigationView={() => sidebar}
      drawerPosition={position}
      onDrawerOpen={() => onOpenChange?.(true)}
      onDrawerClose={() => onOpenChange?.(false)}
      keyboardDismissMode="on-drag"
      drawerWidth={drawerWidth}
      {...restProps}
    />
  );
}
