import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

type Props = {
  /**
   *
   * Prop for handling click event of camera icon
   */
  cameraPress: () => void;
  /**
   *
   * function for location icon click event
   */
  locationPress: () => void;
  /**
   *
   * function for handling list icon click event
   */
  listPress: () => void;
  /**
   *
   * function for handling rocket icon click event
   */
  rocketPress: () => void;
  /**
   * flag that toggles rocket icon with loader
   */
  showLoader: boolean;
};

const Header: React.FC<Props> = ({
  cameraPress,
  locationPress,
  listPress,
  rocketPress,
  showLoader,
}: Props) => {
  const iconSize = 20;

  return (
    <View style={styles.container}>
      <View>
        {!showLoader && (
          <Image
            style={styles.profilePicture}
            source={{
              uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
            }}
            height={50}
            width={50}
          />
        )}
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.camera} onPress={cameraPress}>
          <FontAwesome
            name="camera"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.location} onPress={locationPress}>
          <MaterialIcons
            name="location-on"
            size={iconSize}
            color="black"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={listPress}>
          <FontAwesome5
            name="list"
            size={iconSize}
            color="black"
            style={[styles.iconStyle, styles.reverseIcon]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={rocketPress}>
        {showLoader ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <MaterialCommunityIcons
            name="rocket-launch"
            size={28}
            color="black"
          />
        )}
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
  reverseIcon: {
    transform: "scaleX(-1)",
  },
  camera: {},
  location: {},
});
