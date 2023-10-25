import React, {
  FC,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent
} from "react"
import styled from "styled-components"
import { ButtonGroup } from "./shared/ButtonGroup"
import { Button } from "./shared/Button"
import { current } from "@reduxjs/toolkit"

interface GameUIProps {
  mode: string
  sourceText?: string
  seconds?: number
}

const DISABLE_TIMER = true

const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `

/* Some Google fonts to think
  Lobster (for headings)
  Carter One (for headings)
  Fugaz One (for headings)
  Oleo Script (for headings) - 2 styles
  Londrina Solid (for headings) - 4 styles
  
  Special Elite (looks like typewriter)
  Allura (for difficult to read mode)
*/

/* TODO
    Start timer on first keypress
    Add backspace functionality
    Finished game popup with stats
    Styling for mobile
    Style error text
*/

interface CharKey {
  key: string | null
  code: string | null
}

interface LetterState {
  char: string | null
  key: CharKey
  state: "correct" | "partially-correct" | "incorrect" | null
  pos: number
}

export const GameUI: FC<GameUIProps> = ({ mode, sourceText = mockText, seconds = 60 }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState("")
  const [result, setResult] = useState<LetterState[]>([])
  const [incomingText, setIncomingText] = useState(mockText)
  const [textPos, setTextPos] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [backspaceCount, setBackspaceCount] = useState(0)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(seconds)
  const [accuracy, setAccuracy] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [keyPressed, setKeyPressed] = useState<CharKey>(null)

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
    setTextPos(value.length)
    setResult(prev => [
      ...prev,
      {
        char: value[value.length - 1],
        key: keyPressed,
        state: null,
        pos: value.length - 1
      }
    ])
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, code } = e
    setKeyPressed({ key, code })
  }

  const handleIncomingText = () => setIncomingText(sourceText.slice(textPos))

  const handleValidation = () => {
    const index = textPos - 1
    const typedChar = text[index]
    const currentChar = sourceText[index]

    if (keyPressed.code === "Backspace") {
      setBackspaceCount(prev => prev + 1)
      return
    }

    if (typedChar === currentChar) {
      // add 10 points for correct capitalization
      setScore(prev => prev + 10)
    } else if (typedChar.toLocaleLowerCase() === currentChar.toLocaleLowerCase()) {
      // add 5 points for correct character only
      setScore(prev => prev + 5)
    } else {
      // remove 20 points for incorrect character
      setMistakes(prev => prev + 1)
      setScore(prev => prev - 20)
    }
  }

  const handleTextTransform = () => {
    return false
    const spaceEl = `<span class="text-transform__space"></span>`
    if (keyPressed.code === "Space") {
      setText(prev => {
        const lastSpace = prev.length - 1
        if (lastSpace !== -1) {
          const resultString = spaceEl + prev.substring(0, lastSpace) + spaceEl
          console.log(lastSpace, resultString)
          return resultString
        }

        return prev
      })
    }
  }

  const handleRestart = () => {
    resetTimer()
    setText("")
    setTextPos(0)
    setIncomingText(sourceText)
    setMistakes(0)
    setScore(0)
    setAccuracy(0)
    setWpm(0)
    focusTextArea()
  }

  const calculateAccuracy = () => {
    const value = Math.round(((textPos - mistakes) / textPos) * 100)
    if (isNaN(value)) return
    setAccuracy(value)
  }

  const calculateWpm = () => {
    const value = Math.round((textPos / 5 / (seconds - timer)) * 60)
    if (isNaN(value)) return
    setWpm(value)
  }

  const focusTextArea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const resetTimer = () => setTimer(seconds)

  const handleOnRootClick = (e: MouseEvent<HTMLElement>) => {
    // refocus textarea on click if the clicked element is not a button
    if (e.currentTarget instanceof HTMLButtonElement) return
    focusTextArea()
  }

  const isComplete = textPos === mockText.length - 1 || timer === 0

  useEffect(() => {
    if (textPos === 0) return
    handleIncomingText()
    handleValidation()
    handleTextTransform()
  }, [textPos])

  useEffect(() => {
    calculateAccuracy()
    calculateWpm()
  }, [mistakes, score])

  useEffect(() => {
    focusTextArea()
  }, [textareaRef.current])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isComplete || DISABLE_TIMER) {
      clearInterval(interval)
      return
    }

    interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer, isComplete])

  return (
    <Root onClick={handleOnRootClick}>
      <Container>
        <Header>
          <Title>
            <strong>{mode}</strong> mode
          </Title>
          <Timer>{timer}s</Timer>
          <Score $score={score}>{score}</Score>
        </Header>
        <Body>
          <ResultTextOverflowWrapper>
            {/* Refactor this to a flex container that creates every characters as separate component from an array of objects */}
            <ResultText as="div" dangerouslySetInnerHTML={{ __html: text }} />
          </ResultTextOverflowWrapper>
          <TextareaInput
            ref={textareaRef}
            value={text}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            disabled={isComplete}
          />
          <IncomingText value={incomingText} readOnly />
        </Body>
        <div>
          {result.map((letter, index) => (
            <span key={index}>{letter.char}</span>
          ))}
        </div>
        <Footer>
          <Params>
            Errors: {mistakes} | Backspace used: {backspaceCount} | WPM: {wpm} | Accuracy:{" "}
            {accuracy}% {isComplete && ", COMPLETE"}
          </Params>
          <ButtonGroup>
            <Button onClick={handleRestart}>Restart</Button>
          </ButtonGroup>
        </Footer>
      </Container>
    </Root>
  )
}

const Params = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: left;
`

// All above styled components are defined here
const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
`

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
`

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 1.5rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`

const Timer = styled.div`
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.2rem;
`

const Score = styled.div<{ $score: number }>`
  font-size: 4rem;
  font-weight: 800;
  text-align: right;
  color: ${({ $score }) => ($score < 0 ? "#da0000" : $score > 100 ? "#a7d401" : "#52d4dd")};
`

const Body = styled.form`
  display: flex;
  border: 1px solid #929292;
  width: 100%;
  overflow: hidden;
  max-width: 1000px;
  flex: 1;
`

const BaseTextArea = styled.textarea.attrs({ rows: 1, spellCheck: false, unselectable: "on" })`
  font-family: var(--font-special-elite);
  flex: 1;
  font-size: 3rem;
  overflow: hidden;
  max-width: 500px;
  resize: none;
  position: relative;
  background-color: transparent;
  color: inherit;
  text-align: right;
  vertical-align: middle;
  white-space: nowrap;
  line-height: 2.5;
  border: 0;
  outline: 0;
  box-shadow: none;
  margin: 0;
  padding: 0;
  letter-spacing: 0.1rem;
  white-space: pre;
  user-select: none;
`

const ResultTextOverflowWrapper = styled.div`
  overflow: hidden;
  position: relative;
  flex: 1;
  caret-color: transparent;
`

const ResultText = styled(BaseTextArea)`
  position: absolute;
  top: 0;
  right: 0;
  caret-color: transparent;
  direction: rtl;
  white-space: pre;
`

const TextareaInput = styled(BaseTextArea)`
  border-right: 2px solid #dd8614;
  flex: none;
  background-color: transparent;
  width: 1px;
  caret-color: transparent;
`

const IncomingText = styled(BaseTextArea)`
  padding-left: 5px;
  text-align: left;
  opacity: 0.7;
`

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem;
`
