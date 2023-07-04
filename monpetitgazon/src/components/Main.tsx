import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Clubs from "./Clubs";
import Players from "./Players";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("clubs");

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {/* Bouton pour l'onglet "Clubs" */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "clubs" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("clubs")}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === "clubs" && styles.activeTabButtonText,
            ]}
          >
            Clubs
          </Text>
        </TouchableOpacity>

        {/* Bouton pour l'onglet "Players" */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "players" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("players")}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === "players" && styles.activeTabButtonText,
            ]}
          >
            Players
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "clubs" && <Clubs />}
      {selectedTab === "players" && <Players />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  titleText: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
    color: "#FD7F52",
  },
  jerseyImage: {
    width: 50,
    height: 100,
  },
  clubInfo: {
    color: "#6200BE",
    fontSize: 12,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFD",
    borderRadius: 5,
    marginHorizontal: 5,
  },

  activeTabButton: {
    backgroundColor: "#6200BE",
  },

  tabButtonText: {
    fontSize: 16,
    color: "#6200BE",
  },

  activeTabButtonText: {
    color: "#FFFFFD",
  },
});
