import React, { useState } from "react";
import {
  RefreshControl,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import { useTheme } from "native-base";
import { API } from "../../config/api";

const DeletePage = ({ route, navigation }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = route.params;
  const handleDelete = async () => {
    setIsLoading(true);
    API.delete(`/list/${id}`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <View
      style={styles.centeredView}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={DeletePage} />
      }
    >
      <Modal
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible), navigation.goBack("ToDo");
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.primary["12"],
            margin: 25,
            padding: 15,
            justifyContent: "center",
            borderRadius: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={styles.textStyle}>
            Are you sure you want to delete this Page?
          </Text>
          <Text style={{ marginTop: 15 }}>
            <Pressable
              style={{
                marginHorizontal: 10,
                paddingVertical: 6,
                paddingHorizontal: 20,
                justifyContent: "center",
                borderRadius: 5,
                alignItems: "center",
                backgroundColor: theme.colors.primary["14"],
              }}
              onPress={() => {
                setModalVisible(!modalVisible),
                  navigation.goBack("ToDo"),
                  handleDelete(id);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: theme.colors.primary["12"],
                }}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginHorizontal: 10,
                paddingVertical: 6,
                paddingHorizontal: 20,
                justifyContent: "center",
                borderRadius: 5,
                alignItems: "center",
                backgroundColor: "white",
              }}
              onPress={() => {
                setModalVisible(!modalVisible), navigation.goBack("ToDo");
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                No
              </Text>
            </Pressable>
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DeletePage;
// export default App;
