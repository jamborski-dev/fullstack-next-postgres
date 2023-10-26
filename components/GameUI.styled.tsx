import styled from "styled-components"
import { flexToTextAlignMap, LetterState } from "../types/game"

export const Params = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: left;
`

// All above styled components are defined here
export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;

  background: linear-gradient(0deg, var(--color-primary-100) 50%, transparent 50%, transparent);
  background-size: 100% 100%;
`

export const Container = styled.div`
  --max-width: 1400px;
  max-width: var(--max-width);
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr auto 1fr;

  margin-block: auto;

  grid-template-areas:
    "header header header"
    "body body body"
    "footer footer footer";
`

export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  align-items: end;
  padding: 1.5rem 3rem;
  grid-area: header;
`

export const HeaderItem = styled.div<{ align?: "start" | "center" | "end" }>`
  display: grid;
  grid-template-rows: auto 2rem;
  text-align: ${({ align = "start" }) => flexToTextAlignMap[align]};
  font-family: var(--font-special-elite);
`

export const HeaderLabel = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
  /* letter-spacing: 0.1rem; */
  text-transform: uppercase;
  color: var(--color-primary-100);
`

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

export const Timer = styled.div`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.2rem;
  text-align: right;
`

export const Score = styled.div<{ $score: number; currentPoints: number }>`
  font-size: 4rem;
  text-align: center;
  font-weight: 600;
  font-family: var(--font-special-elite);
  color: ${({ $score }) => ($score < 0 ? "#e43939" : $score > 100 ? "#b6c212" : "inherit")};
  position: relative;

  &:after {
    content: "${({ currentPoints: pts }) => (pts > 0 ? `+${pts}` : pts)}";
    color: ${({ currentPoints: pts }) =>
      pts < 0 ? "#e43939" : pts > 100 ? "#b6c212" : "rgb(255, 255, 255, 0.3)"};
    position: absolute;
    font-size: 1.5rem;
    font-weight: 400;
    top: 0;
    left: 50%;
    transform: translate(-50%, -150%);
  }
`

export const MultiplierValue = styled.div<{ $value: number }>`
  font-size: 1.5rem;
`
export const StreakValue = styled.div<{ $value: number }>`
  font-size: 2rem;
`

export const Body = styled.form`
  display: flex;
  border: none;
  border-radius: 2.5rem;
  width: 100%;
  overflow: hidden;
  max-width: var(--max-width);
  flex: 1;

  box-shadow: 0 0 13px #3d26008c;

  grid-area: body;
`

// Refactor to use div instead of textarea with flexbox - same as result text
export const BaseTextArea = styled.textarea.attrs({
  rows: 1,
  spellCheck: false,
  unselectable: "on"
})`
  font-family: var(--font-special-elite);
  flex: 1;
  font-size: 3rem;
  overflow: hidden;
  max-width: calc(var(--max-width) / 2);
  resize: none;
  position: relative;
  background-color: #fff;
  color: var(--color-surface-200);
  text-align: right;
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

export const ResultTextOverflowWrapper = styled.div`
  overflow: hidden;
  position: relative;
  flex: 1;
  caret-color: transparent;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
`

export const ResultTextAlt = styled(BaseTextArea)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  flex: 1;
`

export const Character = styled.span<Pick<LetterState, "state">>`
  color: ${({ state }) =>
    state === "incorrect"
      ? "#b32222"
      : state === "partially-correct"
      ? "#dd8614"
      : "var(--color-surface-5 t00)"};
  text-decoration: ${({ state }) => (state === "incorrect" ? "underline" : "none")};
`

export const TextareaInput = styled(BaseTextArea)`
  border-right: 2px solid #dd8614;
  flex: none;
  width: 1px;
  caret-color: transparent;
`

export const IncomingText = styled(BaseTextArea)`
  padding-left: 5px;
  text-align: left;
  user-select: none;
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem;

  grid-area: footer;
`
