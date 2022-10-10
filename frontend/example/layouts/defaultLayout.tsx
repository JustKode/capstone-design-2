import { PropsWithChildren, ReactNode } from "react"
import Head from "next/head"

import DefaultHeader, { Air } from "../components/layout/defaultHeader"
import DefaultFooter from "../components/layout/defaultFooter"

interface LayoutProps {
  children?: ReactNode | undefined,
  air?: boolean | undefined
}

export default ({ children, air }: LayoutProps) => {
  return <>
    <DefaultHeader/>
    <Head>
      <meta charSet="utf=8" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
    </Head>
    {air && <Air />}
    {children}
    <DefaultFooter/>
  </>
}