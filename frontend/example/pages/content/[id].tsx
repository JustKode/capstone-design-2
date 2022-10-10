import styled from "styled-components"
import Head from "next/head"
import Link from "next/link"
import { GetServerSidePropsContext } from "next"
import TestContent, { Wrapper } from "../../components/content/testContent"
import DefaultLayout from "../../layouts/defaultLayout"


interface ContentPageProps {
  id: number
}

const MainContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: auto;
`

const TitleContainer = styled.div`
  padding: 20px 8px;
  border-bottom: 1px solid #bbbbbb;
`

const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const SubTitleWrapper = styled.div`
  font-size: 18px;
`

const ContentContainer = styled.div`
  padding: 20px 8px;
  border-bottom: 1px solid #bbbbbb;
`

const RelateContentContainer = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px 8px;
`

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params.id

  return {
    props: {
      id: id
    }
  }
}


export default ({id}: ContentPageProps) => {
  const title = `제목 ${id}`
  const sub_title = `부제목 ${id}`
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor viverra orci, eget ultrices massa vehicula in. Praesent aliquet metus eu risus aliquet, et tincidunt risus rhoncus. Pellentesque eleifend neque arcu, vitae lobortis eros fermentum a. Quisque pellentesque, augue aliquam ultrices pretium, magna sem elementum tellus, non eleifend tortor tellus ut velit. Nam scelerisque eget velit rhoncus auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris urna ex, rutrum eu nisl a, tempor elementum sem. Morbi at elit nibh.

  Ut finibus metus mauris, eu faucibus arcu iaculis sed. Fusce sit amet tortor a lacus vehicula interdum a et leo. Suspendisse et arcu euismod, tincidunt massa nec, rutrum metus. Curabitur consectetur eros enim, non efficitur libero blandit bibendum. Donec ultricies rhoncus urna, a aliquam orci vehicula in. Nunc varius leo in congue varius. Nulla ut nulla erat. Duis iaculis congue tortor, in varius orci imperdiet in. Cras eu placerat tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus hendrerit, libero ac maximus tristique, magna velit maximus tellus, non fermentum augue neque ac sapien. Fusce scelerisque vestibulum neque non tincidunt. Sed sagittis libero orci, quis placerat mi malesuada et. Etiam scelerisque, nunc non feugiat viverra, dolor est consectetur magna, at interdum lectus nulla vel ligula. Pellentesque sit amet pellentesque urna. Quisque risus diam, tincidunt eget leo in, ullamcorper luctus nisl.
  
  Aliquam erat volutpat. Sed rutrum luctus ex, id interdum velit luctus et. Cras accumsan scelerisque imperdiet. Praesent id pulvinar nisl. Etiam dictum accumsan purus at pretium. In sit amet ullamcorper massa, et tincidunt magna. Aenean feugiat, orci sit amet tincidunt consectetur, nulla est mattis diam, vel cursus neque sem in neque. In mollis nibh vitae iaculis feugiat. Quisque dapibus rhoncus nunc nec tempus. Duis et ligula erat. Proin mattis tortor eu lorem tempus, eget semper elit vulputate. In quis elit sollicitudin, sodales lectus at, lacinia orci. Sed pulvinar, mi dapibus luctus bibendum, odio sem vestibulum magna, nec faucibus mauris ligula id felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut porta turpis at fringilla lacinia.
  
  Nullam luctus ante ut bibendum ullamcorper. Sed non gravida justo. Aliquam auctor nisl non nibh fringilla, sed tempus enim posuere. Cras porttitor mi nec ligula fermentum, ut ullamcorper augue tincidunt. Nulla condimentum purus et ultricies ullamcorper. Nulla sit amet aliquam diam. Integer quis lorem nec dui mattis aliquet. Mauris tempus tincidunt suscipit. Pellentesque imperdiet ligula ac congue finibus.
  
  Aenean in purus hendrerit, convallis nulla nec, ullamcorper elit. Cras at tellus sed quam maximus mollis et consequat elit. Aliquam libero est, placerat eu risus sit amet, aliquam tempus orci. Etiam ut maximus felis, ac blandit dui. Nunc eget odio ut erat mattis tempus eget ut sem. Donec tempor diam ac est congue, eu mollis ipsum finibus. Suspendisse potenti. Aliquam porttitor dolor sit amet magna facilisis, eget pretium dolor congue. Vivamus maximus magna eros. Suspendisse urna urna, ultricies ac pretium vel, sagittis nec nunc.`

  const testContents = [1, 2, 3, 4, 5, 6].map(
    (x: number) => (
      <Link href={`/content/${x}`}>
        <a>
          <TestContent
            title={`제목 ${x}`}
            subTitle={`부제목 ${x}`}
            content={`컨텐츠 ${x}`}      
          />
        </a>
      </Link>
    )
  )

  return (
    <>
      <DefaultLayout air>
        <Head>
          <title>{title}</title>
        </Head>
        <MainContainer>
          <TitleContainer>
            <TitleWrapper>{title}</TitleWrapper>
            <SubTitleWrapper>{sub_title}</SubTitleWrapper>
          </TitleContainer>
          <ContentContainer>
            {content}
          </ContentContainer>
          <Wrapper>
            <RelateContentContainer>관련 컨텐츠</RelateContentContainer>
            {testContents}
          </Wrapper>
        </MainContainer>
      </DefaultLayout>
    </>
  )
}