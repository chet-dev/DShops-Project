<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="section">
    <h1 class="title">Storefront</h1>
    <p class="title is-4">{{ storefrontName }}</p>
    <Tabs>
      <Tab name="Products" :selected="true">
        <button class="button" @click="$router.go(-1)">GO BACK</button>
        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Action</th>
              <th>Product Name</th>
              <th>Unit Price ETH</th>
              <th>Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in products">
              <td>
                <button class="button is-primary" @click="gotoProduct(item[0])">
                  VIEW
                </button>
              </td>
              <td>{{ item[1] }}</td>
              <td>
                {{ item[4] }}
              </td>
              <td>
                {{ item[3] }}
              </td>
            </tr>
          </tbody>
        </table>
      </Tab>
    </Tabs>
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
    uniqueId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      products: [],
      storefrontName: ''
    }
  },
  async mounted() {
    await this.updateStorefrontInfo()
    await this.refreshProductsList()
  },
  methods: {
    async updateStorefrontInfo() {
      const storefrontInfo = await this.$contract.methods
        .getStorefront(this.uniqueId)
        .call({ from: this.$store.getters.coinbase })
      this.storefrontName = storefrontInfo[0]
      this.balance = storefrontInfo[4]
    },
    async refreshProductsList() {
      let tmpProducts = []
      const storefrontInfo = await this.$contract.methods.getStorefront(this.uniqueId).call()
      const count = storefrontInfo[2]
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods
            .getProductForStorefrontByIndex(this.uniqueId, i)
            .call()
          const newResult = [
            result[0],
            result[1],
            result[2],
            result[3],
            this.$web3.utils.fromWei(result[2].toString())
          ]
          tmpProducts.push(newResult)
        }
      }
      this.products = await Promise.all(tmpProducts)
    },
    gotoProduct(productCode) {
      this.$router.push({ name: 'product', params: { productCode } })
    }
  }
}
</script>
