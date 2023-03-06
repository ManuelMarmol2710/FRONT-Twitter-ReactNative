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
import SettingsPage from "./src/pages/SettingsPage";
import NewTweetPage from "./src/pages/NewTweet";
import { BottomTab } from "./src/navigation/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <SafeAreaProvider>
    <Tab.Navigator 
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 90,
        paddingHorizontal: 5,
        paddingTop: 0,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        borderTopWidth: 0,
        paddingBottom: 35
    },
      tabBarActiveTintColor: '#0e00ff',
      tabBarInactiveTintColor: 'gray',
  }} sceneContainerStyle={{backgroundColor: '#afc7d8'}}
  
  >
      <Tab.Screen name="Home" component={HomePage} options={{tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size}/>
          ),}}/>
      <Tab.Screen name="Buscar" component={BuscarPage} options={{tabBarLabel: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="magnify" color={color} size={size} />
          ),}}/>
          <Tab.Screen name="Nuevo" component={NewTweetPage} options={{tabBarLabel: 'Tweetear',
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus-box" color={color} size={size} />
          ),}}/>
      <Tab.Screen name="Profile" component={ProfilePage} options={{tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-box" color={color} size={size} />
          ),}}/>
      <Tab.Screen name="Settings" component={SettingsPage} options={{tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="wrench" color={color} size={size} />
          ),}}/>
      
    </Tab.Navigator>
    </SafeAreaProvider>
  );
}



export default function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{

      cardStyle: { backgroundColor: '#afc7d8' }
  }}>
        <Stack.Screen name="login" component={LoginPage} options={{headerShown:false}}/>
        <Stack.Screen name="buscar" component={BuscarPage}  options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
        <Stack.Screen name="register" component={RegisterPage} options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
        <Stack.Screen name="profile" component={ProfilePage} options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          }}}/>
        <Stack.Screen name="sendEmail" component={SendEmailPage} options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
        <Stack.Screen name="EditProfile" component={EditProfilePage} options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
        <Stack.Screen name="awayprofile" component={AwayProfile} options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
        <Stack.Screen name="follow" component={SiguiendoPage}  options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
          <Stack.Screen name="settings" component={SettingsPage}  options={{ title: '' ,
          headerStyle: {
            backgroundColor: '#afc7d8',
          }}}/>
        <Stack.Screen name="homepage" component={Home} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
