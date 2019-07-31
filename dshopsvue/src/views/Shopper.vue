<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="section">
    <h1 class="title">Shopper</h1>

    <Tabs>
      <Tab name="Products" :selected="true">
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
                {{ item[6] }}
              </td>
              <td>{{ item[3] }}</td>
            </tr>
          </tbody>
        </table>
      </Tab>
      <Tab name="Storefronts">
        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Action</th>
              <th>Storefront Name</th>
              <th>Store Owner</th>
              <th>Total Products</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in storefronts">
              <td>
                <button class="button is-primary" @click="gotoStorefront(item[0])">
                  VIEW
                </button>
              </td>
              <td>{{ item[1] }}</td>
              <td>
                {{ $helpers.simplify(item[2]) }}
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
  data() {
    return {
      products: [],
      storefronts: []
    }
  },
  async mounted() {
    await this.refreshProductsList()
    await this.refreshStorefrontsList()
  },
  methods: {
    async refreshProductsList() {
      let tmpProducts = []
      const count = await this.$contract.methods.getProductsCount().call()
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods.getProductByIndex(i).call()
          const newResult = [
            result[0],
            result[1],
            result[2],
            result[3],
            result[4],
            result[5],
            this.$web3.utils.fromWei(result[2].toString(), 'ether')
          ]
          tmpProducts.push(newResult)
        }
      }
      this.products = await Promise.all(tmpProducts)
    },
    async refreshStorefrontsList() {
      let tmpStorefronts = []
      const count = await this.$contract.methods.getStorefrontsCount().call()
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods.getStorefrontByIndex(i).call()
          tmpStorefronts.push(result)
        }
      }
      this.storefronts = await Promise.all(tmpStorefronts)
    },
    gotoProduct(productCode) {
      this.$router.push({ name: 'product', params: { productCode } })
    },
    gotoStorefront(uniqueId) {
      this.$router.push({ name: 'storefront', params: { uniqueId } })
    }
  }
}
</script>
