import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const aurumFarms: FarmConfig[] = [
  {
    pid: 0,
    risk: 1,
    lpSymbol: 'AURUM-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xa3c4006d1957A09CF9b94Af683877aBA03DF1eC9',
    },
    tokenSymbol: 'AURUM',
    tokenAddresses: {
      97: '',
      56: '0x49207BAA3a7332F0716788aa57B088D499bcc104',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 1,
    lpSymbol: 'AURUM-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x53960290DA02F57Ed0b89D7ddCD1166d6A5A14Ef',
    },
    tokenSymbol: 'AURUM',
    tokenAddresses: {
      97: '',
      56: '0x49207BAA3a7332F0716788aa57B088D499bcc104',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'MIST-BUSD LP',
    lpAddresses: {
      97: '0xe423a74956adeC975Ad85fc023307Dea80B51E74',
      56: '0x70B968ac7F7860b0DB944A302724aa7fE32E370C',
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '0xB8672B92100e8a25261aB0ae76789D05f66afd47',
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    risk: 5,
    lpSymbol: 'KNIGHT-MIST LP',
    lpAddresses: {
      97: '',
      56: '0xe873ee21415613c4aa8dcade7a6f4da46a03631b',
    },
    tokenSymbol: 'KNIGHT',
    tokenAddresses: {
      97: '',
      56: '0x16c0e0936e1b38ff1f9b8a1e75d8ba29adf87d30',
    },
    quoteTokenSymbol: QuoteToken.MIST,
    quoteTokenAdresses: contracts.mist,
    isCommunity: true,
  },
]

export default aurumFarms
