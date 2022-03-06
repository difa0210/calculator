import React from "react";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
} from "@expo-google-fonts/montserrat";
import Container from "./Container";
import {
  extendTheme,
  NativeBaseProvider,
  Text,
  Box,
  VStack,
  HStack,
  Center,
  Input,
  Button,
} from "native-base";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
  });
  const fontConfig = {
    Montserrat: {
      400: {
        normal: "Montserrat_500Medium",
        italic: "Montserrat_500Medium_Italic",
      },
    },
  };
  const customeColor = {
    primary: {
      1: "#f72585",
      2: "#b5179e",
      3: "#7209b7",
      4: "#560bad",
      5: "#480ca8",
      6: "#3a0ca3",
      7: "#3f37c9",
      8: "#4361ee",
      9: "#4895ef",
      10: "#4cc9f0",
      11: "#105652",
      12: "#FBF3E4",
      13: "#DFD8CA",
      14: "#B91646",
    },
  };

  const theme = extendTheme({
    colors: customeColor,
    fontConfig,
    font: {
      heading: "Montserrat",
      body: "Montserrat",
      mono: "Montserrat",
    },
    config: {
      initialColorMode: "dark",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Container />
      </NativeBaseProvider>
    );
  }
}
