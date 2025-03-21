import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CommonStyles from "../CommonStyles";

export default function MenuItem({ title, description, price, imageName }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={CommonStyles.h2}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.price}>{`$${price}`}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageName}?raw=true`,
        }}
        resizeMode="cover"
        borderRadius={6}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    marginVertical: 8,
    fontSize: 14,
    color: "#495e57",
  },
  price: {
    fontSize: 16,
    color: "#495e57",
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 10,
    marginVertical: "auto",
  },
});
