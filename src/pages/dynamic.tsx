import { GetServerSideProps, NextPage } from "next"
import { ReactNode, useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"
//Os dados são gerados dinamicamente toda vez que realiza requisição no servidor
type ApiResponse = {
  name: string
  timestamp: Date
}

export const getServerSideProps: GetServerSideProps = async () => { //Gerado no servidor
	const serverSideData: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json())

  return {
    props: {
      serverSideData
    }
  }
}
const Dynamic: NextPage = (props: { 
    children?: ReactNode
    serverSideData?: ApiResponse
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
            Gerado no servidor: {props.serverSideData?.timestamp.toString()}
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