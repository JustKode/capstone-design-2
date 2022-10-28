import { createContext, Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { SERVER_URL } from "../env/server"
import GlobalStyle from '../components/globalstyles'
import { LogData } from '../components/function/interface'

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}

interface ILogContext {
  data?: LogData[],
  addData?: Dispatch<SetStateAction<LogData>>,
  resetData?: () => void
}

export const LogContext = createContext<ILogContext>({})

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<LogData[]>([])
  const savedCallback = useRef(null)

  const value = {
    data: data,
    addData: (d: LogData) => {setData(data => [...data, d])},
    resetData: () => {setData(data => [])}
  }

  const callback = () => {
    fetchFunction()
  }

  const fetchFunction = async () => {
    if (data.length === 0) {
      return
    }

    try {
      const response = await fetch(`${SERVER_URL}/log/component`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    } catch (e) {
      console.log("Server Error")
      console.log(data)
    }
    setData(data => [])
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, [])

  return (
    <LogContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </LogContext.Provider>
  )
}
