import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "./src/store/auth.store";

import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import HomePage from "./src/pages/HomePage";
import ProfilePage from "./src/pages/ProfilePage";
import EditProfilePage from "./src/pages/EditProfile";
import SendEmailPage from "./src/pages/SendEmail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./src/components/ProtectedRoute";
export default function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recoverpassword" element={<SendEmailPage/>} />
        <Route element={<ProtectedRoute isALlowed={isAuth} />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/EditProfile" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2020",
    alignItems: "center",
    justifyContent: "center",
  },
});
