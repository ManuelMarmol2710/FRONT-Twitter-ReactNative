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
import TweetsPage from "./src/pages/TweetsPage";
import TweetsWithImage from "./src/pages/TweetsWithImage";
import OwnTweetsPage from "./src/pages/OwnTweetsPage";
import OwnTweetsWithImage from "./src/pages/OwnTweetsWithImage";
import NewTweetPage from "./src/pages/NewTweet";
import OwnComments from "./src/pages/OwnComments";
import AwayComments from "./src/pages/AwayComments";
import ShowLikePage from "./src/pages/ShowLikes";
import ShowLikeCommentsPage from "./src/pages/ShowLikesComments";
import ProfileUpdatePasswordPage from "./src/pages/ProfileUpdatePassword";
import ProfileUpdateNamelastPage from "./src/pages/ProfileUpdateName&last";
import ProfileUpdateBio from "./src/pages/ProfileUpdateBio";
import followingPage from "./src/pages/Following";
import AwayfollowingPage from "./src/pages/AwayFollowing";
import followersPage from "./src/pages/Followers";
import AwayfollowersPage from "./src/pages/AwayFollowers";
import 'react-native-gesture-handler'
import { BottomTab } from "./src/navigation/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LogBox, Button } from "react-native";
import {HeaderBackButton} from '@react-navigation/elements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 10,
          backgroundColor: "#afc7d8",
          position: "absolute",
          borderTopWidth: 2,
          borderTopColor: "#000000",
          paddingBottom: 35,
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#fff",
      }}
      sceneContainerStyle={{ backgroundColor: "#afc7d8" }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={BuscarPage}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <Icon name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo"
        component={NewTweetPage}
        options={{
          tabBarLabel: "Tweetear",
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="wrench" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: { backgroundColor: "#afc7d8" }
          }}
        >
          <Stack.Screen
            name="login"
            component={LoginPage}
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="buscar"
            component={BuscarPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="register"
            component={RegisterPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="profile"
            component={ProfilePage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
          <Stack.Screen
            name="sendEmail"
            component={SendEmailPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfilePage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="ProfileUpdatePassword"
            component={ProfileUpdatePasswordPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="ProfileUpdateNamelast"
            component={ProfileUpdateNamelastPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="ProfileUpdateBio"
            component={ProfileUpdateBio}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="awayprofile"
            component={AwayProfile}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="follow"
            component={SiguiendoPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="showTweets"
            component={TweetsPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="TweetsWithImage"
            component={TweetsWithImage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="showLikes"
            component={ShowLikePage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="showLikesComments"
            component={ShowLikeCommentsPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="OwnTweets"
            component={OwnTweetsPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="OwnTweetsWithImage"
            component={OwnTweetsWithImage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="newTweet"
            component={NewTweetPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="settings"
            component={SettingsPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />

          <Stack.Screen
            name="owncomment"
            component={OwnComments}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="awaycomment"
            component={AwayComments}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
              <Stack.Screen
            name="following"
            component={followingPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
                <Stack.Screen
            name="Awayfollowing"
            component={AwayfollowingPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
                 <Stack.Screen
            name="followers"
            component={followersPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
                <Stack.Screen
            name="Awayfollowers"
            component={AwayfollowersPage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#afc7d8",
              },
            }}
          />
          <Stack.Screen
            name="homepage"
            component={Home}
            options={{ title: "", gestureEnabled: false, headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
