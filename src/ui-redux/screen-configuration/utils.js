import set from "lodash/set";

export const prepareFinalObject = (preparedFinalOject, jsonPath, value) => {
  set(preparedFinalOject, jsonPath, value);
  return preparedFinalOject;
};
