import React from "react";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function LittleLemonHeader({
  handleBackPress,
  handleImgPress,
  profileImg,
}) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleBackPress}>
        <Icon name={"arrow-back"} size={20} color={"#ffffff"} />
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../../assets/images/little-lemon-logo-grey.png")}
        />
        <Text style={styles.littleLemon}>Little Lemon</Text>
      </View>
      <Pressable onPress={handleImgPress} style={{ marginVertical: "auto" }}>
        {profileImg != null && profileImg != "" ? (
          <Image
            source={{ uri: profileImg }}
            resizeMode="cover"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        ) : (
          <Icon
            name={"account-circle"}
            size={42}
            style={styles.noProfileIcon}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  littleLemon: {
    color: "#495e57",
    marginLeft: 8,
    marginVertical: "auto",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginVertical: "auto",
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#495e57",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  noProfileIcon: {
    color: "#495e57",
    marginVertical: "auto",
  },
});
