import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";

type Props = {
  modalVisible: boolean;
  onDismiss: () => void;
  handleFeedClick: (str: string) => void;
};

const FeedCategoryModal: React.FC<Props> = ({
  modalVisible,
  onDismiss,
  handleFeedClick,
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
          <Text style={{ textAlign: "center" }}>Choose Feed Category</Text>
          <View style={styles.feedsContainer}>
            {["Painting", "Indigenious", "Tattooing"].map((feed, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.feedButton}
                onPress={() => handleFeedClick(feed)}>
                <Text style={styles.feedText}>Painting</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Text style={{ color: "white" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FeedCategoryModal;

const styles = StyleSheet.create({
  locationModal: {
    flex: 1,
    marginTop: 200,
    marginHorizontal: 10,
  },
  modalView: {
    backgroundColor: "#eaeaea",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  feedsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feedButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 20,
  },
  feedText: { color: "#8373b3", fontWeight: "bold" },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#36C0D9",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
});
