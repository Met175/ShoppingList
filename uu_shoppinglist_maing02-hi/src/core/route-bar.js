//@@viewOn:imports
import Uu5, { createVisualComponent, Lsi, useRoute, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import InviteButton from "./invite-button.js";
import { UserSelector } from "./user.js";
import AddListButton from "./add-list-button.js";
import DarkModeToggle from "./dark-mode-toggle";

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
            children: <Lsi lsi={{ cs: "Koupit", en: "To Buy" }} />,
            onClick: () => setFilterItems("toBuy"),
          },
          {
            children: <Lsi lsi={{ cs: "Zakoupené", en: "Bought" }} />,
            onClick: () => setFilterItems("bought"),
          },
          {
            children: <Lsi lsi={{ cs: "Vše", en: "All" }} />,
            onClick: () => setFilterItems("all"),

          },
        ]
        : [
          {
            children: <Lsi lsi={{ cs: "Aktivní", en: "Active" }} />,
            onClick: () => setFilterLists("active"),
          },
          {
            children: <Lsi lsi={{ cs: "Archivované", en: "Archived" }} />,
            onClick: () => setFilterLists("archived"),
          },
        ])
    ];

    const actionList = [
      ...(route.uu5Route === "detail"
        ? [{
          children: <InviteButton members={members} setMembers={setMembers} user={user}/>,
        }]
        : [
         {
            children: <AddListButton shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} user={user} />,
         },
        ]),
      {
        children: <Uu5Elements.LanguageSelector languageList={["en", "cs"]} colorScheme="neutral"/>
      },
      {
        children: <UserSelector/>
      },
      {
        children: <DarkModeToggle/>
      }

    ]

    //@@viewOff:private

    //@@viewOn:render
    return (
        <Plus4U5App.PositionBar
          actionList={actionList}
          view="short"

          colorScheme="pink"

        >
          <Uu5Elements.ActionGroup itemList={itemList} displayType="button" />
        </Plus4U5App.PositionBar>
      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
