// src/utils/auth.js

// Get all users
export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };
  
  // Save all users
  export const saveAllUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };
  
  // Register a new user
  export const registerUser = (userData) => {
    const users = getAllUsers();
  
    users.push(userData);
    saveAllUsers(users);
  };
  
  // Get a user by email
  export const getUserByEmail = (email) => {
    const users = getAllUsers();
    return users.find((u) => u.email === email) || null;
  };
  
  // Validate login
  export const loginUser = (email, password) => {
    const user = getUserByEmail(email);
  
    if (!user) return null;
    if (user.password !== password) return null;
  
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  };
  
  // Who is logged in now?
  export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  };
  
  // Logout user
  export const logoutUser = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  