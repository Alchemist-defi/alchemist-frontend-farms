import React, { useEffect, Suspense, lazy } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import { useAurumFetchPublicData } from 'state/aurumHooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'

import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'
import Breeding from 'views/Nfts/Breeding'
import MyToken from 'views/Nfts/MyToken'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const NFTs = lazy(() => import('./views/Nfts'))
const Referral = lazy(() => import('./views/Ref/Referral'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()
  useAurumFetchPublicData()

  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ResetCSS />
        <ToastContainer />
        <GlobalStyle />
        <Menu>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>
              <Route path="/nft">
                <NFTs />
              </Route>
              <Route path="/breeding">
                <Breeding />
              </Route>
              <Route path="/my-token">
                <MyToken />
              </Route>
              <Route path="/nests">
                <Farms tokenMode />
              </Route>
              <Route path="/referrals">
                <Referral />
              </Route>
              {/* <Route path="/pools"> */}
              {/*  <Pools /> */}
              {/* </Route> */}
              {/* <Route path="/lottery"> */}
              {/*  <Lottery /> */}
              {/* </Route> */}
              {/* <Route path="/ifo"> */}
              {/*  <Ifos /> */}
              {/* </Route> */}
              {/* <Route path="/nft"> */}
              {/*  <Nft /> */}
              {/* </Route> */}
              {/* Redirect */}
              {/* <Route path="/staking"> */}
              {/*  <Redirect to="/pools" /> */}
              {/* </Route> */}
              {/* <Route path="/syrup"> */}
              {/*  <Redirect to="/pools" /> */}
              {/* </Route> */}
              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Menu>
        <NftGlobalNotification />
      </QueryParamProvider>
    </Router>
  )
}

export default React.memo(App)
