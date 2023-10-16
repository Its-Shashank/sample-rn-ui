import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

type Props = {
  cameraPress: () => void;
};

const Header: React.FunctionComponent<Props> = ({ cameraPress }: Props) => {
  const iconSize = 20;

  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}></View>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.camera} onPress={cameraPress}>
          <FontAwesome
            name="camera"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.location}>
          <MaterialIcons
            name="location-on"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5
            name="list"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons name="rocket-launch" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 50,
  },
  iconStyle: {
    padding: 10,
  },
  camera: {},
  location: {},
});
