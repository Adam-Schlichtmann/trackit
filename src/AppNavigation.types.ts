import * as Constants from "./AppNavigationConstants";

export type AllStackParams = {
  [Constants.DEFINITIONS]: Record<string, never>;
  [Constants.CREATE]: Record<string, never>;
  [Constants.EDIT_DEFINITION]: { id?: string };
  [Constants.EDIT]: Record<string, never>;
};
