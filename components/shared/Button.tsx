"use client"

import React, { FC } from "react"
import { styled } from "styled-components"

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <StyledButton className={className} {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  --color: var(--color-primary-300);
  --color-hover: var(--color-primary-400);
  --color-disabled: var(--color-surface-mixed-400);
  padding: 0.5rem 2rem;
  border-radius: 8px;
  border: 2px solid var(--color);
  background-color: var(--color);
  color: white;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  line-height: 1.5;

  &:enabled:hover {
    --color: var(--color-hover);
  }

  &:disabled {
    --color: var(--color-disabled);
    cursor: not-allowed;
  }
`
