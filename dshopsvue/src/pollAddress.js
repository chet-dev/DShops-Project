import Web3 from 'web3'
import store from '@/store'
//import { promised } from 'q'

if (window.web3 !== undefined) {
  let xweb3 = window.web3
  const cweb3 = new Web3(xweb3.currentProvider)
  cweb3.currentProvider.connection.publicConfigStore.on(
    'update',
    // eslint-disable-next-line no-unused-vars
    ({ selectedAddress, networkVersion }) => {
      const addressInStorage = store.state.coinbase
      if (selectedAddress != addressInStorage) {
        store.dispatch('updateCoinbase', selectedAddress)
        // console.log(`selected address : ${store.state.coinbase}`)
        // console.log(`network id : ${networkVersion}`)
      }
    }
  )
}
