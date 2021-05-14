import farmsConfig from './farms'
import aurumFarmsConfig from './aurumFarms'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)

export { farmsConfig, communityFarms, aurumFarmsConfig }
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'
