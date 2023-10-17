import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

type Props = {
  modalVisible: boolean;
  onDismiss: () => void;
  handleCityClick: (str: string) => void;
};

const CityModal: React.FC<Props> = ({
  modalVisible,
  onDismiss,
  handleCityClick,
}: Props) => {
  return (
    <Modal
      visible={modalVisible}
      collapsable
      transparent
      animationType="slide"
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <View style={styles.locationModal}>
        <View style={styles.modalView}>
          <Pressable onPress={onDismiss}>
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
  );
};

const styles = StyleSheet.create({
  locationModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    maxHeight: 500,
    minHeight: 400,
    backgroundColor: "#e3e1e1",
    borderRadius: 20,
    padding: 20,
  },
});

export default CityModal;
