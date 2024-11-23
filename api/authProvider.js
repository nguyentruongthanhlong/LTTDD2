import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser } from './apiService';

export const authProvider = {
  login: async ({ username, password }) => {
    try {
      await loginUser(username, password);
      await AsyncStorage.setItem("username", username);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Invalid username or password"));
    }
  },
  logout: async () => {
    try {
      await logoutUser();
      await AsyncStorage.removeItem("username");
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  checkError: async ({ status }) => {
    if (status === 401 || status === 403) {
      await AsyncStorage.removeItem("jwt-token");
      await AsyncStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const token = await AsyncStorage.getItem("jwt-token");
    return token ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};