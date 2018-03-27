import SharesContract from '../utilities/SharesContract'

async function getShares (addr, actions) {
  actions.getCurrentSharesREQUEST()
  SharesContract.getShares
    .call(addr, (error, sharesNumber) => {
      if (error) {
        actions.getCurrentSharesERROR(error)
        throw error
      }
      const sharesNumberDecoded = sharesNumber.toNumber()
      actions.getCurrentSharesSUCCESS(sharesNumberDecoded)
      return sharesNumberDecoded
    })
}

export default getShares
