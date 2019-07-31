<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="@/assets/dShops-Symbol.png" />
        <strong style="padding-left:0.5rem">dShops</strong>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': menuActive }">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/shopper">Shopper</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-primary" @click="gotoStoreOwnerApplicant">
            BECOME A STORE OWNER
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuActive: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    gotoStoreOwnerApplicant() {
      this.$router.push(`/storeownerapplicant/${this.$store.getters.coinbase}`)
    }
  }
}
</script>
