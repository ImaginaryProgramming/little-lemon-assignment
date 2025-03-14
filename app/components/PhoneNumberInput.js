import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const formatPhoneNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, "");

    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);

    // Format the number based on length
    let formatted = limited;
    if (limited.length > 6) {
      formatted = `(${limited.slice(0, 3)}) ${limited.slice(
        3,
        6
      )}-${limited.slice(6)}`;
    } else if (limited.length > 3) {
      formatted = `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else {
      formatted = limited;
    }

    setPhoneNumber(formatted);

    // Validate phone number (only if it's a complete number)
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    setIsValid(phoneRegex.test(formatted) || limited.length < 10);
  };

  return (
    <View>
      <TextInput
        value={phoneNumber}
        onChangeText={formatPhoneNumber}
        placeholder="(___) ___-____"
        keyboardType="phone-pad"
        maxLength={14}
        style={[styles.input, !isValid ? styles.errorInput : null]}
      />
      {!isValid && phoneNumber.length > 0 && (
        <Text style={{ color: "red" }}>
          Please enter a valid US phone number
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    borderColor: "#4b4d4f",
    color: "#4b4d4f",
  },
  errorInput: {
    borderColor: "red",
    color: "red",
  },
});
