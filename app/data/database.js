import * as SQLite from "expo-sqlite";

// Open or create the database
const db = SQLite.openDatabaseSync("little_lemon.db");

export async function initDatabase() {
  return await db.withTransactionAsync(async () => {
    // Create the menu items table if it doesn't exist
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT)"
    );
  });
}

export async function clearMenuItems() {
  return await db.withTransactionAsync(async () => {
    await db.runAsync("DELETE FROM menu_items");
  });
}

export async function saveMenuItems(menuItems) {
  // First clear existing items
  await clearMenuItems();

  // Then insert new items
  return await db.withTransactionAsync(async () => {
    for (const item of menuItems) {
      await db.runAsync(
        "INSERT INTO menu_items (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
        [item.name, item.price, item.description, item.image, item.category]
      );
    }
    console.log(`${menuItems.length} menu items saved successfully`);
  });
}

export async function getMenuItems() {
  const result = await db.getAllAsync("SELECT * FROM menu_items");
  return result;
}
