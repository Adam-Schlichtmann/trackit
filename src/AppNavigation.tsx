import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DEFINITIONS,
  CREATE,
  EDIT_DEFINITION,
  EDIT,
} from "./AppNavigationConstants";
import { Definitions, Create, EditDefinition, Edit } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const DefinitionStackNav = createStackNavigator();

const DefinitionStack = () => {
  return (
    <DefinitionStackNav.Navigator>
      <DefinitionStackNav.Screen name={DEFINITIONS} component={Definitions} />
      <DefinitionStackNav.Screen
        name={EDIT_DEFINITION}
        component={EditDefinition}
      />
    </DefinitionStackNav.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={DEFINITIONS}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name={DEFINITIONS} component={DefinitionStack} />
        <Tab.Screen name={CREATE} component={Create} />
        <Tab.Screen name={EDIT} component={Edit} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTab;
