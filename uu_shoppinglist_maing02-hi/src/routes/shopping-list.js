//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ShoppingListItemsForm from "../core/shopping-list-items-form.js";
import ShoppingListMembersForm from "../core/shoppin-list-members-form.js";
import ShoppingListList from "../core/shopping-list-list.js";
import demoItems from "../../mock/data/demoItems.json";
import demoMembers from "../../mock/data/demoMembers.json";
import demoLists from "../../mock/data/demoLists.json";
import { useUser } from "../core/user.js";
import ShoppingListProvider from "../core/shopping-list-provider.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
  layout: () =>
    Config.Css.css({
      padding: 30,
    }),
  membersList: () =>
    Config.Css.css({
      maxWidth: "200px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [members, setMembers] = useState(demoMembers);
    const [shoppingLists, setShoppingLists] = useState(demoLists);
    const [filterLists, setFilterLists] = useState("active");
    const user = useUser();

    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <ShoppingListProvider>
        {({ dataList }) => (
          <div {...attrs}>
            <RouteBar
              shoppingLists={shoppingLists}
              setShoppingLists={setShoppingLists}
              user={user}
              setFilterLists={setFilterLists}
            />
            <Uu5Elements.GridTemplate
              contentMap={{
                content: <ShoppingListList dataList={dataList} filterLists={filterLists} user={user} />,
              }}
              templateAreas={{
                xs: `header, content, footer`,
                m: `
        header header header header,
        content content content content,
        footer footer footer footer
      `,
              }}
              templateColumns={{ xs: "100%", m: "repeat(4, 1fr)" }}
              rowGap={12}
              columnGap={20}
              className={Css.layout()}
            />
          </div>
        )}
      </ShoppingListProvider>
    );
    //@@viewOff:render
  },
});

ShoppingList = withRoute(ShoppingList, { authenticated: false });

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
