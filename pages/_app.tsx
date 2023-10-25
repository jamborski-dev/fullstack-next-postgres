import "../styles/globalStyles.css"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { store } from "../redux/store"
import { SyncSessionWithState } from "../components/dev/SyncSessionWithState"

import { Montserrat } from "next/font/google"
import { Special_Elite } from "next/font/google"
import styled from "styled-components"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-elite"
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <SyncSessionWithState>
          <Main className={`${montserrat.variable} ${specialElite.variable}`}>
            <Component {...pageProps} />
          </Main>
        </SyncSessionWithState>
      </SessionProvider>
    </Provider>
  )
}

export default App

const Main = styled.main`
  height: 100vh;
`
