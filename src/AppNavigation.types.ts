import * as Constants from "./AppNavigationConstants";

export type AllStackParams = {
  [Constants.CONFIGURATION]: Record<string, never>;
  [Constants.CREATE]: Record<string, never>;
  [Constants.DEFINITION_EDIT]: { id?: string };
  [Constants.EDIT]: Record<string, never>;
};
