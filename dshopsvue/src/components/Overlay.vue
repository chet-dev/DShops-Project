<template>
  <div v-if="turnOn" class="overlay">
    <div class="text has-text-primary">
      <div>
        {{ loadingMessage }}
      </div>
      <BreedingRhombusSpinner :animation-duration="2000" :size="80" color="purple" />
    </div>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
export default {
  name: 'Overlay',
  components: {
    BreedingRhombusSpinner
  },
  computed: {
    turnOn() {
      return this.$store.getters.loading
    },
    loadingMessage() {
      return this.$store.getters.loadingMessage
    }
  }
}
</script>
<style>
.overlay {
  position: fixed; /* Sit on top of the page content */

  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(205, 189, 235, 0.938); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
.text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.breeding-rhombus-spinner {
  height: 65px;
  width: 65px;
  position: relative;
  transform: rotate(45deg);
}

.breeding-rhombus-spinner,
.breeding-rhombus-spinner * {
  box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus {
  height: calc(65px / 7.5);
  width: calc(65px / 7.5);
  animation-duration: 2000ms;
  top: calc(65px / 2.3077);
  left: calc(65px / 2.3077);
  background-color: #ff1d5e;
  position: absolute;
  animation-iteration-count: infinite;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n + 0) {
  margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
  animation-name: breeding-rhombus-spinner-animation-child-1;
  animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
  animation-name: breeding-rhombus-spinner-animation-child-2;
  animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
  animation-name: breeding-rhombus-spinner-animation-child-3;
  animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
  animation-name: breeding-rhombus-spinner-animation-child-4;
  animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
  animation-name: breeding-rhombus-spinner-animation-child-5;
  animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
  animation-name: breeding-rhombus-spinner-animation-child-6;
  animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
  animation-name: breeding-rhombus-spinner-animation-child-7;
  animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
  animation-name: breeding-rhombus-spinner-animation-child-8;
  animation-delay: calc(100ms * 8);
}

.breeding-rhombus-spinner .rhombus.big {
  height: calc(65px / 3);
  width: calc(65px / 3);
  animation-duration: 2000ms;
  top: calc(65px / 3);
  left: calc(65px / 3);
  background-color: #ff1d5e;
  animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
  animation-delay: 0.5s;
}

@keyframes breeding-rhombus-spinner-animation-child-1 {
  50% {
    transform: translate(-325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
  50% {
    transform: translate(0, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
  50% {
    transform: translate(325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
  50% {
    transform: translate(325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
  50% {
    transform: translate(325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
  50% {
    transform: translate(0, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
  50% {
    transform: translate(-325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
  50% {
    transform: translate(-325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
  50% {
    transform: scale(0.5);
  }
}
</style>
