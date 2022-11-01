import styled from "styled-components"

const MainContainer = styled.div`
  width: 100vw;
  height: 80px;
  border-top: 1px solid #bbbbbb;
`

const SubContainer = styled.div`
  margin: auto;
  width: 100%;
  height: 80px;
  max-width: 1080px;
`

const TitieContainer = styled.div`
  padding: 20px 0;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`

export default () => {
  return (
    <MainContainer>
      <SubContainer>
        <TitieContainer>테스트용 푸터</TitieContainer>
      </SubContainer>
    </MainContainer>
  )
}