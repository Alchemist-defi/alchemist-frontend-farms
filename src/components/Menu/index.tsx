import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import { usePriceAurumBusd } from 'state/aurumHooks'
import config from './config'


const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  // const cakePriceUsd = usePriceCakeBusd()
  const mistPriceUsd = usePriceCakeBusd()
  const aurumPriceUsd = usePriceAurumBusd()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      aurumPriceUsd={aurumPriceUsd.toNumber()}
      mistPriceUsd={mistPriceUsd.toNumber()}
      links={config}
      mistPriceLink="https://charts.bogged.finance/?token=0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f"
      aurumPriceLink="https://charts.bogged.finance/?token=0x49207BAA3a7332F0716788aa57B088D499bcc104"
      {...props}
    />
  )
}

export default Menu
