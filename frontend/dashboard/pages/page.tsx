import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import Graph, { NodeType, LinkType } from '../components/dashboard/graph'
import { DASHBOARD_SERVER } from '../env/server'
import DefaultLayout from '../layouts/defaultLayout'


const MainContainer = styled.div`
  width: 100%;
`

const SubTitleContainer = styled.div`
  width: 100%;
  height: 150px;
  line-height: 150px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`

const InputContainer = styled.div`
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
`

const UserIdInput = styled.input`
  font-size: 24px;
  padding: 8px 16px;
  border-radius: 8px;
`

const UserIdButton = styled.button`
  font-size: 24px;
  padding: 8px 16px;
  border-radius: 8px;
`

export default function Page() {
  const [userId, setUserId] = useState("")
  const [searchId, setSearchId] = useState("")
  const [nodes, setNodes] = useState<NodeType[]>([])
  const [links, setLinks] = useState<LinkType[]>([])

  const getUserInfo = async () => {
    if (userId === "") {
      alert("유저 ID를 입력 해 주세요.")
      return
    }

    const response = await fetch(DASHBOARD_SERVER + "/dashboard/page?userId=" + userId)
    const result = await response.json()
    
    setLinks(result.links)
    setNodes(result.nodes)
    setSearchId(userId)
  }

  return (
    <DefaultLayout air>
      <Head>
        <title>페이지 이동 경로 대시보드</title>
      </Head>
      <MainContainer>
        <SubTitleContainer>
          {searchId === "" ? `페이지 이동 경로 대시보드` : `${searchId}님의 페이지 이동 경로 대시보드`}
        </SubTitleContainer>
        <InputContainer>
          <UserIdInput
            value={userId}
            onChange={e => {setUserId(e.target.value)}}
            placeholder={"유저 ID를 입력 해 주세요."}
          />
          <UserIdButton onClick={getUserInfo}>
            검색
          </UserIdButton>
        </InputContainer>
        <Graph 
          nodes={nodes}
          links={links}
        />
      </MainContainer>
    </DefaultLayout>
  )
}
