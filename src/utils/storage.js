// src/utils/storage.js

// -----------------------------
// BASIC GET + SET
// -----------------------------
export const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const load = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch {
      return null;
    }
  };
  
  // -----------------------------
  // USER ACCOUNT HANDLING
  // -----------------------------
  
  // Load all users
  export const getAllUsers = () => {
    return load("users") || [];
  };
  
  // Save all users
  export const saveAllUsers = (users) => {
    save("users", users);
  };
  
  // Set logged-in user
  export const setCurrentUser = (user) => {
    save("currentUser", user);
  };
  
  // Get logged-in user
  export const getCurrentUser = () => {
    return load("currentUser");
  };
  
  // Get current user ID
  export const getCurrentUserId = () => {
    const u = getCurrentUser();
    return u ? u.id : null;
  };
  
  // -----------------------------
  // GENERIC PER-USER DATA LOGGING
  // -----------------------------
  
  // Load user-specific data type (workout, foodlog, activity, etc.)
  export const getUserData = (userId, type) => {
    return load(`${type}_${userId}`) || [];
  };
  
  // Save user-specific data
  export const saveUserData = (userId, type, data) => {
    save(`${type}_${userId}`, data);
  };
  
  // Delete an entry by ID
  export const deleteUserData = (userId, type, itemId) => {
    const key = `${type}_${userId}`;
    const data = load(key) || [];
    const updated = data.filter((item) => item.id !== itemId);
    save(key, updated);
  };
  
  // -----------------------------
  // SPECIAL: DAILY ACTIVITY (steps, minutes, calories)
  // Stored per user per date
  // -----------------------------
  export const getActivityForDate = (userId, date) => {
    return load(`activity_${userId}_${date}`) || null;
  };
  
  export const saveActivityForDate = (userId, date, activityObj) => {
    save(`activity_${userId}_${date}`, activityObj);
  };
  
  // -----------------------------
  // SPECIAL: CALENDAR DOTS (days that have activity)
  // -----------------------------
  export const getCalendarLog = (userId) => {
    return load(`calendar_${userId}`) || {};
  };
  
  export const saveCalendarLog = (userId, logs) => {
    save(`calendar_${userId}`, logs);
  };
  
  