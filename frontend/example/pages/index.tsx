import Head from 'next/head'
import DefaultLayout from '../layouts/defaultLayout'
import styled from 'styled-components'

const Banner = styled.div`
  height: 300px;
  width: 100vw;
  position: relative;

  & > div {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 64px;
    font-weight: 700;
  }
`

const Content = styled.div`
  
`

export default function Home() {
  return (
    <DefaultLayout air>
      <Head>
        <title>메인 페이지</title>
      </Head>
      <Banner>
        <div>테스트용 메인 페이지</div>
      </Banner>
      <Content>
        
      </Content>
    </DefaultLayout>
  )
}
