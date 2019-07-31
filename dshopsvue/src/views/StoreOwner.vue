<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="section">
    <h1 class="title">Store Owner</h1>
    <p class="title is-4">{{ storeOwnerName }}</p>

    <Tabs>
      <Tab name="Storefronts" :selected="true">
        <button class="button is-primary" @click="toggleAddStorefrontModal(0)">
          ADD STOREFRONT
        </button>

        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Action</th>
              <th>Storefront Name</th>
              <th>Unique ID</th>
              <th>Total Products</th>
              <th>Balance ETH</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in storefronts">
              <td>
                <button class="button is-primary" @click="gotoStorefront(item[1])">
                  MANAGE
                </button>
              </td>
              <td>{{ item[0] }}</td>
              <td>
                {{ $helpers.simplify(item[1]) }}
              </td>
              <td>
                {{ item[2] }}
              </td>
              <td>{{ item[4] }}</td>
            </tr>
          </tbody>
        </table>
      </Tab>
    </Tabs>

    <div class="modal" :class="{ 'is-active': modalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Storefont</p>
          <button class="delete" aria-label="close" @click="toggleAddStorefrontModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Storefront Name</label>
            <div class="control">
              <input
                v-model="storefrontName"
                class="input is-uppercase"
                name="storefrontName"
                type="text"
                placeholder="Storefront Name"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            :disabled="storefrontName.length == 0"
            @click="confirmAddStorefront"
          >
            Confirm
          </button>
          <button class="button" @click="toggleAddStorefrontModal">Cancel</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

export default {
  components: {
    Tabs,
    Tab
  },
  props: {
    address: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      modalActive: false,
      storefrontName: '',
      storefronts: [],
      storeOwnerName: ''
    }
  },
  async beforeCreate() {
    const coinbase = await this.$web3.eth.getAccounts()
    const storeOwnerInfo = await this.$contract.methods.getStoreOwner(coinbase[0]).call()
    this.storeOwnerName = storeOwnerInfo[1]

    await this.refreshStorefrontsList()
  },
  methods: {
    async refreshStorefrontsList() {
      let tmpStorefronts = []
      const count = await this.$contract.methods
        .getStorefrontsCountForStoreOwner(this.$store.getters.coinbase)
        .call()
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods
            .getStorefrontForStoreOwnerByIndex(this.$store.getters.coinbase, i)
            .call({ from: this.$store.getters.coinbase })
          const newResult = [
            result[0],
            result[1],
            result[2],
            result[3],
            this.$web3.utils.fromWei(result[3].toString())
          ]
          tmpStorefronts.push(newResult)
        }
      }
      this.storefronts = await Promise.all(tmpStorefronts)
    },
    toggleAddStorefrontModal(flag) {
      this.modalActive = !this.modalActive
      if (flag === 0) {
        this.storefrontName = ''
      }
    },
    confirmAddStorefront() {
      this.toggleAddStorefrontModal()
      this.$store.dispatch('setLoadingOn')

      this.$contract.methods
        .createStorefront(this.storefrontName.toUpperCase())
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('createStorefront() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            this.refreshStorefrontsList()
            this.storefrontName = '' // clear it for modal input
          }
        })
        .on('error', err => {
          console.log('=========================')
          console.log('createStorefront() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO ADD STOREFRONT')
          this.$store.dispatch('setLoadingOff')
        })
    },
    gotoStorefront(uniqueId) {
      this.$router.push({ name: 'storefrontmanager', params: { uniqueId } })
    }
  }
}
</script>
