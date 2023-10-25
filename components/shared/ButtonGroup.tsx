import React, { FC } from "react"
import styled from "styled-components"

type Direction = "row" | "column"

interface ButtonGroupProps {
  direction?: Direction
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, direction = "row" }) => {
  return <Container $direction={direction}>{children}</Container>
}

const Container = styled.div<{ $direction: "row" | "column" }>`
  display: flex;
  direction: ${({ $direction }) => $direction};
  gap: 0.5rem;
  align-items: center;
`
