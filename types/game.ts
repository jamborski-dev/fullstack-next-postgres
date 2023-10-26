export interface GameUIProps {
  mode: string
  sourceText: string
  seconds?: number
}

export interface CharKey {
  key: string | null
  code: string | null
}

export const flexToTextAlignMap = {
  start: "left",
  center: "center",
  end: "right"
}

export const CHAR_STATE = {
  correct: "correct",
  partiallyCorrect: "partially-correct",
  incorrect: "incorrect"
} as const

export interface LetterState {
  char: string | null
  charKey: CharKey
  state?: (typeof CHAR_STATE)[keyof typeof CHAR_STATE]
  pos: number
}
