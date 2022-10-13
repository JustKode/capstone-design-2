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
  left: 20px;
  transform: translateY(-50%);
`

const MenuContainer = styled.div`
  line-height: 80px;
  float: right;

  & a {
    font-size: 18px;
    font-weight: bold;
    margin: 20px;
  }
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
        <MenuContainer>
          <Link href="/login" passHref>
            <a>
              로그인
            </a>
          </Link>
        </MenuContainer>
      </SubContainer>
    </MainContainer>
  )
}

export const Air = styled.div`
  height: 80px;
`