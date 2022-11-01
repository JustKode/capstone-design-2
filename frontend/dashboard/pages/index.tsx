import Head from 'next/head'
import styled from 'styled-components'
import DefaultLayout from '../layouts/defaultLayout'


const MainContainer = styled.div`

`

export default function Home() {
  return (
    <DefaultLayout air>
      <Head>
        <title>메인 페이지</title>
      </Head>
      <MainContainer>
        
      </MainContainer>
    </DefaultLayout>
  )
}
