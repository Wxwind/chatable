import { useGetSessions, useGetUser } from '@/hooks/services';
import Drawer from './core/drawer';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Avatar from './Avatar';
import React, { ReactNode, useState } from 'react';
import { Icon } from './core/icon';
import Constants from 'expo-constants';
import { useAuthContext } from '@/store';

interface HomeHeaderProps {
  title: string;
  children: ReactNode;
}

export function HomeHeader(props: HomeHeaderProps) {
  const { title, children } = props;
  const { data: sessions } = useGetSessions();
  const { data: user } = useGetUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { signOut } = useAuthContext();

  const sessionList = (
    <View style={styles.drawer}>
      <View style={styles.list}>
        {sessions?.map((session) => {
          return (
            <View style={styles.sessionWrapper}>
              <Link href={`/session/${session.id}`}>{session.title}</Link>
            </View>
          );
        })}
      </View>

      <View style={styles.userBar}>
        <Avatar source={{ uri: user?.avatar }}></Avatar>
        <Text style={styles.userBarUserName}>{user?.username}</Text>
        <Pressable
          hitSlop={10}
          onPress={() => {
            signOut();
          }}
          style={styles.logoutBtn}
        >
          <Icon name={'logout'}></Icon>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Drawer sidebar={sessionList} open={drawerOpen} onOpenChange={setDrawerOpen} drawerType="slide" position="left">
      <View style={styles.header}>
        <Pressable
          hitSlop={10}
          onPress={() => {
            setDrawerOpen(true);
          }}
          style={styles.drawerBtn}
        >
          <Icon name={'menu-fold'}></Icon>
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {children}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    display: 'flex',
    height: '100%',
  },
  header: {
    height: 40,
    padding: 8,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  drawerBtn: {
    position: 'absolute',
    left: 8,
  },
  title: {
    width: 300,
    textAlign: 'center',
    fontSize: 18,
  },

  list: {
    rowGap: 8,
    flex: 1,
  },

  userBar: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#3f3f3f',
    alignItems: 'center',
  },

  userBarUserName: {
    paddingLeft: 8,
    flex: 1,
  },

  logoutBtn: {},

  sessionWrapper: {
    height: 40,
  },
});
