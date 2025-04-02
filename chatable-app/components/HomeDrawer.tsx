import { useGetSessions } from '@/hooks/services';
import Drawer from './core/drawer';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export function HomeDrawer() {
  const { data: sessions } = useGetSessions();

  const sessionList = (
    <View style={styles.list}>
      {sessions?.map((session) => {
        return (
          <View style={styles.sessionWrapper}>
            <Link href={`/session/${session.id}`}>{session.title}</Link>
          </View>
        );
      })}
    </View>
  );

  return (
    <Drawer sidebar={sessionList} position="left">
      123
    </Drawer>
  );
}

const styles = StyleSheet.create({
  list: {
    rowGap: 8,
  },

  sessionWrapper: {
    height: 40,
  },
});
