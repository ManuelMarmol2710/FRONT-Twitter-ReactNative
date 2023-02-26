import { useAuthStore } from "./src/store/auth.store";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import HomePage from "./src/pages/HomePage";
import ProfilePage from "./src/pages/ProfilePage";
import EditProfilePage from "./src/pages/EditProfile";
import SendEmailPage from "./src/pages/SendEmail";
import BuscarPage from "./src/pages/BuscarPage";
import AwayProfile from "./src/pages/AwayProfile";
import SiguiendoPage from "./src/pages/Siguiendo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#afc7d8' }
  }}>
   
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="register" component={RegisterPage} />
        <Stack.Screen name="profile" component={ProfilePage} />
        <Stack.Screen name="sendEmail" component={SendEmailPage} />
        <Stack.Screen name="EditProfile" component={EditProfilePage} />
        <Stack.Screen name="awayprofile" component={AwayProfile} />
        <Stack.Screen name="buscar" component={BuscarPage}  />
        <Stack.Screen name="follow" component={SiguiendoPage}  />
        <Stack.Screen name="homepage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
