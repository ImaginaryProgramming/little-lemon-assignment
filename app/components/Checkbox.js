import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Checkbox({ label }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 2,
            borderRadius: 4,
            borderColor: "#495e57",
            backgroundColor: isChecked ? "#495e57" : "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isChecked && <MaterialIcons name="check" size={16} color="white" />}
        </View>
      </Pressable>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 12,
          color: "#4b4d4f",
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
