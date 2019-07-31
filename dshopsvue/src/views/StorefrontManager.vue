<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="section">
    <h1 class="title">Storefront Manager</h1>
    <p class="title is-4">{{ storefrontName }}</p>
    <p class="title is-5">Balance : {{ this.$web3.utils.fromWei(balance.toString()) }} ETH</p>
    <Tabs>
      <Tab name="Products" :selected="true">
        <button class="button is-primary" @click="toggleAddProductModal(1)">
          ADD PRODUCT
        </button>
        &nbsp;
        <button class="button is-primary" @click="withdrawBalance">
          WITHDRAW BALANCE
        </button>
        &nbsp;
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
                <button class="button is-primary" @click="removeProduct(item[0])">
                  REMOVE
                </button>
                &nbsp;
                <button class="button is-primary" @click="toggleEditProductModal(item)">
                  EDIT
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

    <div class="modal" :class="{ 'is-active': modalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Product</p>
          <button class="delete" aria-label="close" @click="toggleAddProductModal(0)"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Product Code</label>
            <div class="control">
              {{ generatedProductCode }}
            </div>
          </div>
          <div class="field">
            <label class="label">Product Name</label>
            <div class="control">
              <input
                v-model="productForm.name"
                class="input is-uppercase"
                name="name"
                type="text"
                placeholder="Product Name"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Unit Price ETH</label>
            <div class="control">
              <input
                v-model="productForm.price"
                class="input"
                name="price"
                type="number"
                placeholder="Unit Price ETH"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Available Quantity</label>
            <div class="control">
              <input
                v-model="productForm.availQty"
                class="input"
                name="availQty"
                type="number"
                placeholder="Available Quantity"
              />
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <textarea
                v-model="productForm.info"
                placeholder="Product Info"
                class="textarea"
                name="info"
                rows="9"
              ></textarea>
            </div>
            <div class="column is-two-fifths">
              <div class="uploadImage">
                <ImageUpload :key="imageKey" v-model="imageFile" />
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            :disabled="
              productForm.name.length == 0 || productForm.price <= 0 || productForm.availQty <= 0
            "
            @click="confirmAddProduct"
          >
            Confirm
          </button>
          <button class="button" @click="toggleAddProductModal(0)">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': modal2Active }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Product</p>
          <button class="delete" aria-label="close" @click="toggleEditProductModal(null)"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Product Code</label>
            <div class="control">
              {{ productEditForm.productCode }}
              <input
                :class="productEditForm.productCode"
                class="input"
                name="name"
                type="hidden"
                placeholder="String"
                readonly
                disabled
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Product Name</label>
            <div class="control">
              <input
                v-model="productEditForm.name"
                class="input is-uppercase"
                name="name"
                type="text"
                placeholder="String"
                readonly
                disabled
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Unit Price</label>
            <div class="control">
              <input
                v-model="productEditForm.price"
                class="input"
                name="price"
                type="number"
                placeholder="Number"
                readonly
                disabled
              />
            </div>
          </div>
          <div class="field">
            <label class="label">New Unit Price</label>
            <div class="control">
              <input
                v-model="productEditForm.newPrice"
                class="input"
                name="price"
                type="number"
                placeholder="Number"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Available Quantity</label>
            <div class="control">
              <input
                v-model="productEditForm.availQty"
                class="input"
                name="availQty"
                type="number"
                placeholder="Number"
                readonly
                disabled
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            :disabled="productEditForm.newPrice <= 0"
            @click="updateProduct"
          >
            Confirm
          </button>
          <button class="button" @click="toggleEditProductModal(null)">Cancel</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import ImageUpload from '@/components/ImageUpload.vue'
