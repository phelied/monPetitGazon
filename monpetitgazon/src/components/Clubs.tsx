import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import API from "../utils/API";

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

const Clubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    API.fetchClubs().then((data) => {
      setClubs(data);
    });
  }, []);

  const cleanClubId = (id: String) => {
    const idWithoutPrefix = id.replace("mpg_", "");
    const cleanedId = idWithoutPrefix.replace(/_/g, " ");
    return cleanedId;
  };

  return (
    <FlatList
      data={Object.values(clubs)}
      renderItem={({ item }) => (
        <View style={styles.clubCard}>
          <Text style={styles.clubInfo}>{cleanClubId(item.id)}</Text>
          <Text style={styles.clubInfo}>{item.shortName}</Text>
          <Image
            style={styles.jerseyImage}
            source={{ uri: item.defaultJerseyUrl }}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

export default Clubs;

const styles = StyleSheet.create({
  clubCard: {
    flex: 2,
    backgroundColor: "#FFBD41",
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
    fontSize: 14,
    marginTop: 10,
    fontWeight: "800",
  },
});
