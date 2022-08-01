<template>
  <div class="container main">
    <TeamInfo :teamId="teamId"></TeamInfo>
  </div>
</template>

<script>
import TeamInfo from "../components/TeamInfo";
export default {
  components: {
    TeamInfo,
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
   mounted() {
    console.log("team page mounted with team id", this.teamId);
  },
};
</script>

<style lang="scss" scoped>
</style>
