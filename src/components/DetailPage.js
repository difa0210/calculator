import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { API } from "../../config/api";

const PostDetail = ({ route }) => {
  //init Props
  console.log(route.params);

  const { id, image, title, content } = route.params;

  //Init State
  const [getList, setGetList] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create LifeCycle
  //Function Exception
  useEffect(() => {
    list();
  }, []);

  // Create Function to fetch

  const list = () => {
    setIsLoading(true);

    API.get(`/list/${id}`)
      .then((res) => {
        setGetList(res.data.data.list);
        console.log(res.data.data.list);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
        console.log(err);
      });
  };

  //   Create Component List
  const _renderItem = ({ item }) => {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>{`${item.image}-${item.title} - ${item.content}`}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <Text h2 style={{ fontWeight: "bold" }}>
        {image}
      </Text>
      <Text h2 style={{ fontWeight: "bold" }}>
        {title}
      </Text>

      <Text>{content}</Text>

      {/* <FlatList
        data={comments}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getComment} />
        }
      /> */}
    </View>
  );
};

export default PostDetail;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
  },
});
