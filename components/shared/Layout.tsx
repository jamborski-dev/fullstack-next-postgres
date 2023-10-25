import { FC } from "react"
import Header from "./Header"
import { SwitchRole } from "../dev/SwitchRole"
import styled from "styled-components"
import { selectUser } from "../../redux/slices/auth"
import { store } from "../../redux/store"
import StyledJsxRegistry from "../dev/StyledJSXRegistry"

const Layout: FC = ({ children }) => {
  const user = selectUser(store.getState())

  return (
    <StyledJsxRegistry>
      <LayoutRoot>
        <Header />
        <MasterLayout>{children}</MasterLayout>
        {user && <SwitchRole />}
      </LayoutRoot>
    </StyledJsxRegistry>
  )
}

export default Layout

const LayoutRoot = styled.div`
  position: relative;
  width: 100%;
`

const MasterLayout = styled.div`
  min-height: 100vh;
`
