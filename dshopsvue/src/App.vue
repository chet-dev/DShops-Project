<template>
  <div id="app">
    <section style="padding-right:20px; background-color:black; color:white">
      <div class="container  has-text-right">
        <span class="is-size-7"
          >current selected address : <b>{{ coinbase }}</b></span
        >
      </div>
    </section>
    <Header />
    <router-view :key="$route.fullPath" />
    <Overlay />
  </div>
</template>

<script>
import Overlay from '@/components/Overlay'
import Header from '@/components/Header'
import web3plugin from '@/web3plugin'
import Vue from 'vue'

export default {
  components: {
    Header,
    Overlay
  },
  computed: {
    turnOn() {
      return this.$store.getters.loading
    },
    loadingMessage() {
      return this.$store.getters.loadingMessage
    },
    coinbase() {
      return this.$store.getters.coinbase
    }
  },
  async beforeCreate() {
    console.log('App.vue beforeCreate')
    console.log('current path : ' + this.$route.path)
    if (this.$route.name !== 'home' && this.$web3 === undefined) {
      /// Make this.$web3 and this.$contract available
      /// $web3 would initiate ethereum.enable() if needed
      Vue.use(web3plugin)

      /// Get current user address (coinbase) and auto route to the relevant page
      this.$helpers.initApp(this.$web3, this.$contract, this.$store, this.$router)
    }
  },
  mounted() {
    this.$store.subscribeAction({
      after: async action => {
        if (action.type == 'updateCoinbase') {
          if (
            this.$route.name !== 'home' &&
            this.$web3 != undefined &&
            this.$route != undefined &&
            this.$store != undefined &&
            this.$contract != undefined
          ) {
            const isAdmin = await this.$contract.methods
              .isAdmin(this.$store.getters.coinbase)
              .call()

            /// If user is a store owner then redirect to the store owner page
            const isStoreOwner = await this.$contract.methods
              .isStoreOwner(this.$store.getters.coinbase)
              .call()

            if (isAdmin) this.$router.push(`/admin/${this.$store.getters.coinbase}`)
            else if (isStoreOwner) this.$router.push(`/storeowner/${this.$store.getters.coinbase}`)
            else this.$router.push(`/shopper/${this.$store.getters.coinbase}`)
          }
        }
      }
    })
  }
}
</script>
