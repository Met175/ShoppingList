//@@viewOn:imports
import { createVisualComponent, Lsi, PropTypes, useState } from "uu5g05";
import * as Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import DeleteListDialog from "./delete-list-dialog.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "100%",
    }),

};
//@@viewOff:css

const ShoppingListTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
  },
  //@@viewOff:propTypes


  render ( { shoppingList, user, shoppingLists, setShoppingLists, handleArchive } ) {
    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);

    const itemList = [
      {
        children : <Lsi lsi={{ cs: "Otevřít", en: "Open" }} />,
        href: `/detail`,
      },
      ...(shoppingList.owner === user.name && shoppingList.active
        ? [
          {
            children: <Lsi lsi={{ cs: "Archivovat", en: "Archive"}} />,
            onClick: () => handleArchive(shoppingList.id),
          },
        ]
        : []),
      ...(shoppingList.owner === user.name
        ? [
          {
            children: <Lsi lsi={{ cs: "Smazat", en: "Delete" }} />,
            onClick: () => setDeleteDialogOpen(true),
          },
        ]
        : []),
    ];
    console.log(shoppingList.name);
    console.log(shoppingList.owner);
    console.log(shoppingList.members);
    console.log(shoppingList);
    return (
      <div>
        <Uu5TilesElements.Tile
          displayActionList={true}
          actionList={[
            {
            children: (
              <Uu5Elements.Text category="interface" segment="title" type="micro" colorScheme="neutral" weight="bold">
                <Lsi lsi={{ cs: "Počet Položek", en: "Items count" }}/>: {shoppingList.items?.length}
              </Uu5Elements.Text>
            ),
              collapsed: false
            },
          ]}
          header = {<Uu5Elements.Text category="story" segment="heading" type="h4"> {shoppingList.name} </Uu5Elements.Text>}
          footer = { <Uu5Elements.ButtonGroup itemList={itemList} spacing="8px" /> }
          footerHorizontalAlignment="start"
          headerOverlap={false}
          headerColorScheme="dim"
        >
          <Uu5Elements.Grid>
            <Uu5Elements.Text>{<Lsi lsi={{ cs: "Majitel", en: "Owner" }} />}: {shoppingList.owner} </Uu5Elements.Text>
            <Uu5Elements.Text>{<Lsi lsi={{ cs: "Členové", en: "Members" }} />}: {shoppingList.members.join(", ")} </Uu5Elements.Text>
          </Uu5Elements.Grid>
        </Uu5TilesElements.Tile>

        <DeleteListDialog open={deleteDialogOpen} setShoppingLists={setShoppingLists} shoppingList={shoppingList} shoppingLists={shoppingLists} onClose={() => setDeleteDialogOpen(false)} />
      </div>
    );
  },
});

//@@viewOn:exports
export { ShoppingListTile };
export default ShoppingListTile;
//@@viewOff:exports
