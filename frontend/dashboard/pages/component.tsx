import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { DASHBOARD_SERVER } from '../env/server'
import DefaultLayout from '../layouts/defaultLayout'
import ComponentInfo, { ComponentInfoProps } from '../components/dashboard/componentInfo'
import ComponentGraph from '../components/dashboard/componentGraph'

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

const InfoContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: auto;
`

export default function Component() {
  const [userId, setUserId] = useState("")
  const [searchId, setSearchId] = useState("")
  const [componentInfoData, setComponentInfoData] = useState<ComponentInfoProps[]>([])

  const getUserInfo = async () => {
    if (userId === "") {
      alert("유저 ID를 입력 해 주세요.")
      return
    }

    const componentResponse = await fetch(DASHBOARD_SERVER + "/dashboard/component?userId=" + userId)
    const componentResult = await componentResponse.json()
    
    const componentScoreResponse = await fetch(DASHBOARD_SERVER + "/dashboard/componentScore?userId=" + userId)
    const componentScoreResult = await componentScoreResponse.json()

    let tempObject = {}

    componentScoreResult.forEach(element => {
      tempObject[element.objectId] = {
        score: element.score
      }
    });

    componentResult.forEach(element => {
      tempObject[element.objectId][element.actionType] = element.time
    })

    let componentDataList = []

    for (const key of Object.keys(tempObject)) {
      componentDataList.push({
        objectId: key,
        ...tempObject[key]
      })
    }

    componentDataList.sort((a, b) => b.score - a.score)

    setComponentInfoData(componentDataList)
    setSearchId(userId)
  }

  const componentInfoArray = componentInfoData.map(x => <ComponentInfo key={x.objectId} {...x}/>)

  return (
    <DefaultLayout air>
      <Head>
        <title>컴포넌트 대시보드 페이지</title>
      </Head>
      <MainContainer>
        <SubTitleContainer>
          {searchId === "" ? `컴포넌트 대시보드` : `${searchId}님의 컴포넌트 경로 대시보드`}
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
        <ComponentGraph data={componentInfoData}/>
        <InfoContainer>
          {componentInfoArray}
        </InfoContainer>
      </MainContainer>
    </DefaultLayout>
  )
}
