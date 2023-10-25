import React, { useState } from "react"
import { modes } from "../data/type-game/modes"
import styled from "styled-components"
import { Button } from "../components/shared/Button"
import { ModeCard } from "../components/ModeCard"
import { GameUI } from "../components/GameUI"

const TypeGamePage = () => {
  const [mode, setMode] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleStart = () => {
    setIsPlaying(true)
  }

  return (
    <Root>
      <Header>
        <Title>Typing game (WIP)</Title>
      </Header>
      <Body>
        {!isPlaying ? (
          <>
            <Info>
              Browser-based typing game to challenge your typing speed and accuracy. There is
              variety of modes to play including classic time attack, survival, blink, developer and
              more. You can login with your Google account to save your score to the leader board.
              Happy typing!
            </Info>
            <Modes>
              {modes.map(item => (
                <ModeCard key={item.id} mode={item} setMode={setMode} selected={mode} />
              ))}
            </Modes>
            <Button onClick={handleStart} disabled={!mode}>
              Start
            </Button>
          </>
        ) : (
          <GameUI mode={mode} />
        )}
      </Body>
    </Root>
  )
}

export default TypeGamePage

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
`

const Info = styled.p`
  font-size: 18px;
  text-align: center;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Modes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`
