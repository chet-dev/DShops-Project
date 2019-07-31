<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content box">
          <p class="title is-4">{{ productName }}</p>
          <p class="subtitle is-6">{{ productCode.replace(/0+$/, '') }}</p>
          <p>
            <span class="title is-5">
              Unit Price : {{ this.$web3.utils.fromWei(price.toString()) }} ETH </span
            ><br />
            <span class="title is-6"
              >Available Quantity : {{ availQty == 0 ? 'SOLD OUT!' : availQty }}</span
            >
          </p>
          <br />
          <div class="field" style="width:90px">
            <div class="control">
              <input v-model.number="buyQty" class="input" type="number" placeholder="Quantity" />
            </div>
          </div>

          <button
            class="button is-primary"
            :disabled="buyQty <= 0 || buyQty > availQty"
            @click="buy"
          >
            BUY NOW
          </button>
          &nbsp;
          <button class="button" @click="returnToPreviousPage">GO BACK</button>
        </div>
      </div>

      <div v-if="infoHash.length > 0" class="content box">
        <div v-show="info.length == 0">
          <span class="is-small has-text-primary"
            >Loading IPFS product information may take a while</span
          >
          <LoopingRhombusesSpinner :animation-duration="2500" :rhombus-size="15" color="purple" />
        </div>
        <div v-show="info.length > 0">{{ info }}</div>
      </div>
      <div v-if="imageHash.length > 0" class="content box">
        <div v-show="!imageReady">
          <span class="is-small has-text-primary">Loading IPFS product image may take a while</span>
          <LoopingRhombusesSpinner :animation-duration="2500" :rhombus-size="15" color="purple" />
        </div>

        <div v-show="imageReady" class="card-image">
          <figure class="image is-4by3">
            <img
              :src="'https://ipfs.io/ipfs/' + imageHash"
              alt="Placeholder image"
              width="200px"
              @load="imageLoaded"
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LoopingRhombusesSpinner } from 'epic-spinners'

export default {
  components: {
    LoopingRhombusesSpinner
  },
  props: {
    productCode: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      productName: '',
      price: 0,
      availQty: 0,
      buyQty: 1,
      infoHash: '',
      imageHash: '',
      info: '',
      imageReady: false
    }
  },
  async mounted() {
    this.imageReady = false
    const productInfo = await this.$contract.methods.getProduct(this.productCode).call()
    this.productName = productInfo[0]
    this.price = productInfo[1]
    this.availQty = productInfo[2]
    this.infoHash = productInfo[4]
    this.imageHash = productInfo[5]
    this.info = ''
    if (this.infoHash.length > 0) {
      try {
        const fetchResult = await fetch(`https://ipfs.io/ipfs/${this.infoHash}`)
        const textFetched = await fetchResult.text()
        this.info = textFetched
      } catch (error) {
        console.error(error)
      }
    }
    console.log('=========================')
    console.log(this.info)
    console.log(`info Hash: ${this.infoHash}`)
    console.log(`image Hash: ${this.imageHash}`)
    console.log('=========================')
  },
  methods: {
    imageLoaded() {
      console.log('image loaded')
      this.imageReady = true
    },
    returnToPreviousPage() {
      this.$router.go(-1)
    },
    buy() {
      const amountToPay = parseInt(this.buyQty) * parseInt(this.price)
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .buyProduct(this.productCode, this.buyQty)
        .send({ from: this.$store.getters.coinbase, value: amountToPay })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('buyProduct() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            alert('THANK YOU FOR YOUR PURCHASE!')
            this.$router.go(-1)
          }
        })
        .on('error', err => {
          console.log('=========================')
          console.log('buyProduct() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO BUY PRODUCT')
          this.$store.dispatch('setLoadingOff')
        })
    }
  }
}
</script>
