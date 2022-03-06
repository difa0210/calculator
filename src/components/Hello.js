import * as React from "react";
import { Text, Box, Pressable, Button } from "native-base";

// Add Props in Hello({navigation})
export default function Hello({ navigation }) {
  return (
    <Box bg="primary.11" flex={1} alignItems="center" justifyContent="center">
      <Text
        fontFamily="body"
        fontWeight="bold"
        fontStyle="normal"
        fontSize={30}
      >
        Hello World
      </Text>
      <Text
        textAlign="center"
        fontFamily="body"
        fontWeight="normal"
        fontStyle="normal"
        fontSize={20}
      >
        I have a Calculator and ToDo list
      </Text>

      {/* <Button
        onPress={() => navigation.navigate("Calculator")}
        style={{
          backgroundColor: "orange",
          height: 45,
          width: "63%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          margin: 20,
        }}
      >
        <Text fontSize={20} fontWeight="bold" color="black">
          App Calculator
        </Text>
      </Button> */}
    </Box>
  );
}
