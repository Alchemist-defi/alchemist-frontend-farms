/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */
import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import HowItWorks from './components/HowItWorks'
// import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'
import NftInfo from './components/NftInfo'
import AddNft from './components/AddNft'
import { Accordion, Form, FormControl, InputGroup } from 'react-bootstrap'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  //   padding-bottom: 32px;
`
const BredDetail = styled.section`
  display: block;
  text-align: center;
  background: #e7f1ff;
  padding: 10px;
  border-radius: 18px;

  & > div > div > p {
    margin-bottom: 5px;
  }
`
const PMB = styled.p`
  margin-bottom: 5px;
`
const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const Breeding = () => {
  const TranslateString = useI18n()
  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="secondary" mb="24px">
            Breeding
          </Heading>
          {/* <Heading as="h2" size="lg" color="secondary">
            {TranslateString(999, 'Trade in for CAKE, or keep for your collection!')}
          </Heading> */}
        </StyledHero>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%' }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              <FormControl placeholder="Search here..." aria-describedby="basic-addon1" />
            </InputGroup>
          </div>
          <div style={{ width: '40%' }}></div>
          <div style={{ width: '30%' }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Sort By </InputGroup.Text>
              <Form.Select aria-label="Default select example">
                <option>Recently Listed</option>
                <option value="1">Expiring Soon</option>
                <option value="2">Highest Price</option>
              </Form.Select>
            </InputGroup>
          </div>
        </div>
        {/* <div style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ width: '50%' }}>
            <p>STALLION</p>
          </div>
          <div style={{ width: '20%' }}>
            <p>STABLE</p>
          </div>
          <div style={{ width: '15%' }}>
            <p>TIME LEFT</p>
          </div>
          <div style={{ width: '15%' }}>
            <p>STUD FEE</p>
          </div>
        </div> */}
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div style={{ width: '10%' }}>
                <img src="images/add.png" style={{ height: '60px', marginRight: '10px' }} />
              </div>
              <div style={{ width: '40%' }}>
                <p>Brown Horse</p>
                <small>Z78 &nbsp;Cross &nbsp;Buterin </small>
              </div>
              <div style={{ width: '20%' }}>
                <p>Running Justice</p>
              </div>
              <div style={{ width: '15%' }}>
                <p>6d 21h 39m</p>
              </div>
              <div style={{ width: '15%' }}>
                <p>
                  $99.75&nbsp; <small>USD</small>{' '}
                </p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>Brown Horse</h5>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '25%' }}>
                  <img src="images/add.png" style={{ height: '160px', marginRight: '10px' }} />
                </div>
                <div style={{ width: '75%' }}>
                  <div style={{ display: 'flex', marginTop: '25px' }}>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>RACES</p>
                      <p>0</p>
                    </div>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>CAREER</p>
                      <p>0/0/0</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', marginTop: '25px' }}>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>WIN RATE</p>
                      <p>0%</p>
                    </div>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>OFFSPRING</p>
                      <p>0 3 of 3 left</p>
                    </div>
                  </div>
                </div>
              </div>
              <BredDetail>
                <div className="bred-detail" style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ width: '50%' }}>
                    <p style={{ marginBottom: '8px' }}>OWNER STABLE</p>
                    <p style={{ marginBottom: '8px' }}>Running Justice</p>
                    <p style={{ marginBottom: '8px' }}>$99.75 USD</p>
                  </div>
                  <div style={{ width: '50%' }}>
                    <p style={{ marginBottom: '8px' }}>OWNER STABLE</p>
                    <p style={{ marginBottom: '8px' }}>Running Justice</p>
                    <p style={{ marginBottom: '8px' }}>$99.75 USD</p>
                  </div>
                </div>
              </BredDetail>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div style={{ width: '10%' }}>
                <img src="images/add.png" style={{ height: '60px', marginRight: '10px' }} />
              </div>
              <div style={{ width: '40%' }}>
                <p>Brown Horse</p>
                <small>Z78 &nbsp;Cross &nbsp;Buterin </small>
              </div>
              <div style={{ width: '20%' }}>
                <p>Running Justice</p>
              </div>
              <div style={{ width: '15%' }}>
                <p>6d 21h 39m</p>
              </div>
              <div style={{ width: '15%' }}>
                <p>
                  $99.75&nbsp; <small>USD</small>{' '}
                </p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <h5 style={{ textAlign: 'center' }}>Brown Horse</h5>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '25%' }}>
                  <img src="images/add.png" style={{ height: '160px', marginRight: '10px' }} />
                </div>
                <div style={{ width: '75%' }}>
                  <div style={{ display: 'flex', marginTop: '25px' }}>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>RACES</p>
                      <p>0</p>
                    </div>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>CAREER</p>
                      <p>0/0/0</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', marginTop: '25px' }}>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>WIN RATE</p>
                      <p>0%</p>
                    </div>
                    <div style={{ width: '50%' }}>
                      <p style={{ marginBottom: '5px' }}>OFFSPRING</p>
                      <p>0 3 of 3 left</p>
                    </div>
                  </div>
                </div>
              </div>
              <BredDetail>
                <div className="bred-detail" style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ width: '50%' }}>
                    <p style={{ marginBottom: '8px' }}>OWNER STABLE</p>
                    <p style={{ marginBottom: '8px' }}>Running Justice</p>
                    <p style={{ marginBottom: '8px' }}>$99.75 USD</p>
                  </div>
                  <div style={{ width: '50%' }}>
                    <p style={{ marginBottom: '8px' }}>OWNER STABLE</p>
                    <p style={{ marginBottom: '8px' }}>Running Justice</p>
                    <p style={{ marginBottom: '8px' }}>$99.75 USD</p>
                  </div>
                </div>
              </BredDetail>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Page>
    </NftProvider>
  )
}

export default Breeding
