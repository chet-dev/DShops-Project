import Web3 from 'web3'
import contract from '@/DShops.abi.js'

export default {
  install: function(Vue, web3Name = '$web3', contractName = '$contract') {
    let currentWeb3 = null
    let contractInstance = null

    if (window.ethereum) {
      /// Modern dapp browsers
      currentWeb3 = new Web3(window.ethereum)
      window.ethereum
        .enable()
        .then(accounts => {
          console.log(`web3plugin`)
          console.log(`window.ethereum.enable()`)
          console.log(`${accounts}`)
        })
        .catch(e => console.error(e))
    } else if (window.web3) {
      /// Legacy dapp browsers
      currentWeb3 = new Web3(window.web3.currentProvider)
      console.log(`web3plugin`)
      console.log('web3.currentProvider')
    } else {
      /// Other browsers
      console.log(`web3plugin`)
      console.log('Your browser is not dapp compatible. Please consider using MetaMask')
    }
    if (currentWeb3 !== null) {
      // currentWeb3.eth
      //   .getCoinbase()
      //   .then(result => {
      //     Object.defineProperty(Vue.prototype, '$coinbase', { value: result })
      //   })
      //   .catch(err => {
      //     console.error(err)
      //     Object.defineProperty(Vue.prototype, '$coinbase', { value: null })
      //   })
      contractInstance = currentWeb3.eth.Contract(contract.abi, contract.address)
    }

    Object.defineProperty(Vue.prototype, web3Name, { value: currentWeb3 })
    Object.defineProperty(Vue.prototype, contractName, { value: contractInstance })
  }
}
