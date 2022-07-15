import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { cards } from "../../components/Card";
import Profile from "./Profile";

const Swiping = () => {
  const [profiles, setProfiles] = useState(cards);
  const onSwipe = useCallback(() => {
    setProfiles(profiles.slice(0, profiles.length - 1));
  }, [profiles]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View> */}
      <View style={styles.cards}>
        {profiles.map((profile, index) => {
          const onTop = index === profiles.length - 1;
          return (
            <Profile
              key={profile}
              profile={profile}
              onSwipe={onSwipe}
              onTop={onTop}
            />
          );
        })}
      </View>
      {/* <View style={styles.footer}>
        <RectButton style={styles.circle}>
          <Icon name="x" size={32} color="#ec5288" />
        </RectButton>
        <RectButton style={styles.circle}>
          <Icon name="heart" size={32} color="#6ee3b4" />
        </RectButton>
      </View> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    marginHorizontal: 16,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

export default Swiping;
