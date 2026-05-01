export const initDatabase = async () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
};

export const registerUser = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const existingUser = users.find((u: any) => u.email === email);

  if (existingUser) return false;

  users.push({
    email,
    password,
    name: "New User",
    bio: "",
  });

  localStorage.setItem("users", JSON.stringify(users));

  return true;
};

export const loginUser = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  return users.find(
    (u: any) => u.email === email && u.password === password
  );
};

export const updateUserProfile = async (
  email: string,
  name: string,
  bio: string
) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const updatedUsers = users.map((u: any) =>
    u.email === email ? { ...u, name, bio } : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return true;
};

export const getUserProfile = async (email: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  return users.find((u: any) => u.email === email) || null;
};