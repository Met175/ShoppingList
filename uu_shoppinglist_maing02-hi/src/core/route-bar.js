//@@viewOn:imports
import Uu5, { createVisualComponent, Lsi, useRoute, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import InviteButton from "./invite-button.js";
import { UserSelector } from "./user.js";
import AddListButton from "./add-list-button.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {

};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Plus4U5App.PositionBar.propTypes,

  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ members, setMembers, items, setItems, filter, setFilterItems, user, shoppingLists, setShoppingLists, setFilterLists }) {
    //@@viewOn:private
    const [route, setRoute] = useRoute();

    console.log("ROUTE:", route);        // objekt

    const itemList = [
      {
        children: (
          <Uu5Elements.Text category="expose" segment="default" type="broad" colorScheme="steel">
            BuyMate
          </Uu5Elements.Text>
        ),
      },

      ...(route.uu5Route === "detail"
        ? [
          {
            children: "To buy",
            onClick: () => setFilterItems("toBuy"),
          },
          {
            children: "Bought",
            onClick: () => setFilterItems("bought"),
          },
          {
            children: "All",
            onClick: () => setFilterItems("all"),
          },
        ]
        : [
          {
            children: "Active",
            onClick: () => setFilterLists("active"),
          },
          {
            children: "Archived",
            onClick: () => setFilterLists("archived"),
          },
        ])
    ];

    const actionList = [
      ...(route.uu5Route === "detail"
        ? [
          {
            children: <InviteButton members={members} setMembers={setMembers} user={user} />,
          },
          {
            children: <UserSelector/>
          }
        ]
        : [
         {
            children: <AddListButton shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} user={user} />,
         },


          {
            children: <UserSelector />
          }
        ])

    ]

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Plus4U5App.PositionBar
          actionList={actionList}

          colorScheme="pink"
          view="short"
        >
          <Uu5Elements.ActionGroup itemList={itemList} displayType="button" />
        </Plus4U5App.PositionBar>
      </div>
      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
