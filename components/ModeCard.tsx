import styled from "styled-components"

export const ModeCard = ({ mode, setMode, selected }) => {
  const handleClick = () => {
    setMode(mode.name)
  }

  return (
    <Wrapper>
      <Element $isActive={mode.name === selected} $color={mode.color} />
      <Body onClick={handleClick} $isActive={mode.name === selected} $color={mode.color}>
        <Title>{mode.name}</Title>
        <Description>{mode.description}</Description>
        <Icon>{mode.icon}</Icon>
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem;
  --border-radius: 2rem;
`

const Element = styled.div<{ $isActive: boolean; $color: string }>`
  background-color: ${({ $color }) => $color};
  z-index: -1;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    rotate3d(0, 0, 1, ${({ $isActive }) => ($isActive ? -10 : -6)}deg);
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
`

const Body = styled.div<{ $isActive: boolean; $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  z-index: 1;
  height: 100%;
  padding: 2rem;
  background-color: var(--color-surface-mixed-${({ $isActive }) => ($isActive ? "300" : "200")});
  transform: scale(${({ $isActive }) => ($isActive ? 1.05 : 1)});

  &:hover {
    background-color: var(--color-surface-mixed-300);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
    cursor: pointer;
  }
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 10px;
  user-select: none;
`

const Description = styled.p`
  font-size: 0.8rem;
  text-align: center;
  user-select: none;
`

const Icon = styled.div`
  font-size: 3rem;
  margin-top: auto;
  user-select: none;
`
