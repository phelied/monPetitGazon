import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import API from "../utils/API";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  playerDetails: { playerId: string } | undefined;
};

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
  type: string;
  position: number;
  ultraPosition: number;
  championships: any;
}

const Players = () => {
  const [players, setPlayers] = useState<Players[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderPlayers = ({ item }: { item: Players }) => {
    if (selectedPosition && item.ultraPosition !== selectedPosition) {
      return null;
    }

    if (
      searchQuery &&
      (!item.firstName ||
        !item.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return null;
    }

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("playerDetails", { playerId: item.id })}
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
  };

  const filterByPosition = (positionId: number) => {
    setSelectedPosition(positionId);
  };

  const positionFilters = [
    { positionId: 10, label: "Gardien" },
    { positionId: 20, label: "Défenseur" },
    { positionId: 21, label: "Latéral" },
    { positionId: 30, label: "Milieu défensif" },
    { positionId: 31, label: "Milieu offensif" },
    { positionId: 40, label: "Attaquant" },
  ];

  return (
    <View>
      <View style={styles.filterContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {positionFilters.map((filter) => (
            <TouchableOpacity
              key={filter.positionId}
              style={[
                styles.filterButton,
                selectedPosition === filter.positionId &&
                  styles.selectedFilterButton,
              ]}
              onPress={() => filterByPosition(filter.positionId)}
            >
              <Text style={styles.filterButtonText}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par nom"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={players}
        renderItem={renderPlayers}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  clubCard: {
    flex: 1,
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
  playerDetails: {
    backgroundColor: "#B3D93B",
    padding: 10,
    borderRadius: 8,
  },
  playerDetailText: {
    color: "#FFFFFD",
    marginBottom: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  filterButton: {
    backgroundColor: "#6200BE",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  selectedFilterButton: {
    backgroundColor: "#B3D93B",
  },
  filterButtonText: {
    color: "#FFFFFD",
  },
  searchInput: {
    backgroundColor: "#FFFFFD",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
