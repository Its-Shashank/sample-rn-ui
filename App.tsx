import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";

const App: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <SafeAreaView>
        <Header />
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingVertical: 20,
    paddingHorizontal: 24,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
