import * as React from "react";
import { Text, Box, VStack, HStack, Center, Input, Button } from "native-base";

export default function Calculator() {
  const [value, setValue] = React.useState("");
  const [lastValue, setLastValue] = React.useState("");

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
    }
    switch (buttonPress) {
      case "Del":
        setValue(value.substring(0, value.length - 1));
        return;
      case "C":
        setLastValue("");
        setValue("");
        return;
      case "=":
        setLastValue(value + "=");
        Calculate();
        return;
    }
    setValue(value + buttonPress);
  }

  return (
    <Box bg="primary.13" flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={25} color="primary.1">
        {lastValue}
      </Text>
      <Box bg="primary.12" rounded={5} marginBottom={5} w="63%">
        <Text fontSize={25} color="primary.1" textAlign="center">
          {value}
        </Text>
      </Box>

      <HStack space={3}>
        <VStack space={3} marginBottom={5}>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(7);
            }}
          >
            <Text fontSize={25}>7</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(4);
            }}
          >
            <Text fontSize={25}>4</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(1);
            }}
          >
            <Text fontSize={25}>1</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput("%");
            }}
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
            onPress={() => {
              handleInput(8);
            }}
          >
            <Text fontSize={25}>8</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(5);
            }}
          >
            <Text fontSize={25}>5</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(2);
            }}
          >
            <Text fontSize={25}>2</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(0);
            }}
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
            onPress={() => {
              handleInput(9);
            }}
          >
            <Text fontSize={25}>9</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(6);
            }}
          >
            <Text fontSize={25}>6</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.11"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput(3);
            }}
          >
            <Text fontSize={25}>3</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput("/");
            }}
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
            onPress={() => {
              handleInput("*");
            }}
          >
            <Text fontSize={25}>*</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput("-");
            }}
          >
            <Text fontSize={25}>-</Text>
          </Button>
          <Button
            padding={4}
            bg="grey"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput("+");
            }}
          >
            <Text fontSize={25}>+</Text>
          </Button>
          <Button
            padding={4}
            bg="primary.14"
            rounded={6}
            textAlign="center"
            onPress={() => {
              handleInput("=");
            }}
          >
            <Text fontSize={25}>=</Text>
          </Button>
        </VStack>
      </HStack>
      <HStack space={3}>
        <Button
          bg="primary.14"
          rounded={6}
          onPress={() => {
            handleInput("C");
          }}
        >
          <Text fontSize={20}>C</Text>
        </Button>
        <Button
          bg="primary.14"
          rounded={6}
          onPress={() => {
            handleInput("Del");
          }}
        >
          <Text fontSize={20}>Del</Text>
        </Button>
      </HStack>
    </Box>
  );
}
