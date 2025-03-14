import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import Checkbox from "./components/Checkbox";
import PhoneNumberInput from "./components/PhoneNumberInput";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Profile() {
  const [profileImg, setProfileImg] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

  const handleBackPress = () => {
    // TODO Pop
  };

  const handleChangeFirstName = (text) => {
    setFirstName(text);
    if (!text.trim()) {
      setFirstNameError("Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleChangeLastName = (text) => {
    setLastName(text);
    if (!text.trim()) {
      setLastNameError("Name is required");
    } else {
      setLastNameError("");
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

  const handleChangePhone = (text) => {
    setPhone(text);
    if (!text.trim()) {
      setPhoneError("Phone number is required");
    } else if (!validateEmail(text)) {
      setPhoneError("Please enter a valid U.S. phone number");
    } else {
      setPhoneError("");
    }
  };

  const validatePhone = (email) => {
    // const emailRegex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    // return emailRegex.test(email);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Icon name={"arrow-back"} size={20} color={"#ffffff"} />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.logo}
            source={require("../assets/images/little-lemon-logo-grey.png")}
          />
          <Text style={styles.littleLemon}>Little Lemon</Text>
        </View>
        {profileImg != "" ? (
          <Image
            source={require("../assets/images/little-lemon-logo-grey.png")}
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
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Personal Information</Text>
        <View style={{ height: 8 }} />
        <Text style={styles.label}>Avatar</Text>
        <View style={styles.avatarContainer}>
          {profileImg != "" ? (
            <Image
              source={require("../assets/images/little-lemon-logo-grey.png")}
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
              }}
            />
          ) : (
            <Icon
              name={"account-circle"}
              size={70}
              style={styles.noProfileIcon}
            />
          )}
          <Pressable style={[styles.primaryButton, { marginLeft: 12 }]}>
            <Text style={styles.primaryButtonText}>Change</Text>
          </Pressable>
          <Pressable style={[styles.outlineButton, { marginLeft: 20 }]}>
            <Text style={styles.outlineButtonText}>Remove</Text>
          </Pressable>
        </View>
        <View style={{ height: 16 }} />
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={[styles.input, firstNameError ? styles.errorInput : null]}
          onChangeText={handleChangeFirstName}
          defaultValue={firstName}
        />
        <View style={{ height: 16 }} />
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={[styles.input, lastNameError ? styles.errorInput : null]}
          onChangeText={handleChangeFirstName}
          defaultValue={lastName}
        />
        <View style={{ height: 16 }} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          onChangeText={handleChangeEmail}
          defaultValue={email}
        />
        <View style={{ height: 16 }} />
        <Text style={styles.label}>Phone number</Text>
        <PhoneNumberInput />
        <View style={{ height: 16 }} />
        <Text style={styles.headerText}>Email notifications</Text>;
        <View style={{ height: 16 }} />
        <Checkbox label={"Order statuses"} />
        <View style={{ height: 8 }} />
        <Checkbox label={"Password changes"} />
        <View style={{ height: 8 }} />
        <Checkbox label={"Special offers"} />
        <View style={{ height: 8 }} />
        <Checkbox label={"Newsletter"} />
        <View style={{ height: 16 }} />
        <Pressable style={styles.logOutButton}>
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </Pressable>
        <View style={{ height: 16 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Pressable style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Discard</Text>
          </Pressable>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  mainContainer: {
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: "#7a7b86",
    fontWeight: "bold",
  },
  avatarContainer: {
    flexDirection: "row",
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
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  noProfileIcon: {
    color: "#495e57",
    marginVertical: "auto",
  },
  primaryButton: {
    height: 40,
    width: 100,
    backgroundColor: "#495e57",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: "auto",
  },
  primaryButtonText: {
    fontWeight: "500",
    color: "white",
  },
  outlineButton: {
    height: 40,
    width: 100,
    borderColor: "#4b4d4f",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: "auto",
  },
  outlineButtonText: {
    fontWeight: "500",
    color: "#4b4d4f",
  },
  logOutButton: {
    height: 40,
    width: "100%",
    backgroundColor: "#f4ce14",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  logOutButtonText: {
    fontWeight: "bold",
    color: "#111111",
  },
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
