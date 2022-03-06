import * as React from "react";
import {
  Text,
  Box,
  Pressable,
  Button,
  FormControl,
  Stack,
  HStack,
  VStack,
  Input,
  WarningOutlineIcon,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RefreshControl, StyleSheet, TextInput } from "react-native";
import { API } from "../../config/api";
import DocumentPicker, { pick, pickSingle } from "react-native-document-picker";
import { useTheme } from "native-base";

export default function AddPage() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = { title, content };
    console.log(data);
    API.post("/list", data)
      .then((res) => {
        console.log(res);
        setTitle("");
        setContent("");
        alert(res);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Box
      flex={1}
      alignItems="center"
      bg="primary.14"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={(title, content)} />
      }
    >
      <Box w="100%" padding={5}>
        <Text
          fontSize={25}
          textAlign="center"
          fontWeight="bold"
          color="primary.12"
          marginY={5}
        >
          Add ToDo
        </Text>

        <FormControl isRequired>
          <Stack mx="3" color="primary.11" marginBottom={5}>
            <FormControl.Label>
              <Text color="primary.12" fontSize={17} fontWeight="bold">
                Title
              </Text>
            </FormControl.Label>
            <TextInput
              style={{ borderRadius: 2, padding: 4 }}
              borderWidth={0}
              type="text"
              placeholder="input Content"
              color="black"
              backgroundColor={theme.colors.primary["12"]}
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <FormControl.HelperText>
              Must be atleast 3 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
          <Stack mx="3" color="primary.11" marginBottom={5}>
            <FormControl.Label>
              <Text color="primary.12" fontSize={17} fontWeight="bold">
                Content
              </Text>
            </FormControl.Label>
            <TextInput
              style={{ borderRadius: 2, padding: 4 }}
              borderWidth={0}
              type="text"
              placeholder="input Content"
              color="black"
              backgroundColor={theme.colors.primary["12"]}
              value={content}
              onChangeText={(value) => setContent(value)}
            />
            <FormControl.HelperText>
              Must be atleast 5 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>

        <Button m="3" bg="primary.11" padding={2} onPress={handleSubmit}>
          <Text fontSize={18} fontWeight="bold" color="primary.12">
            Submit
          </Text>
        </Button>
      </Box>
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
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: "stretch",
  },
  textStyle: {
    backgroundColor: "#fff",
    fontSize: 15,
    marginTop: 16,
    color: "black",
  },
});
