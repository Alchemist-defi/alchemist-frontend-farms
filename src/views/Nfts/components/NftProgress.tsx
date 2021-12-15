import React, { useContext } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, OpenNewIcon, Text, Link as UIKitLink, Progress } from '@pancakeswap-libs/uikit'
import { BSC_BLOCK_TIME } from 'config'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import getTimePeriods from 'utils/getTimePeriods'
import formatTimePeriod from 'utils/formatTimePeriod'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const TimeLeft = styled(Heading)`
  margin-bottom: 16px;
  text-align: center;
`

const Link = styled(UIKitLink)`
  text-decoration: underline;
`

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding-top: 16px;
  text-align: center;
`

const ProgressWrap = styled.div`
  margin-bottom: 16px;
`

const NftProgress = () => {
  const { mintedToken } = useContext(NftProviderContext)
  const TranslateString = useI18n()

  return (
    <Card>
      <CardBody>
        <ProgressWrap>
          <Progress primaryStep={429 / 37} />
        </ProgressWrap>

        <InfoRow>
          <Text>{TranslateString(999, "Total NFT's")}:</Text>
          <Text>
            <strong>{429}</strong>
          </Text>
        </InfoRow>
        <InfoRow>
          <Text>{TranslateString(999, "Total NFT's Minted")}:</Text>
          <Text>
            <strong>{mintedToken}</strong>
          </Text>
        </InfoRow>
        {/* <InfoRow>
          <Text>{TranslateString(999, 'Can be traded until')}:</Text>
          <div>
            {!isInitialized ? (
              '...'
            ) : (
              <Link href={`https://bscscan.com/block/${endBlockNumber}`} target="_blank" rel="noreferrer noopener">
                {`Block ${endBlockNumber}`}
                <OpenNewIcon color="primary" ml="2px" />
              </Link>
            )}{' '}
          </div>
        </InfoRow>
        <Message>{TranslateString(999, 'NFTs can be traded in for CAKE until the above block height')}</Message> */}
      </CardBody>
    </Card>
  )
}

export default NftProgress
