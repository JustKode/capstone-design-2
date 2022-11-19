import styled from "styled-components"

export interface ComponentInfoProps {
  score: number;
  objectId: string;
  COMPONENT_VIEW?: number;
  MOUSE_ON?: number;
}

const MainContainer = styled.div`
  border-bottom: 1px solid #cdcdcd;
  padding: 16px 8px;
`

const MainLineContainer = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding: 8px 0;
`

const SubLineContainer = styled.div`
  
`

const SubLineWrapper = styled.span`
  padding-right: 8px;
`

export default function ComponentInfo({score, objectId, COMPONENT_VIEW, MOUSE_ON}: ComponentInfoProps) {
  return (
    <MainContainer>
      <MainLineContainer>
        {objectId}
      </MainLineContainer>
      <SubLineContainer>
        <SubLineWrapper>관심도: {score}</SubLineWrapper>
        {COMPONENT_VIEW !== undefined && <SubLineWrapper>화면 내 체류 시간: {COMPONENT_VIEW / 1000} 초</SubLineWrapper>}
        {MOUSE_ON !== undefined && <SubLineWrapper>마우스 위 시간: {MOUSE_ON / 1000} 초</SubLineWrapper>}
      </SubLineContainer>
    </MainContainer>
  )
}