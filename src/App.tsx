import { NativeBaseProvider } from "native-base";
import MainTab from "./AppNavigation";

import { Database } from "./statics";

Database.init();

const App = () => (
  <NativeBaseProvider>
    <MainTab />
  </NativeBaseProvider>
);

export default App;
