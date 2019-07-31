<template>
  <section class="section has-text-centered">
    <div class="container">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h2 class="subtitle is-size-6">Decentralized Online Market Place</h2>
    </div>
    <div class="section">
      <button class="button is-medium is-primary" @click="start">
        <strong>START</strong>
      </button>
    </div>
  </section>
</template>

<script>
import web3plugin from '@/web3plugin'
import Vue from 'vue'

export default {
  name: 'Home',
  components: {},
  methods: {
    async start() {
      console.log('Home')

      /// Make this.$web3 and this.$contract available
      /// $web3 would initiate ethereum.enable() if needed
      Vue.use(web3plugin)

      /// Get current user address (coinbase) and auto route to the relevant page
      this.$helpers.initApp(this.$web3, this.$contract, this.$store, this.$router)
    }
  }
}
</script>
