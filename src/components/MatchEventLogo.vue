<template>
  <div>
    <img :src="getImgUrl(eventType)" />
  </div>
</template>

<script>
export default {
  props: {
    eventType: {
      type: String,
      required: true,
    },
  },
  methods: {
    getImgUrl(type) {
      var images = require.context("../assets/icons", false, /\.png$/);
      return images("./" + type + ".png");
    },
  },
};
</script>
<style>
</style>