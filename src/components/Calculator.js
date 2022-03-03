import * as React from "react";
import { Text, Box, VStack, HStack, Center, Input, Button } from "native-base";
import { Vibration } from "react-native";

export default function Calculator() {
  const [value, setValue] = React.useState("");
  const [lastValue, seLastValue] = React.useState("");
  const handleChange = (text) => setValue(text);

  const buttons = [
    "Clear",
    "/",
    "*",
    "-",
    "+",
    "=",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];

  function Calculate() {
    let lastArr = value[value.length - 1];

    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+"
    ) {
      setValue(value);
      return;
    } else {
      let result = eval(value).toString();
      setValue(result);
      return;
    }
  }

  function handleInput(buttonPress) {
    if (
      buttonPress === "+" ||
      buttonPress === "-" ||
      buttonPress === "*" ||
      buttonPress === "/"
    ) {
      Vibration.vibrate(35);
      setValue(value + buttonPress);
      return;
    } else if (
      buttonPress === 1 ||
      buttonPress === 2 ||
      buttonPress === 3 ||
      buttonPress === 4 ||
      buttonPress === 5 ||
      buttonPress === 6 ||
      buttonPress === 7 ||
      buttonPress === 8 ||
      buttonPress === 9 ||
      buttonPress === 0
    ) {
      Vibration.vibrate(35);
    }
    switch (buttonPress) {
      case "Clear":
        Vibration.vibrate(35);
        setValue(value.substring(0, value.length - 1));
        return;
      case "=":
        Vibration.vibrate(35);
        setValue(value + "=");
        Calculate();
        return;
    }
    setValue(value + buttonPress);
  }

  return (
    <Box bg="primary.13" flex={1} alignItems="center" justifyContent="center">
      <Text
        color="primary.14"
        fontFamily="body"
        fontWeight={400}
        fontStyle="normal"
        fontSize={30}
        marginBottom={8}
      >
        Hello Calculator
      </Text>

      <Input
        bg="white"
        value={value}
        w="63%"
        onChangeText={handleChange}
        marginBottom={5}
        borderWidth={0}
        color="primary.1"
      />

      <HStack space={3}>
        <VStack space={3} marginBottom={5}>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("7")}
          >
            <Text fontSize={25}>7</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("4")}
          >
            <Text fontSize={25}>4</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("1")}
          >
            <Text fontSize={25}>1</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("%")}
          >
            <Text fontSize={25}>%</Text>
          </Button>
        </VStack>
        <VStack space={3} marginBottom={5}>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("8")}
          >
            <Text fontSize={25}>8</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("5")}
          >
            <Text fontSize={25}>5</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("2")}
          >
            <Text fontSize={25}>2</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("0")}
          >
            <Text fontSize={25}>0</Text>
          </Button>
        </VStack>
        <VStack space={3} marginBottom={5}>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("9")}
          >
            <Text fontSize={25}>9</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("6")}
          >
            <Text fontSize={25}>6</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("3")}
          >
            <Text fontSize={25}>3</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("/")}
          >
            <Text fontSize={25}>/</Text>
          </Button>
        </VStack>
        <VStack space={3}>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("*")}
          >
            <Text fontSize={25}>*</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("-")}
          >
            <Text fontSize={25}>-</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("+")}
          >
            <Text fontSize={25}>+</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.14"
            rounded={6}
            textAlign="center"
            onPress={() => console.log("=")}
          >
            <Text fontSize={25}>=</Text>
          </Button>
        </VStack>
      </HStack>
      <HStack>
        <Button
          bg="primary.14"
          rounded={6}
          onPress={() => console.log("Clear")}
        >
          <Text fontSize={20}>Clear</Text>
        </Button>
      </HStack>
    </Box>
  );
}
