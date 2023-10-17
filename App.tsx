import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  TextInput,
  Text,
  Platform,
  Modal,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Header from "./components/Header";
import CityDisplay from "./components/CityDisplay";

const App: React.FunctionComponent = () => {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [charCount, setCharCount] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");

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

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 24,
        }}>
        <Header
          cameraPress={showCameraIcon}
          locationPress={() => setModalVisible(true)}
        />
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
        {selectedCity && <CityDisplay cityName={selectedCity} />}
      </View>
      <Modal
        visible={modalVisible}
        collapsable
        transparent
        animationType="slide"
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.locationModal}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: "center" }}>Close</Text>
            </Pressable>
            <View
              style={{
                height: 48,
                backgroundColor: "white",
                borderRadius: 24,
                marginVertical: 20,
              }}></View>
            <View>
              <TouchableOpacity
                onPress={() => handleCityClick("Melbourne")}
                style={{ marginBottom: 8 }}>
                <Text>Melbourne</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCityClick("Sydney")}
                style={{ marginBottom: 8 }}>
                <Text>Sydney</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCityClick("Brisbane")}>
                <Text>Brisbane</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafcfb",
    paddingTop: Platform.OS === "android" ? 35 : 0,
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
  locationModal: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  modalView: {
    maxHeight: 500,
    minHeight: 400,
    backgroundColor: "#e3e1e1",
    borderRadius: 20,
    padding: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
