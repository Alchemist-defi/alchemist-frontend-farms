import React, { useState, useEffect, useContext } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/stakingNft'
import NftCard from './NftCard'
import styled from 'styled-components'

import { BaseLayout, Heading } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import NftGrid from './NftGrid'
import Pagination from 'react-responsive-pagination'
import Form from 'react-bootstrap/Form'
import { NftProviderContext } from '../contexts/NftProvider'
import { stakingNFTAddress, tokenContractAddress, nftTokenAddress } from '../../../config/constants/stakingNft'

const StyledHero = styled.div`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const NftList = () => {
  const [page, setPage] = useState(1)
  const [loadingData, setLoadingData] = useState(true)
  const [sizePerPage, setSizePerPage] = useState(9)
  const [nftData, setNftData] = useState([])
  const { userNftToken, getOwnerOfToken } = useContext(NftProviderContext)
  const [totalData, setTotalData] = useState([])

  const getOwner = async (tokenId) => {
    try {
      const tokenOwner = await getOwnerOfToken(tokenId)
      return tokenOwner == stakingNFTAddress || tokenOwner == false ? true : false
    } catch (error) {
      return true
    }
  }

  const [totalPage, setTotalPage] = useState(nfts.length / sizePerPage)

  // const totalPage = nfts.length / sizePerPage

  const [Level, setLevel] = useState('')
  const [Breed, setBreed] = useState('')
  const [Claw, setClaw] = useState('')
  const [Wingspan, setWingspan] = useState('')
  const [Sight, setSight] = useState('')

  useEffect(() => {
    const setData = async () => {
      setNftData([])
      setLoadingData(true)
      let mainData = nfts
      mainData = mainData.filter((e) => e.level == '1' || e.level == '2')

      const getCheckedData = await checkDataAndSet(mainData)
      setTotalData(getCheckedData)
      let data = getCheckedData.slice((page - 1) * sizePerPage, (page - 1) * sizePerPage + sizePerPage)
      setNftData(data)
      setTotalPage(Math.floor(getCheckedData.length / sizePerPage))
      setLoadingData(false)
    }
    setData()
  }, [])

  useEffect(() => {
    if (totalData.length > 0) {
      setLoadingData(true)
      setNftData([])

      let mainD = []
      mainD = totalData

      if (Level && Level != '') {
        mainD = mainD.filter((e) => e.level == Level)
      }
      if (Breed && Breed != '') {
        mainD = mainD.filter((e) => e.breed == Breed)
      }
      if (Claw && Claw != '') {
        mainD = mainD.filter((e) => e.claw == Claw)
      }
      if (Wingspan && Wingspan != '') {
        mainD = mainD.filter((e) => e.wingspan == Wingspan)
      }
      if (Sight && Sight != '') {
        mainD = mainD.filter((e) => e.sight == Sight)
      }

      let data = mainD.slice((page - 1) * sizePerPage, (page - 1) * sizePerPage + sizePerPage)
      setNftData(data)
      setTotalPage(Math.floor(mainD.length / sizePerPage))
      setLoadingData(false)
    }
  }, [page, Level, Breed, Claw, Wingspan, Sight])

  const checkDataAndSet = async (data) => {
    let sendData = []
    for (const element of data) {
      const checkTokenOwner = await getOwner(element.tokenId)
      if (checkTokenOwner) {
        sendData.push(element)
      }
    }
    return sendData
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-12 col-md-2 mb-2">
          <Form.Select
            aria-label="Default select example"
            value={Level}
            id="as"
            onChange={(e) => {
              setLevel(e.target.value)
            }}
          >
            <option value={0}>Level</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            {/* <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option> */}
          </Form.Select>
        </div>
        <div className="col-12 col-md-2 mb-2">
          <Form.Select
            aria-label="Default select example"
            value={Breed}
            id="asads"
            onChange={(e) => {
              setBreed(e.target.value)
            }}
          >
            <option value={''}>Breed</option>
            <option value={0}>Phoenix Owl</option>
            <option value={1}>Barn Owl</option>
            <option value={2}>Eagle Owl</option>
            <option value={3}>Screech Owl</option>
          </Form.Select>
        </div>

        <div className="col-12 col-md-2 mb-2">
          <Form.Select
            aria-label="Default select example"
            value={Claw}
            id="asdasd"
            onChange={(e) => {
              setClaw(e.target.value)
            }}
          >
            <option value="">Claw Size</option>
            <option value="LEGENDARY">LEGENDARY</option>
            <option value="AVERAGE">AVERAGE</option>
            <option value="MYSTICAL">MYSTICAL</option>
          </Form.Select>
        </div>

        <div className="col-12 col-md-2 mb-2">
          <Form.Select
            aria-label="Default select example"
            value={Wingspan}
            id="saddas"
            onChange={(e) => {
              setWingspan(e.target.value)
            }}
          >
            <option value="">Wingspan</option>
            <option value="LEGENDARY">LEGENDARY</option>
            <option value="AVERAGE">AVERAGE</option>
            <option value="MYSTICAL">MYSTICAL</option>
          </Form.Select>
        </div>

        <div className="col-12 col-md-2 mb-2">
          <Form.Select
            aria-label="Default select example"
            value={Sight}
            id="adsas"
            onChange={(e) => {
              setSight(e.target.value)
            }}
          >
            <option value="">Sight</option>
            <option value="LEGENDARY">LEGENDARY</option>
            <option value="AVERAGE">AVERAGE</option>
            <option value="MYSTICAL">MYSTICAL</option>
          </Form.Select>
        </div>
      </div>
      {loadingData ? (
        <Page>
          <StyledHero>
            <Heading as="h2" size="lg" color="secondary">
              Loading....
            </Heading>
          </StyledHero>
        </Page>
      ) : nftData.length > 0 ? (
        <>
          <div className="row mt-4">
            <div className="col-12 col-md-12 mb-12">
              <NftGrid>
                {nftData.length > 0
                  ? nftData.map((element, index) => (
                      <div key={index}>
                        <NftCard nft={element} index={index} type="ALL" />
                      </div>
                    ))
                  : ''}
              </NftGrid>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-12 mb-12">
              <Pagination current={page} total={totalPage + 1} onPageChange={setPage} />
            </div>
          </div>
        </>
      ) : (
        <Page>
          <StyledHero>
            <Heading as="h2" size="lg" color="secondary">
              All Owls are staked
            </Heading>
          </StyledHero>
        </Page>
      )}
    </>
  )
}

export default NftList
