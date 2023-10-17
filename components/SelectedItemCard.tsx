import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

type Props = {
  name: string;
  showLocationIcon?: boolean;
};

const SelectedItemCard: React.FunctionComponent<Props> = ({
  name,
  showLocationIcon = false,
}: Props) => {
  return (
    <View style={styles.container}>
      {showLocationIcon ? (
        <MaterialIcons name="location-on" size={18} color="black" />
      ) : (
        <Text style={{ fontSize: 18, marginRight: 5 }}>#</Text>
      )}
      <Text>{name}</Text>
      <Entypo name="cross" size={18} color="black" />
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
    alignItems: "center",
  },
});

export default SelectedItemCard;
