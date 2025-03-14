import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Splash() {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../assets/images/little-lemon-logo-grey.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: "100%",
    resizeMode: "contain",
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
});
