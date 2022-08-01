<template>
  <div class="container main">
    <PlayerInfo :playerId="playerId"></PlayerInfo>
  </div>
</template>

<script>
import PlayerInfo from "../components/PlayerInfo";
export default {
  components: {
    PlayerInfo,
  },
  props: {
    playerId: {
      type: String,
      required: true,
    },
  },
   mounted() {
    console.log("player page mounted with player id", this.playerId);
  },
};
</script>

<style lang="scss" scoped>
</style>
