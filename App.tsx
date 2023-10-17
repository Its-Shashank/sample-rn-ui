import { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TextInput,
  Text,
  Platform,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { PaperProvider } from "react-native-paper";
import { Snackbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Header from "./components/Header";
import CityModal from "./components/CityModal";
import FeedCategoryModal from "./components/FeedCategoryModal";
import SelectedItemCard from "./components/SelectedItemCard";

const App: React.FC = () => {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showFeedCategory, setShowFeedCategory] = useState<boolean>(false);
  const [selectedFeed, setSelectedFeed] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  // function to handle input state and also keep a word count
  const handleChange = (val: string) => {
    const words = val.split(" ");
    const newWordCount = words.length;

    if (val.trim() === "") {
      setWordCount(0);
    } else {
      setWordCount(newWordCount);
    }
    setInput(val);
  };

  const showCameraIcon = () => setOpenCamera(true);

  const openFeedCategory = () => setShowFeedCategory(true);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imgs = [...images, result.assets[0].uri];
      console.log(imgs);
      setImages(imgs);
    }
  };

  // function to select city
  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setModalVisible(false);
  };

  // function to select feed category
  const handleFeedClick = (feed: string) => {
    setShowFeedCategory(false);
    setSelectedFeed(feed);
  };

  // function for creating a post
  const onRocketPress = () => {
    setShowLoader(true);
    setSnackbarVisible(false);
    // a simple timer to show loader
    setTimeout(() => {
      setShowLoader(false);
      setSnackbarVisible(true);
      setSelectedCity("");
      setSelectedFeed("");
      setInput("");
      setImages([]);
    }, 5000);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 24,
          }}>
          <Header
            cameraPress={showCameraIcon}
            locationPress={() => setModalVisible(true)}
            listPress={openFeedCategory}
            rocketPress={onRocketPress}
            showLoader={showLoader}
          />
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={handleChange}
              value={input}
              placeholder="Type here..."
            />
            <Text style={{ textAlign: "right" }}>{wordCount + "/50"}</Text>
          </View>
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
          <View style={{ marginBottom: 10 }}>
            {selectedCity && (
              <SelectedItemCard name={selectedCity} showLocationIcon />
            )}
          </View>
          {selectedFeed && <SelectedItemCard name={selectedFeed} />}
        </View>
        <CityModal
          modalVisible={modalVisible}
          handleCityClick={handleCityClick}
          onDismiss={() => setModalVisible(false)}
        />
        <FeedCategoryModal
          modalVisible={showFeedCategory}
          handleFeedClick={handleFeedClick}
          onDismiss={() => setShowFeedCategory(false)}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: "Dismiss",
            onPress: () => {
              // Handle action press (if needed)
            },
          }}>
          Yay! Your post has been created!
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
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
    marginBottom: 10,
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
