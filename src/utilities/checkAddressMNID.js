const mnid = require('mnid')

function checkAddressMNID (addr) {
  if (mnid.isMNID(addr)) {
    return mnid.decode(addr).address
  } else {
    return addr
  }
}

export default checkAddressMNID
