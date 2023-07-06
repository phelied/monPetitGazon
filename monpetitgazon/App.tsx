import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import Clubs from "./src/components/Clubs";
import Players from "./src/components/Players";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayerDetails from "./src/components/PlayerDetails";

const Tab = createBottomTabNavigator();
const PlayersStack = createNativeStackNavigator();


function PlayersStackScreen() {
  return (
    <PlayersStack.Navigator>
      <PlayersStack.Screen name="players" component={Players} />
      <PlayersStack.Screen name="playerDetails" component={PlayerDetails} />
    </PlayersStack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="clubs" component={Clubs} />
          <Tab.Screen name="players" component={PlayersStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  marginTop: 40,
    backgroundColor: "#fff",
  },
});
