import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { API } from "../../config/api";

const DeletePage = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = route.params;
  const handleDelete = async () => {
    API.delete(`/list/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible), navigation.navigate("ToDo");
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>Delete Data</Text>
          <Text style={styles.textStyle}>
            Are you sure you want to delete this Page?
          </Text>
          <Text style={styles.modalText}>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible),
                  navigation.navigate("ToDo"),
                  handleDelete(id);
              }}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
              style={[styles.button]}
            >
              <Text>Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible), navigation.navigate("ToDo");
              }}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
              style={[styles.button, styles.buttonClose]}
            >
              <Text>No</Text>
            </Pressable>
          </Text>
        </View>
      </Modal>
    </View>
  );
};
//     const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DeletePage;
// export default App;
