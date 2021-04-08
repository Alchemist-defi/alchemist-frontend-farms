import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Card, CardHeader, CardBody } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Page from 'components/layout/Page'
import ReferralLink from './components/ReferralLink'
import TotalReferralCount from './components/TotalReferralCount'

const Con = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
`

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Actions = styled.div`
  margin-top: 24px;
`

const StyleHeading = styled(Heading)`
    margin-top: 15px
`

const Referral: React.FC = () => {
    const TranslateString = useI18n()
    const { account } = useWallet()

    return (
        <Page>
            <Con>
                <Heading size="xl" mb="24px">Alchemist&apos;s Guild Friendship Program</Heading>
                <StyledCard>
                    <CardHeader>
                        <Heading size="md">Alchemist party! 🎉  For the first 48 hours, refer friends and earn 10% of their earnings for LIFE ! Note that this will not decrease their rewards.</Heading>
                    </CardHeader>
                    <CardBody>
                        <Actions>
                            {account ? (
                                <div>
                                    <ReferralLink />
                                    <TotalReferralCount />
                                </div>
                            ) : (
                                <div>
                                    <UnlockButton />
                                    <StyleHeading size="md">Unlock wallet to get your unique referral link</StyleHeading>
                                </div>
                            )}
                        </Actions>
                    </CardBody>
                </StyledCard>
            </Con>
        </Page>
    )

}

export default Referral