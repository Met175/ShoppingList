//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListProvider = createComponent({
  uu5Tag: Config.TAG + "ShoppingListProvider",

  render({ children }) {
    console.log("Provider render");

    const dataList = useDataList({
      handlerMap: {
        load: Calls.shoppingListList,
        update: Calls.shoppingListUpdate
        },
      },
    );



    console.log("state:", dataList.state);

    return children({ dataList });
  },
});

//@@viewOn:exports
export { ShoppingListProvider };
export default ShoppingListProvider;
//@@viewOff:exports

