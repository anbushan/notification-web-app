
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


const PageError404 = () => {
  return (
    <div>
      <Container fluid className='vh-100  d-flex flex-column  justify-content-center align-items-center'>
        <Row className='shaded rounded d-flex flex-column  justify-content-center align-items-center text-center'>
          <Col>
          <h1 className='fs-130 fw-bold'>4<span className='txt-b'>0</span>4</h1>
          </Col>
          <Col>
          <p className='fw-bold fs-6 '>THE PAGE YOU REQUESTED COULD NOT FOUND</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PageError404
