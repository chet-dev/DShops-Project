<template>
  <section class="section">
    <h1 class="title">Circuit Breaker</h1>
    <h2>Only contract owner can pause or unpause the contract</h2>
    <br />
    <button class="button is-danger" @click="pause()">PAUSE</button>&nbsp;<button
      class="button is-success"
      @click="unpause()"
    >
      UNPAUSE
    </button>
    &nbsp;
    <button class="button" @click="$router.go(-1)">GO BACK</button>
    <br /><br />
    <p>
      The contract is currently <b>{{ paused ? 'paused' : 'unpaused' }}</b>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    address: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      paused: false
    }
  },
  mounted() {
    this.updateStatus()
  },
  methods: {
    pause() {
      console.log('pause...')
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .pause()
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('pause() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            alert('THE CONTRACT IS PAUSED NOW')
            this.updateStatus()
          }
        })
        .on('error', err => {
          console.log('=========================')
          console.log('pause() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO PAUSE CONTRACT')
          this.$store.dispatch('setLoadingOff')
        })
    },
    unpause() {
      console.log('unpause...')
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .unpause()
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('unpause() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            alert('THE CONTRACT IS UNPAUSED NOW')
            this.updateStatus()
          }
        })
        .on('error', err => {
          console.log('=========================')
          console.log('unpause() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO UNPAUSE CONTRACT')
          this.$store.dispatch('setLoadingOff')
        })
    },
    async updateStatus() {
      const result = await this.$contract.methods
        .paused()
        .call({ from: this.$store.getters.coinbase })
      this.paused = result
    }
  }
}
</script>
