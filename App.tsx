import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  TextInput,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Header from "./components/Header";

const App: React.FunctionComponent = () => {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [charCount, setCharCount] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  const handleChange = (val: string) => {
    if (val.length <= 50) {
      setInput(val);
      setCharCount(val.length);
    }
  };

  const showCameraIcon = () => setOpenCamera(true);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const imgs = [...images, result.assets[0].uri];
      console.log(imgs);
      setImages(imgs);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <SafeAreaView>
        <Header cameraPress={showCameraIcon} />
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={handleChange}
            value={input}
            placeholder="Type here..."
          />
          <Text style={{ textAlign: "right" }}>{charCount + "/50"}</Text>
        </View>
        {/** show selected images here */}
        <View style={styles.imagesContainer}>
          {images.length > 0 &&
            images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={{ borderRadius: 8 }}
                height={80}
                width={80}
              />
            ))}
          {openCamera && (
            <Pressable style={styles.camera} onPress={pickImage}>
              <FontAwesome name="camera" size={30} color="black" />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e1e1",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginVertical: 20,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  camera: {
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#f7f5f5",
  },
});
