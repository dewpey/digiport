import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('uPort Demo', {
  clientId: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
  signer: SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')
})

const web3 = uport.getWeb3()
export { web3, uport }
