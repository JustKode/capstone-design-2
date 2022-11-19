import Head from 'next/head'
import styled from 'styled-components'
import Graph from '../components/dashboard/nodeGraph'
import DefaultLayout from '../layouts/defaultLayout'


const MainContainer = styled.div`
  width: 100%;
  height: 1000px;
`

export default function Home() {
  return (
    <DefaultLayout air>
      <Head>
        <title>메인 페이지</title>
      </Head>
      <MainContainer>
        <Graph 
          nodes={[{"id": "청소년", "value": 3,"group": "person"},{"id": "장면","value": 3, "group": "media"},{"id": "드라마", "value": 3,"group": "media"},{"id": "비행", "value": 3,"group": "media"}]}
          links={[{"source": "청소년","target": "장면","value": 2},{"source": "청소년","target": "비행","value": 8},{ "source": "청소년", "target": "드라마", "value": 4}]}
        />
      </MainContainer>
    </DefaultLayout>
  )
}
