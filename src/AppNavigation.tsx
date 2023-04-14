import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CONFIGURATION, CREATE, EDIT } from "./AppNavigationConstants";
import { Configuration, Create, Edit } from "./screens";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={CONFIGURATION}>
        <Tab.Screen name={CONFIGURATION} component={Configuration} />
        <Tab.Screen name={CREATE} component={Create} />
        <Tab.Screen name={EDIT} component={Edit} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTab;
