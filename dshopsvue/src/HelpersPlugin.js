const Helpers = {
  simplify: function(hexString) {
    if (hexString.length >= 9) {
      const s1 = hexString.substring(0, 6)
      const s2 = hexString.substring(hexString.length - 4, hexString.length)
      return s1 + '...' + s2
    } else return hexString
  },
  initApp: async function(web3, contract, store, router) {
    console.log('initApp')
    let coinbase = await web3.eth.getCoinbase()
    while (coinbase == null) {
      /// Get and Update Coinbase
      coinbase = await web3.eth.getCoinbase()
    }
    store.dispatch('updateCoinbase', coinbase)

    /// If user is an admin then redirect to the admin page
    const isAdmin = await contract.methods.isAdmin(coinbase).call()

    /// If user is a store owner then redirect to the store owner page
    const isStoreOwner = await contract.methods.isStoreOwner(coinbase).call()

    store.dispatch('setLoadingOn')
    setTimeout(() => {
      store.dispatch('setLoadingOff')
      if (isAdmin) router.push(`/admin/${coinbase}`)
      else if (isStoreOwner) router.push(`/storeowner/${coinbase}`)
      else router.push(`/shopper/${coinbase}`)
    }, 1000) /// slow down 1 seconds for animated spinner to look right
  }
}

export default {
  install: function(Vue, name = '$helpers') {
    Object.defineProperty(Vue.prototype, name, { value: Helpers })
  }
}
