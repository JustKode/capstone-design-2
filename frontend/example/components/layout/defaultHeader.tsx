import styled from "styled-components"
import Link from "next/link"

const MainContainer = styled.div`
  width: 100vw;
  height: 80px;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999;
  border-bottom: 1px solid #bbbbbb;
  background-color: white;
`

const SubContainer = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1080px;
  height: 80px;
  position: relative;
`

const Banner = styled.div`
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export default () => {
  return (
    <MainContainer>
      <SubContainer>
        <Link href="/" passHref>
          <a>
            <Banner>테스트용 배너</Banner>
          </a>
        </Link>
      </SubContainer>
    </MainContainer>
  )
}

export const Air = styled.div`
  height: 80px;
`