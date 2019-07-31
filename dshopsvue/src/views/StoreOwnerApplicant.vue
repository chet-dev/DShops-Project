<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="section">
    <h1 class="title">Store Owner Applicant</h1>

    <Tabs>
      <Tab name="Store Owner Applicants" :selected="true">
        <button class="button is-primary" @click="toggleAddStoreOwnerApplicantModal">
          APPLY TO BECOME A STORE OWNER
        </button>

        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Address</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in applicants">
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
              <td>
                <span
                  style="width:80px"
                  class="tag is-small"
                  :class="{ 'is-success': item[2] == 2, 'is-warning': item[2] == 1 }"
                  >{{ item[2] == 1 ? 'Applied' : '' }}{{ item[2] == 2 ? 'Approved' : '' }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </Tab>
      <Tab name="Approved Store Owners">
        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Index</th>
              <th>Address</th>
              <th>Name</th>
              <th>Total Storefronts</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in storeOwners">
              <td>
                {{ index }}
              </td>
              <td>{{ item[0] }}</td>
              <td>
                {{ item[1] }}
              </td>
              <td>
                {{ item[2] }}
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
          <p class="modal-card-title">Apply To Become A Store Owner</p>
          <button
            class="delete"
            aria-label="close"
            @click="toggleAddStoreOwnerApplicantModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">The Applicant Address</label>
            <div class="control">
              <input
                v-model="storeOwnerApplicantAddr"
                class="input"
                name="storeOwnerApplicantAddr"
                type="text"
                placeholder="Applicant Account Address"
                readonly
              />
            </div>
          </div>
          <div class="field">
            <label class="label">The Applicant Name</label>
            <div class="control">
              <input
                v-model="storeOwnerApplicantName"
                class="input is-uppercase"
                name="storeOwnerApplicantName"
                type="text"
                placeholder="Applicant Name"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            :disabled="storeOwnerApplicantName.length == 0 || storeOwnerApplicantAddr == 0"
            @click="confirmAddStoreOwnerApplicant"
          >
            Confirm
          </button>
          <button class="button" @click="toggleAddStoreOwnerApplicantModal">Cancel</button>
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
      storeOwnerApplicantAddr: '',
      storeOwnerApplicantName: '',
      applicants: [],
      storeOwners: []
    }
  },
  async mounted() {
    this.storeOwnerApplicantAddr = this.$store.getters.coinbase
    await this.refreshApplicantsList()
    await this.refreshStoreOwnersList()
  },
  methods: {
    async refreshApplicantsList() {
      let tmpApplicants = []
      const count = await this.$contract.methods.getStoreOwnerApplicantsCount().call()
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods.getStoreOwnerApplicantByIndex(i).call()
          tmpApplicants.push(result)
        }
      }
      this.applicants = await Promise.all(tmpApplicants)
    },
    async refreshStoreOwnersList() {
      let tmpStoreOwners = []
      const count = await this.$contract.methods.getStoreOwnersCount().call()
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods.getStoreOwnerByIndex(i).call()
          tmpStoreOwners.push(result)
        }
      }
      this.storeOwners = await Promise.all(tmpStoreOwners)
    },
    toggleAddStoreOwnerApplicantModal() {
      this.modalActive = !this.modalActive
    },
    confirmAddStoreOwnerApplicant() {
      this.toggleAddStoreOwnerApplicantModal()
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .requestToBeStoreOwner(
          this.storeOwnerApplicantAddr,
          this.storeOwnerApplicantName.toUpperCase()
        )
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('requestToBeStoreOwner() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            this.refreshApplicantsList()
            this.storeOwnerApplicantAddr = '' // clear it for modal input
            this.storeOwnerApplicantName = ''
          }
        })
        .on('error', err => {
          console.log('=========================')
          console.log('requestToBeStoreOwner() failed')
          console.error(err)
          console.log('=========================')
          alert('FAILED TO ADD STORE OWNER APPLICANT')
          this.$store.dispatch('setLoadingOff')
          this.storeOwnerApplicantAddr = '' // clear it for modal input
          this.storeOwnerApplicantName = ''
        })
    }
  }
}
</script>
