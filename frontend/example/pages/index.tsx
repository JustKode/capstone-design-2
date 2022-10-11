import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import DefaultLayout from '../layouts/defaultLayout'
import TestContent, { Wrapper } from '../components/content/testContent'

const Banner = styled.div`
  height: 300px;
  width: 100vw;
  position: relative;
  border-bottom: 1px solid #bbbbbb;

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
  width: 100%;
  max-width: 1080px;
  margin: auto;
`

const ContentTitle = styled.div`
  padding: 12px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`

export default function Home() {
  const testContents = [1, 2, 3, 4, 5, 6].map(
    (x: number) => (
      <Link href={`/content/${x}`} key={`content ${x}`}>
        <a>
          <TestContent
            title={`제목 ${x}`}
            subTitle={`부제목 ${x}`}
            content={`컨텐츠 ${x}`}      
          />
        </a>
      </Link>
    )
  )

  return (
    <DefaultLayout air>
      <Head>
        <title>메인 페이지</title>
      </Head>
      <Banner>
        <div>테스트용 메인 페이지</div>
      </Banner>
      <Content>
        <ContentTitle>테스트 컨텐츠들</ContentTitle>
        <Wrapper>
          {testContents}
        </Wrapper>
      </Content>
    </DefaultLayout>
  )
}
