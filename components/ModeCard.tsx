import styled from "styled-components"
// import classicModeImg from "../assets/img/card-image-classic.png"
// import devModeImg from "../assets/img/card-image-dev.png"
// import blinkModeImg from "../assets/img/card-image-blink.png"
// import survivalModeImg from "../assets/img/card-image-survival.png"
// import Image from "next/image"

const mapModeToImgPath = {
  Classic: "/assets/img/card-image-classic.png",
  Developer: "/assets/img/card-image-dev.png",
  Blink: "/assets/img/card-image-blink.png",
  Survival: "/assets/img/card-image-survival.png"
}

export const ModeCard = ({ mode, setMode, selected }) => {
  const handleClick = () => {
    setMode(mode.name)
  }

  return (
    <Wrapper>
      {/* <Element $isActive={mode.name === selected} $color={mode.color} /> */}
      <Body
        onClick={handleClick}
        $isActive={mode.name === selected}
        $color={mode.color}
        $bgImg={mapModeToImgPath[mode.name]}
      >
        <InfoBubble>
          <Icon>{mode.icon}</Icon>
          <Title>{mode.name}</Title>
          {/* desc should appear on hover */}
          {/* <Description>{mode.description}</Description>  */}
        </InfoBubble>
        {/* <ImageContainer>
          <Image src={mapModeToImg[mode.name]} width={150} height={150} alt={mode.name} />
        </ImageContainer> */}
      </Body>
    </Wrapper>
  )
}

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 1rem;
  border-radius: var(--border-radius);
  overflow: hidden;
`

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 500px;
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

const Body = styled.div<{ $isActive: boolean; $color: string; $bgImg: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  z-index: 1;
  height: 100%;
  /* padding: 2rem; */
  background-image: url(${({ $bgImg }) => $bgImg});
  background-size: cover;
  background-position-x: center;
  background-position-y: bottom;
  position: relative;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2rem);
    cursor: pointer;
  }
`

const InfoBubble = styled.div`
  backdrop-filter: blur(60px) saturate(100%);
  background-color: transparent;
  padding: 1rem;
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  margin: 0;
  margin-top: 2rem;
  user-select: none;
  text-align: center;
`

const Description = styled.p`
  font-size: 0.8rem;
  text-align: center;
  user-select: none;
`

const Icon = styled.div`
  font-size: 2rem;
  margin-top: auto;
  position: relative;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 30%);
`
