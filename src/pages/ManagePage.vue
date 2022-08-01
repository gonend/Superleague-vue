<template>
  <div class="container">
    <h1 class="main_title">Manage your league</h1>
    <MatchesTable :matches="matches" mode="manage"></MatchesTable>
  </div>
</template>


<script>
import MatchesTable from "../components/MatchesTable";

export default {
  data: () => ({
    matches: [],
  }),
  components: {
    MatchesTable,
  },
  methods: {
    async getMatches() {
      try {
        const matches_response = await this.axios.get(
          `http://localhost:3000/matches/all`
        );

        this.matches = matches_response.data;
      } catch (error) {
        console.error("Manage page: error in getting matches");
        console.error(error);
        console.error(error.response.data);
      }
    },
  },
  mounted() {
    this.getMatches();
    // this.updateGames();
  },
};
</script>

<style lang="scss" scoped>

.main_title{
  text-align: center;
  font-weight: bold;
}




</style>
