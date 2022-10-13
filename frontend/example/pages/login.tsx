import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import DefaultLayout from '../layouts/defaultLayout'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

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

const SubContainer = styled.div`
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

const LoginContainer = styled.div`
  text-align: center;
  margin: 20px;
`

const LoginInput = styled.input`
  padding: 8px 8px;
  font-size: 14px;
`

const LoginButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
`

export default function Login() {
  const [userId, setUserId] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(["userId"])

  return (
    <DefaultLayout air>
      <Head>
        <title>로그인 페이지</title>
      </Head>
      <Banner>
        <div>테스트용 로그인 페이지</div>
      </Banner>
      <SubContainer>
        <ContentTitle>로그인</ContentTitle>
        <LoginContainer>
          <LoginInput 
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="유저 ID"
          />
          <Link href="/" passHref>
            <LoginButton
              onClick={e => {
                setCookie("userId", userId)
              }}>로그인</LoginButton>
          </Link>
        </LoginContainer>
      </SubContainer>
    </DefaultLayout>
  )
}
