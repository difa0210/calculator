import * as React from "react";
import {
  Text,
  Box,
  Pressable,
  Button,
  VStack,
  HStack,
  Checkbox,
  Image,
  FlatList,
  View,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl, StyleSheet } from "react-native";
import { API } from "../../config/api";
import { ListItem, Avatar } from "react-native-elements";
import { useTheme } from "native-base";

export default function ToDo({ navigation }) {
  const theme = useTheme();
  const [getList, setGetList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    list();
  }, []);

  const list = () => {
    setIsLoading(true);
    API.get("/lists")

      .then((res) => {
        setGetList(res.data.data.allLists);
        setIsLoading(false);
        console.log(res.data.data.allLists);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleDelete = async (e, id) => {
    API.delete(`/list/${id}`)
      .then((res) => {
        e.preventDefault();
        console.log(res);
        list();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _renderItem = ({ item }) => {
    return (
      <ListItem
        containerStyle={{
          backgroundColor: "white",
          marginBottom: 15,
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate("DetailPage", item)}
        key={item.id}
        bottomDivider
      >
        <Avatar
          rounded
          title={item.title.slice(0, 2)}
          containerStyle={{ backgroundColor: "black" }}
        />

        <ListItem.Content>
          <ListItem.Title
            color="black"
            style={{ fontSize: 20, fontWeight: "bold" }}
            numberOfLines={1}
          >
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} color="black">
            {item.content}
          </ListItem.Subtitle>
        </ListItem.Content>
        <VStack alignItems="flex-end">
          <HStack>
            <Button bg="primary.12" marginX={3} padding={1}>
              <MaterialIcons
                key={item.id}
                onPress={() => navigation.navigate("EditPage", item)}
                name="edit"
                size={22}
                color="black"
              />
            </Button>
            <Button bg="primary.14" padding={1}>
              <MaterialIcons
                onPress={() => navigation.navigate("DeletePage", item)}
                // onPress={(e) => handleDelete(e, item.id)}
                name="delete"
                size={24}
                color="white"
              />
            </Button>
          </HStack>
        </VStack>
      </ListItem>
    );
  };

  return (
    <Box
      padding={5}
      bg="primary.11"
      flex={1}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getList} />
      }
    >
      <HStack height="90%" marginBottom={4}>
        <FlatList
          data={getList}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          onRefresh={list}
        />
      </HStack>
      <HStack justifyContent="flex-end">
        <Button
          onPress={() => navigation.navigate("AddPage")}
          style={{
            width: "30%",
            borderRadius: 5,
          }}
          bg="primary.14"
        >
          <Text fontSize={17} fontWeight="bold" color="primary.12">
            Add Task
          </Text>
        </Button>
      </HStack>
    </Box>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#105652",

    padding: "5%",
    flex: 1,
  },
  data: {
    backgroundColor: "#B91646",

    flex: 1,
    alignItems: "center",
    marginBottom: "2%",
    marginHorizontal: "2%",
  },
  buttonStyle: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    padding: 5,
  },
});
