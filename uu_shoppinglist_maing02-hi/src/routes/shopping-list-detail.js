//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ShoppingListItemsForm from "../core/shopping-list-items-form.js";
import ShoppingListMembersForm from "../core/shoppin-list-members-form.js";
import demoItems from "../../mock/data/demoItems.json";
import demoMembers from "../../mock/data/demoMembers.json";
import { useUser } from "../core/user.js";
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

let ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
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
    const [items, setItems] = useState(demoItems);
    const [filterItems, setFilterItems] = useState("all");
    const user = useUser();
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar members={members} setMembers={setMembers} setFilterItems={setFilterItems} user={user} />
        <Uu5Elements.GridTemplate
          contentMap={{
            sidebar: <ShoppingListMembersForm members={members} setMembers={setMembers} user={user} />,
            content: <ShoppingListItemsForm items={items} setItems={setItems} filterItems={filterItems} user={user} />,
          }}
          templateAreas={{
            xs: `header, sidebar, content, footer`,
            m: `
        header header header header,
        sidebar content content content,
        footer footer footer footer
      `,
          }}
          templateColumns={{ xs: "100%", m: "repeat(4, 1fr)" }}
          rowGap={12}
          columnGap={20}
          className={Css.layout()}
        />
      </div>
    );
    //@@viewOff:render
  },
});

ShoppingListDetail = withRoute(ShoppingListDetail, { authenticated: false });

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
