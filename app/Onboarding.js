import * as React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";

export default function Onboarding({ onNextPressed }) {
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const handleChangeName = (text) => {
    setName(text);
    if (!text.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
    if (!text.trim()) {
      setEmailError("Email is required");
    } else if (!validateEmail(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return emailRegex.test(email);
  };

  const handleNextPress = () => {
    onNextPressed();
  };

  const buttonEnabled =
    nameError == "" && emailError == "" && validateEmail(email);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/images/little-lemon-logo-grey.png")}
        />
        <Text style={styles.littleLemon}>Little Lemon</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...styles.h2,
            marginVertical: "auto",
          }}
        >
          Let us get to know you
        </Text>
      </View>
      <View style={{ flex: 3, marginVertical: 24, justifyContent: "flex-end" }}>
        <Text style={styles.h2}>First Name</Text>
        <TextInput
          style={[styles.input, nameError ? styles.errorInput : null]}
          onChangeText={handleChangeName}
        />
        <Text style={styles.h2}>Email</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          onChangeText={handleChangeEmail}
        />
      </View>
      <View style={styles.nextContainer}>
        <Pressable
          style={[
            styles.nextButton,
            buttonEnabled ? null : styles.disabledButton,
          ]}
          onPress={handleNextPress}
        >
          <Text style={[styles.nextText]}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DEE3E9",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  littleLemon: {
    color: "#495e57",
    marginLeft: 12,
    marginVertical: "auto",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginVertical: "auto",
  },
  container: {
    height: "100%",
    backgroundColor: "#EEEEEE",
  },
  h2: {
    color: "#324652",
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 2,
    padding: 10,
    marginVertical: 12,
    marginHorizontal: 48,
    borderRadius: 8,
    borderColor: "#324652",
    color: "#324652",
  },
  errorInput: {
    borderColor: "red",
    color: "red",
  },
  nextButton: {
    height: 40,
    width: 100,
    backgroundColor: "#f4ce14",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#cbd2d9",
  },
  nextText: {
    color: "#465a69",
    fontSize: 20,
  },
  nextContainer: {
    height: 100,
    backgroundColor: "#f1f4f7",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 32,
  },
});
