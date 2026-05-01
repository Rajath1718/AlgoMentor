let db: any = null;

const getDatabase = async () => {
  if (!db) {
    const SQLite = await import("expo-sqlite");
    db = SQLite.openDatabaseSync("algomentor.db");
  }

  return db;
};

export const initDatabase = async () => {
  const database = await getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT DEFAULT '',
      bio TEXT DEFAULT ''
    );
  `);
};

export const registerUser = async (email: string, password: string) => {
  try {
    const database = await getDatabase();

    await database.runAsync(
      "INSERT INTO users (email, password, name, bio) VALUES (?, ?, ?, ?);",
      [email, password, "New User", ""]
    );

    return true;
  } catch (error) {
    console.log("Register Error:", error);
    return false;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const database = await getDatabase();

    return await database.getFirstAsync(
      "SELECT * FROM users WHERE email = ? AND password = ?;",
      [email, password]
    );
  } catch (error) {
    console.log("Login Error:", error);
    return null;
  }
};

export const updateUserProfile = async (
  email: string,
  name: string,
  bio: string
) => {
  try {
    const database = await getDatabase();

    await database.runAsync(
      "UPDATE users SET name = ?, bio = ? WHERE email = ?;",
      [name, bio, email]
    );

    return true;
  } catch (error) {
    console.log("Profile Update Error:", error);
    return false;
  }
};

export const getUserProfile = async (email: string) => {
  try {
    const database = await getDatabase();

    return await database.getFirstAsync(
      "SELECT * FROM users WHERE email = ?;",
      [email]
    );
  } catch (error) {
    console.log("Get Profile Error:", error);
    return null;
  }
};