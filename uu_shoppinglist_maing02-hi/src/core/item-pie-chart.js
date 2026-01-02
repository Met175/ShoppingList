//@@viewOn:imports
import { createVisualComponent, Lsi, useEffect, useRoute, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5Charts from "uu5chartsg01";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  chart: () =>
    Config.Css.css({
      width: "100%",
      height: "300px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListItemsPieChart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListItemsPieChart",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ items, setFilterItems, user }) {
    //@@viewOn:private

    const data = [
      { name: <Lsi lsi={{ cs: "K nákupu", en: "Items to buy" }} />, label: "items to buy", count: items.filter((i) => i.toBuy).length },
      { name: <Lsi lsi={{ cs: "Zakoupené", en: "Bought Items" }} />, label: "bought items" ,count: items.filter((i) => !i.toBuy).length },
    ];

    const serieList = [
      {
        valueKey: "count",
        labelKey: "name",
        color: (item) => {
          switch (item.label) {
            case "items to buy":
              return "pink";
            case "bought items":
              return "purple";
            default:
              return "gray";
          }
        },
      },
    ];
    //@@viewOn:render
    return (
      <div>
        <Uu5Charts.PieChart data={data} serieList={serieList} legend={true} className={Css.chart()}/>
      </div>

      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { ShoppingListItemsPieChart };
export default ShoppingListItemsPieChart;
//@@viewOff:exports

// <Uu5Charts.PieChart data={items.filter(filterItems).map((item) => ({ label: item.name, value: item.toBuy ? 1 : 0 }))} />
