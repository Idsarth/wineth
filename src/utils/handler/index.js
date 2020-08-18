import Web3 from 'web3'

export const convert = (amount) => {
  try {
    const weiValue = Web3.utils.toWei(amount, 'ether')
    console.log(weiValue)
    return Web3.utils.fromWei(weiValue, 'ether')
  } catch (error) {
    console.log(error.toString())
  }
}
