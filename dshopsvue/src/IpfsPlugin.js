import IPFS from 'ipfs-http-client'
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
export default {
  install: function(Vue, name = '$ipfs') {
    Object.defineProperty(Vue.prototype, name, { value: ipfs })
  }
}
