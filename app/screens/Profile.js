import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import Checkbox from "../components/Checkbox";
import PhoneNumberInput from "../components/PhoneNumberInput";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ onLogout }) {
  const [profileImg, setProfileImg] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [emailNotifs, setEmailNotifs] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem("first_name", (_) => {}).then((val) => {
      setFirstName(val);
    });
    AsyncStorage.getItem("last_name", (_) => {}).then((val) => {
      setLastName(val);
    });
    AsyncStorage.getItem("email", (_) => {}).then((val) => {
      setEmail(val);
    });
    AsyncStorage.getItem("phone", (_) => {}).then((val) => {
      setPhone(val);
    });
    AsyncStorage.getItem("profile_img", (_) => {}).then((val) => {
      setProfile(val);
    });
    AsyncStorage.getItem("email_notifs", (_) => {}).then((val) => {
      setEmailNotifs(JSON.parse(val));
    });
  }, []);

  const save = () => {
    console.log("Saving");
    AsyncStorage.setItem("first_name", firstName);
    AsyncStorage.setItem("last_name", lastName);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("phone", phone);
    AsyncStorage.setItem("profile_img", profileImg);
    AsyncStorage.setItem("email_notifs", JSON.stringify(emailNotifs));
  };

  const handleBackPress = () => {
    // TODO Pop
  };

  const handleLogOut = () => {
    onLogout();
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
  };

  const handleChangeImage = async () => {
    console.log("handleChangeImage");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
    }
  };

  const handleChangeNotif = (notif, enable) => {
    if (enable) {
      setEmailNotifs((prev) => {
        return [...prev, notif];
      });
    } else {
      setEmailNotifs((prev) => {
        return prev.filter((n) => n != notif);
      });
    }
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
            resizeMode="contain"
            source={require("../../assets/images/little-lemon-logo-grey.png")}
          />
          <Text style={styles.littleLemon}>Little Lemon</Text>
        </View>
        {profileImg != "" ? (
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
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Personal Information</Text>
        <View style={{ height: 8 }} />
        <Text style={styles.label}>Avatar</Text>
        <View style={styles.avatarContainer}>
          {profileImg != "" ? (
            <Image
              source={{ uri: profileImg }}
              resizeMode="cover"
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
          <Pressable
            style={[styles.primaryButton, { marginLeft: 12 }]}
            onPress={handleChangeImage}
          >
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
          value={firstName}
        />
        <View style={{ height: 16 }} />
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={[styles.input, lastNameError ? styles.errorInput : null]}
          onChangeText={handleChangeLastName}
          value={lastName}
        />
        <View style={{ height: 16 }} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          onChangeText={handleChangeEmail}
          value={email}
        />
        <View style={{ height: 16 }} />
        <Text style={styles.label}>Phone number</Text>
        <PhoneNumberInput onValidNumber={(v) => handleChangePhone(v)} />
        <View style={{ height: 16 }} />
        <Text style={styles.headerText}>Email notifications</Text>;
        <View style={{ height: 16 }} />
        <Checkbox
          label={"Order statuses"}
          onToggle={(v) => {
            handleChangeNotif("order_status", v);
          }}
        />
        <View style={{ height: 8 }} />
        <Checkbox
          label={"Password changes"}
          onToggle={(v) => {
            handleChangeNotif("password_change", v);
          }}
        />
        <View style={{ height: 8 }} />
        <Checkbox
          label={"Special offers"}
          onToggle={(v) => {
            handleChangeNotif("special_offers", v);
          }}
        />
        <View style={{ height: 8 }} />
        <Checkbox
          label={"Newsletter"}
          onToggle={(v) => {
            handleChangeNotif("newsletter", v);
          }}
        />
        <View style={{ height: 16 }} />
        <Pressable style={styles.logOutButton} onPress={handleLogOut}>
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </Pressable>
        <View style={{ height: 16 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Pressable style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Discard</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={save}>
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
