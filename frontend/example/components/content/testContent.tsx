import { PropsWithChildren } from "react"
import styled from "styled-components"


const ContainerWrapper = styled.div`
  text-align: center;
  padding: 10px;
`

const MainContainer = styled.div`
  width: calc(33.3% - 20px);
  height: 380px;
  margin: 10px;
  border: 1px solid #bbbbbb;
  display: inline-block;
`

const Title = styled.div`
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  padding: 4px 8px;
`

const SubTitle = styled.div`
  text-align: left;
  font-size: 18px;
  padding: 4px 8px;
`

const Content = styled.div`
  height: 300px;
  border-bottom: 1px solid #bbbbbb;
  position: relative;
`

const ContentText = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-size: 24px;
  font-weight: bold;
`

interface ContentProps {
  title: string,
  subTitle: string,
  content: string
}

export default ({title, subTitle, content}: ContentProps) => {
  return (
    <MainContainer>
      <Content>
        <ContentText>
          {content}
        </ContentText>
      </Content>
      <Title>
        {title}
      </Title>
      <SubTitle>
        {subTitle}
      </SubTitle>
    </MainContainer>
  )
}

export const Wrapper = ({children}: PropsWithChildren) => {
 return (
  <ContainerWrapper>
    {children}
  </ContainerWrapper>
 )
}