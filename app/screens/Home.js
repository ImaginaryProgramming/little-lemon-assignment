import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler";
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
import CommonStyles from "../CommonStyles";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home() {
  const [profileImg, setProfileImg] = React.useState("");
  const [menu, setMenu] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [query, setQuery] = React.useState("");

  // Load async data
  React.useEffect(() => {
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
    fetchData().then(async () => {
      const cats = menu.map((item) => item.category.toLowerCase());
      setCategories([...new Set(cats)]);
    });
  }, []);

  const handleBackPress = () => {
    // TODO Pop
  };

  const toggleCategory = (category) => {
    category = category.toLowerCase();
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat != category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const filteredMenu = menu
    .filter((item) => {
      if (selectedCategories.length == 0) {
        return true;
      } else {
        return selectedCategories.includes(item.category.toLowerCase());
      }
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <LittleLemonHeader
        handleBackPress={handleBackPress}
        profileImg={profileImg}
      />

      <View style={styles.bannerContainer}>
        <Text style={styles.bannerLittleLemon}>Little Lemon</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={[CommonStyles.h1, { color: "white" }]}>Chicago</Text>
            <Text style={styles.bannerText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            style={styles.bannerImage}
            source={require("../../assets/images/chef.jpg")}
          />
        </View>
        <View style={styles.searchContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={"search"} size={24} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a dish..."
              onChangeText={(text) => {
                setQuery(text);
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.filteringContainer}>
        <Text style={[CommonStyles.h1, { marginVertical: 8 }]}>
          ORDER FOR DELIVERY!
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                selectedCategories.includes(category.toLowerCase()) &&
                  styles.selectedCategory,
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategories.includes(category.toLowerCase()) &&
                    styles.selectedCategoryText,
                ]}
              >
                {category[0].toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={[CommonStyles.divider, { marginTop: 20 }]} />

      <FlatList
        data={filteredMenu}
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

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: "#495E57",
    padding: 16,
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 16,
    marginVertical: "auto",
    marginLeft: 16,
  },
  bannerLittleLemon: {
    color: "#f4ce14",
    fontSize: 24,
    fontWeight: "bold",
  },
  bannerText: {
    color: "white",
    fontSize: 14,
  },
  filteringContainer: {
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
  },
  categoryButton: {
    backgroundColor: "#EDEFEE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: "#495E57",
  },
  categoryText: {
    color: "#495E57",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "white",
  },
  searchContainer: {
    marginTop: 16,
    backgroundColor: "#EDEFEE",
    borderRadius: 8,
    padding: 8,
  },
  searchInput: {
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  searchIcon: {
    color: "#333",
  },
});
