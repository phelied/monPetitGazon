import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import API from "../utils/API";
import { RouteProp, useRoute } from "@react-navigation/native";
import { formatDate } from "../utils/utils";
import { cleanClubId } from "../utils/utils";

type ParamList = {
  playerDetails: {
    playerId: string;
  };
};

const PlayerDetails = () => {
  const route = useRoute<RouteProp<ParamList, "playerDetails">>();

  const playerId = route.params.playerId;
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

  useEffect(() => {
    API.fetchPlayerDetail(playerId).then((data) => {
      setSelectedPlayer(data.championships);
    });
  }, []);

  return (
    <View style={styles.container}>
      {selectedPlayer !== null &&
        Object.keys(selectedPlayer).map((championshipId) => {
          const championship = selectedPlayer[championshipId];
          const clubs = championship.clubs;
          const clubKeys = Object.keys(clubs);

          return (
            <View key={championshipId} style={styles.championshipContainer}>
              {clubKeys.map((clubId) => {
                const club = clubs[clubId];
                const matches = club.matches;

                return (
                  <View key={clubId} style={styles.clubContainer}>
                    <Text style={styles.clubName}>{cleanClubId(clubId)}</Text>
                    {matches.map((match: any) => (
                      <View key={match.matchId} style={styles.matchContainer}>
                        <Text style={styles.matchDate}>{formatDate(match.date)}</Text>
                        <Text style={styles.matchScore}>
                          {match.home.score} - {match.away.score}
                        </Text>
                        <Text style={styles.matchDetails}>
                          Rating: {match.playerPerformance.rating}
                        </Text>
                        <Text style={styles.matchDetails}>
                          Goals: {match.playerPerformance.goals}
                        </Text>
                        <Text style={styles.matchDetails}>
                          Minutes Played:{" "}
                          {match.playerPerformance.minutesPlayed}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          );
        })}
    </View>
  );
};

export default PlayerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  championshipContainer: {
    marginBottom: 20,
  },
  clubContainer: {
    marginBottom: 10,
  },
  clubName: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 5,
    color: "#B3D93B",
  },
  matchContainer: {
    marginBottom: 5,
  },
  matchDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FD7F52",
  },
  matchScore: {
    fontSize: 16,
  },
  matchDetails: {
    fontSize: 14,
    color: "gray",
  },
});
