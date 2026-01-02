//@@viewOn:imports
import { createVisualComponent, Lsi, useAppBackground } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DarkModeToggle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DarkModeToggle",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    //@@viewOn:render
    return (
      <Uu5Elements.Toggle
        colorScheme="pink"
        value={!darkMode}
        onChange={() => setBackground({
          backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"])
        })}
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun"
      />

      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { DarkModeToggle };
export default DarkModeToggle;
//@@viewOff:exports
