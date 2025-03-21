import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import LittleLemonHeader from "../components/LittleLemonHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuItem from "../components/MenuItem";
import {
  initDatabase,
  populateDatabase,
  getMenuItems,
  saveMenuItems,
  clearMenuItems,
} from "../data/database";

export default function Home() {
  const [profileImg, setProfileImg] = React.useState("");
  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    // Load profile image from AsyncStorage
    AsyncStorage.getItem("profile_img", (_) => {}).then((val) => {
      setProfileImg(val);
    });

    async function fetchData() {
      try {
        await initDatabase();
        const items = await getMenuItems();

        if (items && items.length > 0) {
          console.log("Loaded menu items from database.");
          setMenu(items);
        } else {
          console.log("Database empty, fetching from API...");

          const response = await fetch(
            "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
          );
          const data = await response.json();
          console.log("Fetched data from API:", data);

          await saveMenuItems(data.menu);
          setMenu(data.menu);
        }
      } catch (e) {
        console.error("Error loading menu:", e);
      }
    }
    fetchData();
  }, []);

  const handleBackPress = () => {
    // TODO Pop
  };

  return (
    <ScrollView>
      <LittleLemonHeader
        handleBackPress={handleBackPress}
        profileImg={profileImg}
      />
      <FlatList
        data={menu}
        renderItem={({ item }) => {
          return (
            <MenuItem
              key={item.name}
              title={item.name}
              description={item.description}
              price={item.price}
              imageName={item.image}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
