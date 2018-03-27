import { web3 } from './uportSetup'

import checkAddressMNID from './checkAddressMNID'
import getShares from './getShares'

const pollingLoop = (address, txHash, response, actions, pendingCB, successCB) => {
  setTimeout(function () {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
      if (response === null) {
        response = { blockNumber: null }
      } // Some nodes do not return pending tx
      waitForMined(address, txHash, response, actions, pendingCB, successCB)
    })
  }, 1000) // check again in one sec.
}

async function waitForMined (address, txHash, response, actions, pendingCB, successCB) {
  if (response.blockNumber) {
    const addr = checkAddressMNID(address)
    getShares(addr, actions)
    successCB()
  } else {
    pendingCB()
    pollingLoop(address, txHash, response, actions, pendingCB, successCB)
  }
}

export default waitForMined
