import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CONFIGURATION,
  CREATE,
  DEFINITION_EDIT,
  EDIT,
} from "./AppNavigationConstants";
import { Configuration, Create, DefinitionEdit, Edit } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const ConfigurationStackNav = createStackNavigator();

const ConfigurationStack = () => {
  return (
    <ConfigurationStackNav.Navigator>
      <ConfigurationStackNav.Screen
        name={CONFIGURATION}
        component={Configuration}
      />
      <ConfigurationStackNav.Screen
        name={DEFINITION_EDIT}
        component={DefinitionEdit}
      />
    </ConfigurationStackNav.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={CONFIGURATION}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name={CONFIGURATION} component={ConfigurationStack} />
        <Tab.Screen name={CREATE} component={Create} />
        <Tab.Screen name={EDIT} component={Edit} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTab;
