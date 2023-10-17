import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  cityName: string;
};

const CityDisplay: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="location-on" size={18} color="black" />
      <Text>{props.cityName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
});

export default CityDisplay;
