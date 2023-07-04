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

interface Players {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
}

interface PlayerDetail {
  id: number;
  name: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

const Players = () => {
  const [selectedTab, setSelectedTab] = useState("clubs");
  const [players, setPlayers] = useState<Players[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetail | null>(
    null
  );

  useEffect(() => {
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

  const getPlayerInfo = async (playerId: string) => {
    API.fetchPlayerDetail(playerId).then((data) => {
      setPlayers(data);
    });
  };

  const renderPlayerItem = ({ item }: { item: Players }) => (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => getPlayerInfo(item.id)}
    >
      <View style={styles.clubCard}>
        <Text
          style={styles.clubInfo}
        >{`${item.lastName} ${item.firstName}`}</Text>
        <Text style={styles.clubInfo}>
          {getPlayerPosition(item.ultraPosition)}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
    <FlatList
      data={Object.values(players)}
      renderItem={renderPlayerItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

export default Players;

const styles = StyleSheet.create({
  clubCard: {
    flex: 2,
    backgroundColor: "#B3D93B",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  clubInfo: {
    color: "#6200BE",
    fontSize: 12,
    marginTop: 10,
  },
});
