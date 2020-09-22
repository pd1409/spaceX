import {prepareFinalObject} from "../ui-redux/screen-configuration/actions";

export const addQueryArg = (url="", queries = []) => {
  const urlParts = url.split("?");
  const path = urlParts[0];
  let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach(query => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

export const mapDispatchToProps=(dispatch)=>{
  return {
    setAppData:(jsonPath,data)=>{
      dispatch(prepareFinalObject(jsonPath,data))
    }
  }
}
export let snackbarObj = {};
snackbarObj.open = true;
snackbarObj.variant = "error";
