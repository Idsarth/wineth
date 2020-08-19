import Web3 from "web3";

export const convert = (amount) => {
  try {
    const web3 = new Web3(Web3.givenProvider)
    return web3.utils.toWei(`${amount}`, 'ether')
  } catch (error) {
    console.log(error.toString())
  }
}
