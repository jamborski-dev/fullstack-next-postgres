import { GiStopwatch, GiShieldBash, GiEyeTarget } from "react-icons/gi"
import { DiCode } from "react-icons/di"
import { classicText } from "./text"

export const modes = [
  {
    id: 0,
    name: "Classic",
    text: classicText,
    description: "Type the given text as fast as possible within 60 seconds",
    color: "#006aff",
    icon: <GiStopwatch />
  },
  {
    id: 1,
    name: "Survival",
    text: classicText,
    description:
      "Every mistake you make will reduce your time by 5 seconds, and every 5th word you type correctly will add 5 seconds to your time",
    color: "#a80d0d",
    icon: <GiShieldBash />
  },
  {
    id: 2,
    name: "Blink",
    text: classicText,
    description:
      "Words will appear for a split second on the screen and you will have 1 chance to type it correctly.",
    color: "#00eeff",
    icon: <GiEyeTarget />
  },
  {
    id: 3,
    name: "Developer",
    text: classicText,
    description:
      "This is a variation of a Classic game mode, but with a twist. Instead of standard text, you will be given a random code snippet to type in a chosen language.",
    color: "#ebc000",
    icon: <DiCode />
  }
]
