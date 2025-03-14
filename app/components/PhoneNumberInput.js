import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const formatPhoneNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, "");

    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);

    // Format the number
    let formatted = limited;
    if (limited.length > 3) {
      formatted = `(${limited.slice(0, 3)}) ${limited.slice(
        3,
        6
      )}-${limited.slice(6)}`;
    } else if (limited.length > 0) {
      formatted = `(${limited}`;
    }

    setPhoneNumber(formatted);

    // Validate phone number
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    setIsValid(phoneRegex.test(formatted) || limited.length === 0);
  };

  return (
    <View>
      <TextInput
        value={phoneNumber}
        onChangeText={formatPhoneNumber}
        placeholder="(___) ___-____"
        keyboardType="phone-pad"
        maxLength={14}
      />
      {!isValid && phoneNumber.length > 0 && (
        <Text style={{ color: "red" }}>
          Please enter a valid US phone number
        </Text>
      )}
    </View>
  );
};

export default PhoneNumberInput;
