import React, {
  FC,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent
} from "react"
import { ButtonGroup } from "./shared/ButtonGroup"
import { Button } from "./shared/Button"
import { GameUIProps, LetterState, CharKey } from "../types/game"
import {
  Root,
  Container,
  Header,
  HeaderItem,
  Title,
  HeaderLabel,
  Score,
  MultiplierValue,
  StreakValue,
  Timer,
  Body,
  ResultTextOverflowWrapper,
  ResultTextAlt,
  Character,
  TextareaInput,
  IncomingText,
  Footer,
  Params
} from "./GameUI.styled"

const DISABLE_TIMER = false

export const GameUI: FC<GameUIProps> = ({ mode, sourceText, seconds = 60 }) => {
  // Move state to state management library (Zustand or Redux)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState("")
  const [result, setResult] = useState<LetterState[]>([])
  const [incomingText, setIncomingText] = useState(sourceText)
  const [textPos, setTextPos] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [streak, setStreak] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [backspaceCount, setBackspaceCount] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [timer, setTimer] = useState(seconds)
  const [accuracy, setAccuracy] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [keyPressed, setKeyPressed] = useState<CharKey>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [suppressNextPoints, setSuppressNextPoints] = useState(false)

  const isComplete = textPos === sourceText.length - 1 || timer === 0

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
    setTextPos(value.length)

    const state = validateCurrentChar(value)

    // if state is false than backspace was pressed
    if (Boolean(state)) {
      setResult(prev => [
        ...prev,
        {
          char: value[value.length - 1],
          charKey: keyPressed,
          state: state,
          pos: value.length - 1
        }
      ])
    } else {
      // remove last character from result
      setResult(prev => prev.slice(0, prev.length - 1))
    }
  }

  const validateCurrentChar = (value: string) => {
    const index = value.length - 1
    const typedChar = value[index]
    const currentChar = sourceText[index]

    if (keyPressed.code === "Backspace") {
      setMultiplier(1)
      setTotalScore(prev => prev + streak)
      setStreak(0)
      setBackspaceCount(prev => prev + 1)
      setSuppressNextPoints(true)
      return
    }

    if (typedChar === currentChar) {
      if (streak >= 100) setMultiplier(2) // testing
      if (streak >= 1000) setMultiplier(2)
      if (streak >= 3000) setMultiplier(3)
      if (streak >= 6000) setMultiplier(4)
      if (streak >= 10000) setMultiplier(5)

      // add 10 points for correct capitalization
      const points = suppressNextPoints ? 0 : 10 * multiplier
      const currStreak = streak + points
      setCurrentPoints(points)
      setStreak(prev => prev + points)
      setCurrentScore(() => totalScore + currStreak)
      if (suppressNextPoints) setSuppressNextPoints(false)

      return "correct"
    } else if (typedChar.toLocaleLowerCase() === currentChar.toLocaleLowerCase()) {
      // above check should account for accents in other languages (e.g. é, à, etc.)
      // add 5 points for correct character only
      // this won't cancel streak, but will decrease multiplier by 1
      setMultiplier(prev => (prev > 1 ? prev - 1 : 1))
      const points = suppressNextPoints ? 0 : 5 * multiplier
      const currStreak = streak + points
      setCurrentPoints(points)
      setCurrentScore(() => totalScore + currStreak)
      return "partially-correct"
    } else {
      // remove 20 points for incorrect character
      const points = -20
      setCurrentPoints(points)
      setMistakes(prev => prev + 1)
      setTotalScore(prev => prev + streak)
      setCurrentScore(prev => prev + points)
      setStreak(0)
      return "incorrect"
    }
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!hasStarted) setHasStarted(true)
    const { key, code } = e
    setKeyPressed({ key, code })
  }

  const handleIncomingText = () => setIncomingText(sourceText.slice(textPos))

  const handleRestart = () => {
    setTimer(seconds)
    setText("")
    setResult([])
    setBackspaceCount(0)
    setTextPos(0)
    setIncomingText(sourceText)
    setMistakes(0)
    setCurrentScore(0)
    setAccuracy(0)
    setMultiplier(1)
    setStreak(0)
    setTotalScore(0)
    setCurrentPoints(0)
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

  const handleOnRootClick = (e: MouseEvent<HTMLElement>) => {
    // refocus textarea on click if the clicked element is not a button
    if (e.currentTarget instanceof HTMLButtonElement) return
    focusTextArea()
  }

  useEffect(() => {
    if (textPos === 0) return
    handleIncomingText()
    calculateAccuracy()
    calculateWpm()
  }, [textPos])

  useEffect(() => {
    focusTextArea()
  }, [textareaRef.current])

  useEffect(() => {
    if (!hasStarted) return

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
  }, [timer, isComplete, hasStarted])

  return (
    <Root onClick={handleOnRootClick}>
      <Container>
        <Header>
          <HeaderItem>
            <Title>{mode}</Title>
            <HeaderLabel>Mode</HeaderLabel>
          </HeaderItem>
          <HeaderItem align="center">
            <StreakValue $value={streak}>{streak}</StreakValue>
            <HeaderLabel>Streak</HeaderLabel>
          </HeaderItem>
          <HeaderItem align="center">
            <Score $score={currentScore} currentPoints={currentPoints}>
              {currentScore}
            </Score>
            <HeaderLabel>Score</HeaderLabel>
          </HeaderItem>
          <HeaderItem align="center">
            <MultiplierValue $value={multiplier}>{multiplier}</MultiplierValue>
            <HeaderLabel>Multiplier</HeaderLabel>
          </HeaderItem>
          <HeaderItem align="end">
            <Timer>{timer}s</Timer>
            <HeaderLabel>Time left</HeaderLabel>
          </HeaderItem>
        </Header>
        <Body>
          <ResultTextOverflowWrapper>
            <ResultTextAlt as="div">
              {result.map((letter, index) => (
                <Character key={index} state={letter.state}>
                  {letter.char}
                </Character>
              ))}
            </ResultTextAlt>
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
