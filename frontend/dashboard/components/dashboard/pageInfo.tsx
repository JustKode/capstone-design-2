import styled from "styled-components"
import { LinkType } from "./nodeGraph"

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

export default function PageInfo({source, target, value}: LinkType) {
  return (
    <MainContainer>
      <MainLineContainer>
        {`${source} -> ${target}`}
      </MainLineContainer>
      <SubLineContainer>
        이동 횟수: {value}
      </SubLineContainer>
    </MainContainer>
  )
}