import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import API from "../utils/API";
import Clubs from "./Clubs";
import Players from "./Players";

interface Club {
  id: string;
  name: {
    fr: string;
    en: string;
    es: string;
  };
  shortName: string;
  defaultJerseyUrl: string;
  championships: {
    [championshipId: string]: {
      active: boolean;
      jerseys: {
        [year: string]: string;
      };
    };
  };
  defaultAssets: {
    logo: {
      small: string;
      medium: string;
    };
  } | null;
}

interface Player {
  id: number;
  name: string;
  position: number;
}

interface PlayerDetail {
  id: number;
  name: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

const App = () => {
  const [selectedTab, setSelectedTab] = useState("clubs");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetail | null>(
    null
  );

  useEffect(() => {
    API.fetchClubs().then((data) => {
      setClubs(data);
    });
    API.fetchPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  const getPlayerPosition = (positionId: number) => {
    switch (positionId) {
      case 10:
        return "Gardien";
      case 20:
        return "Défenseur";
      case 21:
        return "Latéral";
      case 30:
        return "Milieu défensif";
      case 31:
        return "Milieu offensif";
      case 40:
        return "Attaquant";
      default:
        return "Inconnu";
    }
  };

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setSelectedTab(tab);
  };

  const fetchPlayerDetail = async (playerId: number) => {
    try {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/mpg_championship_player_${playerId}/2022`
      );
      const data = await response.json();
      setSelectedPlayer(data);
    } catch (error) {
      console.error("Error fetching player detail:", error);
    }
  };

  const renderPlayerItem = ({ item }: { item: Player }) => (
    <TouchableOpacity onPress={() => fetchPlayerDetail(item.id)}>
      <View style={{ padding: 10 }}>
        <Text>{item.name}</Text>
        <Text>Position: {getPlayerPosition(item.position)}</Text>
      </View>
    </TouchableOpacity>
  );

  const cleanClubId = (id: String) => {
    const idWithoutPrefix = id.replace("mpg_", "");
    const cleanedId = idWithoutPrefix.replace(/_/g, " ");
    return cleanedId;
  };

  const renderPlayerDetail = () => {
    if (selectedPlayer) {
      return (
        <View style={{ padding: 10 }}>
          <Text>Player: {selectedPlayer.name}</Text>
          <Text>Goals: {selectedPlayer.goals}</Text>
          <Text>Assists: {selectedPlayer.assists}</Text>
          <Text>Yellow Cards: {selectedPlayer.yellowCards}</Text>
          <Text>Red Cards: {selectedPlayer.redCards}</Text>
        </View>
      );
    } else {
      return null;
    }
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
  clubCard: {
    flex: 2,
    backgroundColor: "#FFFFFD",
    margin: 10,
    padding: 10,
    borderRadius: 10,
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
