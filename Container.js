import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme, theme } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import Components
import Calculator from "./src/components/Calculator";
import ToDo from "./src/components/ToDo";
import Hello from "./src/components/Hello";
import AddPage from "./src/components/AddPage";
import DetailPage from "./src/components/DetailPage";
import EditPage from "./src/components/EditPage";
import DeletePage from "./src/components/DeletePage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerMode: "screen",
        headerTintColor: "black",
        headerStyle: { backgroundColor: theme.colors.primary["12"] },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Calculator") {
            iconName = focused ? "ios-calculator" : "ios-calculator-outline";
          } else if (route.name === "ToDo") {
            iconName = focused ? "ios-list-circle" : "ios-list-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary["14"],
        tabBarInactiveTintColor: theme.colors.primary["11"],
      })}
    >
      <Tab.Screen
        name="Home"
        component={Hello}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Calculator" component={Calculator} />
      <Tab.Screen name="ToDo" component={ToDo} />
    </Tab.Navigator>
  );
}
export default function Container() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MyTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{
            title: "Calculator",
          }}
        />
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{
            title: "ToDo",
          }}
        />
        <Stack.Screen
          name="AddPage"
          component={AddPage}
          options={{
            title: "AddPage",
          }}
        />
        <Stack.Screen
          name="DetailPage"
          component={DetailPage}
          options={{
            title: "DetailPage",
          }}
        />
        <Stack.Screen
          name="EditPage"
          component={EditPage}
          options={{
            title: "EditPage",
          }}
        />
        <Stack.Screen
          name="DeletePage"
          component={DeletePage}
          options={{
            title: "DeletePage",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerMode: "screen",
//           headerTintColor: "white",
//           headerStyle: { backgroundColor: theme.colors.primary["14"] },
//         }}
//       >
//         <Stack.Screen
//           name="Home"
//           component={Hello}
//           options={{
//             title: "Hello Screen",
//           }}
//         />

//         <Stack.Screen
//           name="Calculator"
//           component={Calculator}
//           options={{
//             title: "Calculator",
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function Container() {
//   return <Calculator />;
// }
