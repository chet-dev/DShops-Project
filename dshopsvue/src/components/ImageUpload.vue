<template>
  <div
    class="base-image-input"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <span v-if="!imageData" class="placeholder">
      Click to upload image
    </span>
    <input ref="fileInput" class="file-input" type="file" @input="onSelectFile" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageData: null,
      buffer: ''
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click()
    },
    // onSelectFile() {
    //   const input = this.$refs.fileInput
    //   const files = input.files
    //   if (files && files[0]) {
    //     const reader = new FileReader()
    //     reader.onload = e => {
    //       this.imageData = e.target.result
    //     }
    //     reader.readAsDataURL(files[0])
    //     this.$emit('input', files[0])
    //   }
    // }
    onSelectFile() {
      this.getPreview()
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onloadend = async () => {
          this.buffer = await Buffer.from(reader.result)
        }
        reader.readAsArrayBuffer(files[0])
        this.$emit('input', files[0])
      }
    },
    getPreview() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
      }
    }
  }
}
</script>

<style scoped>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>
