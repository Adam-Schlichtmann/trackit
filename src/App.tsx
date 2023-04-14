import MainTab from "./AppNavigation";

import { Database } from "./statics";

Database.init();

const App = () => <MainTab />;

export default App;
