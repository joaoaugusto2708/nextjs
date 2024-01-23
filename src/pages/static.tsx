import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { ReactNode, useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"
//Paginas com dados carregados no build são imutáveis
type ApiResponse = {
  name: string
  timestamp: Date
}

export const getStaticProps: GetStaticProps = async () => { 
    const staticData = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json())
    return { 
        props: { 
            staticData
        },
        //Revalida os dados de 10 em 10 segundos
        revalidate: 10
    }
}//Gerado de estaticamente no build
const Dynamic: NextPage = (props: { 
    children?: ReactNode
    staticData?: ApiResponse
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch("/api/hello").then(res => res.json())
    setClientSideData(data)
  } //Lado do cliente

  return (
    <Container tag="main">
      <h1 className="my-5">
        Como funcionam as renderizações do Next.js
      </h1>

      <Row>
        <Col>
          <h3>
            Gerado estaticamente no build: {props.staticData?.timestamp.toString() }
          </h3>
        </Col>

        <Col>
          <h3>
            Gerado no cliente: {clientSideData?.timestamp.toString()}
          </h3>
        </Col>
      </Row>
    </Container>
  )
}

export default Dynamic