export default {
  components: {
    Tabs,
    Tab,
    ImageUpload
  },
  props: {
    uniqueId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      imageKey: 0,
      modalActive: false,
      modal2Active: false,
      productForm: {
        storefrontUniqueId: this.uniqueId,
        productCode: this.generatedProductCode,
        name: '',
        price: 0,
        availQty: 0,
        info: ''
      },
      productEditForm: {
        productCode: '',
        name: '',
        price: 0,
        availQty: 0,
        newPrice: 0
      },
      products: [],
      storefrontName: '',
      balance: 0,
      imageFile: null,
      infoHash: '',
      imageHash: ''
    }
  },
  computed: {
    generatedProductCode() {
      const productCodeInHex = this.$web3.utils.asciiToHex(this.productForm.name)
      return productCodeInHex
    },
    showImageFile() {
      return this.imageFile
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
    toggleAddProductModal(flag) {
      this.modalActive = !this.modalActive
      if (flag === 0) {
        // cancel button clicked
        this.clearAddProductForm()
      } else {
        this.imageKey++
      }
    },
    toggleEditProductModal(product) {
      if (product !== null) {
        this.productEditForm.productCode = product[0]
        this.productEditForm.name = product[1]
        this.productEditForm.price = this.$web3.utils.fromWei(product[2].toString(), 'ether')
        this.productEditForm.availQty = product[3].toString()
        // console.log(product[3].toString())
      }
      this.modal2Active = !this.modal2Active
    },
    clearAddProductForm() {
      this.productForm.name = ''
      this.productForm.price = 0
      this.productForm.availQty = 0
      this.productForm.info = ''
      this.imageFile = null
      this.infoHash = ''
      this.imageHash = ''
    },
    async confirmAddProduct() {
      this.toggleAddProductModal()
      this.$store.dispatch('setLoadingOn', 'Saving to IPFS...')

      if (this.productForm.info.length > 0) {
        console.log('=========================')
        console.log('attempt to store info to ipfs....')
        this.$store.dispatch('setLoadingOn', 'Saving data to IPFS...')
        const content = Buffer.from(this.productForm.info)
        const result = await this.$ipfs.add(content)
        this.infoHash = result[0].hash
        console.log('ipfs.add info successful')
        console.log(`${this.infoHash}`)
        console.log('=========================')
      } else this.infoHash = ''

      if (this.imageFile != null) {
        console.log('=========================')
        console.log('attempt to store image to ipfs....')
        this.$store.dispatch('setLoadingOn', 'Saving data to IPFS...')
        const result = await this.$ipfs.add(this.imageFile)
        this.imageHash = result[0].hash
        console.log('ipfs.add image successful')
        console.log(`${this.imageHash}`)
        console.log('=========================')
      } else this.imageHash = ''

      const tmp = this.$web3.utils.asciiToHex(this.productForm.name)

      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .createProduct(
          this.productForm.storefrontUniqueId,
          this.$web3.utils.asciiToHex(this.productForm.name),
          this.productForm.name.toUpperCase(),
          this.$web3.utils.toWei(this.productForm.price, 'ether'),
          parseInt(this.productForm.availQty),
          this.infoHash,
          this.imageHash
        )
        .send({ from: this.$store.getters.coinbase })
        // .on('confirmation', (confirmationNumber, receipt) => {
        //   if (confirmationNumber == 1) {
        //     console.log('=========================')
        //     console.log('createProduct() successful')
        //     console.log(receipt)
        //     console.log('=========================')
        //     this.$store.dispatch('setLoadingOff')
        //     this.refreshProductsList()
        //     this.clearAddProductForm()
        //   }
        // })
        .on('error', err => {
          console.log('=========================')
          console.log('createProduct() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO ADD PRODUCT')
          this.$store.dispatch('setLoadingOff')
          this.clearAddProductForm()
        })

      let x = this
      this.$contract.once(
        'LogCreateProduct',
        {
          filter: { productCode: tmp },
          fromBlock: 0
        },
        function(error, event) {
          if (event.returnValues.productCode === tmp) {
            console.log('=========================')
            console.log('createProduct() successful')
            console.log(event)
            console.log('=========================')
            x.$store.dispatch('setLoadingOff')
            x.refreshProductsList()
            x.clearAddProductForm()
          } else console.error(error)
        }
      )
    },
    removeProduct(productCodeToRemove) {
      if (confirm('Confirm to remove product?')) {
        console.log(`remove product ... ${productCodeToRemove}`)

        const tmp = productCodeToRemove

        this.$store.dispatch('setLoadingOn')
        this.$contract.methods
          .deleteProduct(productCodeToRemove)
          .send({ from: this.$store.getters.coinbase })
          // .on('confirmation', (confirmationNumber, receipt) => {
          //   if (confirmationNumber == 1) {
          //     console.log('=========================')
          //     console.log('removeProduct() successful')
          //     console.log(receipt)
          //     console.log('=========================')
          //     this.$store.dispatch('setLoadingOff')
          //     this.refreshProductsList()
          //   }
          // })
          .on('error', err => {
            console.log('=========================')
            console.log('removeProduct() failed')
            console.error(err)
            console.log('=========================')
            alert('FAILED TO REMOVE PRODUCT')
            this.$store.dispatch('setLoadingOff')
          })
        let x = this

        this.$contract.once(
          'LogDeleteProduct',
          {
            filter: { productCode: tmp },
            fromBlock: 0
          },
          function(error, event) {
            if (event.returnValues.productCode === tmp) {
              console.log('=========================')
              console.log('deleteProduct() successful')
              console.log(event)
              console.log('=========================')
              x.$store.dispatch('setLoadingOff')
              x.refreshProductsList()
            } else console.error(error)
          }
        )
      }
    },
    updateProduct() {
      console.log(`update product... ${this.productEditForm.productCode}`)
      this.modal2Active = false
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .updateProductPrice(
          this.productEditForm.productCode,
          this.$web3.utils.toWei(this.productEditForm.newPrice, 'ether')
        )
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('updateProductPrice() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            this.refreshProductsList()
          }
        })
        .on('error', err => {
          console.log('=========================')
          console.log('removeProductPrice() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO UPDATE PRODUCT')
          this.$store.dispatch('setLoadingOff')
        })
    },
    withdrawBalance() {
      if (confirm('Confirm to withdraw balance?')) {
        console.log('withdraw balance...')
        console.log(this.uniqueId)
        if (this.balance <= 0) {
          alert('WITHDRAWAL FAILED. THE STOREFRONT HAS ZERO BALANCE')
        } else {
          this.$store.dispatch('setLoadingOn')
          this.$contract.methods
            .withdrawBalanceFromStorefront(this.uniqueId)
            .send({ from: this.$store.getters.coinbase })
            .on('confirmation', (confirmationNumber, receipt) => {
              if (confirmationNumber == 1) {
                console.log('=========================')
                console.log('withdrawBalanceFromStorefront() successful')
                console.log(receipt)
                console.log('=========================')
                this.$store.dispatch('setLoadingOff')
                this.updateStorefrontInfo()
              }
            })
            .on('error', err => {
              console.log('=========================')
              console.log('withdrawBalanceFromStorefront() failed')
              console.error(err)
              console.log('=========================')
              alert('ERROR OCCURED. FAILED TO WITHDRAW BALANCE')
              this.$store.dispatch('setLoadingOff')
            })
        }
      }
    }
  }
}
</script>
