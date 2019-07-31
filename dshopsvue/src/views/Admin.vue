<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="section">
    <h1 class="title">Admin</h1>

    <Tabs>
      <Tab name="Store Owner Applicants" :selected="true">
        <button class="button is-primary" @click="toggleAddStoreOwnerApplicantModal(0)">
          ADD APPLICANT
        </button>
        &nbsp;
        <button class="button is-danger" @click="gotoCircuitBreaker">
          CIRCUIT BREAKER
        </button>
        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Action</th>
              <th>Address</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in applicants">
              <td>
                <button
                  v-if="item[2] == 1"
                  class="button is-primary"
                  @click="approveApplicant(item[0])"
                >
                  APPROVE
                </button>
              </td>
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
      <Tab name="Administrators">
        <button class="button is-primary" @click="toggleAssignAdminRoleModal(0)">
          ASSIGN ADMIN ROLE
        </button>
        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Index</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <tr v-for="(item, index) in admins">
              <td>
                {{ index }}
              </td>
              <td>{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </Tab>
    </Tabs>

    <div class="modal" :class="{ 'is-active': modalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Store Owner Applicant</p>
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
            :disabled="storeOwnerApplicantName.length == 0 || storeOwnerApplicantAddr.length == 0"
            @click="confirmAddStoreOwnerApplicant"
          >
            Confirm
          </button>
          <button class="button" @click="toggleAddStoreOwnerApplicantModal()">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': modalActive2 }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Assign Admin Role</p>
          <button class="delete" aria-label="close" @click="toggleAssignAdminRoleModal(0)"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Assign Admin Role To User</label>
            <div class="control">
              <input
                v-model="newAdminAddr"
                class="input"
                name="newAdminAddr"
                type="text"
                placeholder="User Address"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            :disabled="newAdminAddr.length == 0"
            @click="confirmAssignAdminRole"
          >
            Confirm
          </button>
          <button class="button" @click="toggleAssignAdminRoleModal(0)">Cancel</button>
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
      modalActive2: false,
      storeOwnerApplicantAddr: '',
      storeOwnerApplicantName: '',
      newAdminAddr: '',
      applicants: [],
      storeOwners: [],
      admins: []
    }
  },
  async mounted() {
    await this.refreshApplicantsList()
    await this.refreshStoreOwnersList()
    await this.refreshAdminsList()
  },
  methods: {
    gotoCircuitBreaker() {
      this.$router.push(`/circuitbreaker/${this.$store.getters.coinbase}`)
    },
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
    async refreshAdminsList() {
      let tmpAdmins = []
      const count = await this.$contract.methods.getAdminsCount().call()
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const result = await this.$contract.methods.getAdminByIndex(i).call()
          tmpAdmins.push(result)
        }
      }
      this.admins = await Promise.all(tmpAdmins)
    },
    approveApplicant(applicantAddr) {
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .approveStoreOwner(applicantAddr)
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('approveStoreOwner() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            this.refreshStoreOwnersList()
            this.refreshApplicantsList()
          }
        })
        .on('error', error => {
          console.log('=========================')
          console.log('approveStoreOwner() failed')
          console.error(error)
          console.log('=========================')
          alert('FAILED TO APPROVE APPLICANT TO BECOME STORE OWNER')
          this.$store.dispatch('setLoadingOff')
        })
    },
    toggleAddStoreOwnerApplicantModal(flag) {
      this.modalActive = !this.modalActive
      if (flag === 0) {
        this.storeOwnerApplicantAddr = ''
        this.storeOwnerApplicantName = ''
      }
    },
    toggleAssignAdminRoleModal(flag) {
      this.modalActive2 = !this.modalActive2
      if (flag === 0) {
        this.newAdminAddr = ''
      }
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
    },
    confirmAssignAdminRole() {
      this.toggleAssignAdminRoleModal()
      this.$store.dispatch('setLoadingOn')
      this.$contract.methods
        .assignUserAsAdmin(this.newAdminAddr)
        .send({ from: this.$store.getters.coinbase })
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            console.log('=========================')
            console.log('assignUserAsAdmin() successful')
            console.log(receipt)
            console.log('=========================')
            this.$store.dispatch('setLoadingOff')
            this.refreshAdminsList()
            this.newAdminAddr = ''
          }
        })
        .on('error', error => {
          console.log('=========================')
          console.log('assignUserAsAdmin() failed')
          console.error(error)
          console.log('=========================')
          alert('FAILED TO ASSIGN USER AS ADMIN')
          this.$store.dispatch('setLoadingOff')
          this.newAdminAddr = ''
        })
    }
  }
}
</script>
