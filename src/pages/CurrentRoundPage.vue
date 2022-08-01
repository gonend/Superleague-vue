<template>
  <div class="container">
    <h1 class="title">Current Round Games</h1>
    <div class="split left">
      <MatchesTable
        :on-removed-from-favorites="removeFromFavorites"
        no-matches-title="There are no future games"
        :matches="roundFutureMatches"
        mode="future"
      ></MatchesTable>
    </div>
    <div class="split right">
      <MatchesTable
        no-matches-title="There are no past games"
        :matches="roundPastMatches"
        mode="past"
      ></MatchesTable>
    </div>
  </div>
</template>


<script>
import MatchesTable from "../components/MatchesTable";

export default {
  components: {
    MatchesTable,
  },
  data: () => ({
    roundFutureMatches: [],
    roundPastMatches: [],
  }),
  methods: {
    async removeFromFavorites(id) {
      await this.axios.delete(
        `http://localhost:3000/users/favoriteMatch/${id}`
      );

      this.games = this.games.filter((game) => game.id != id);
    },
    async getRoundInfo() {
      try {
        const league_response = await this.axios.get(
          "http://localhost:3000/league/getDetails"
        );
        const league = league_response.data;
        let current_round_id = 5;
        if (league.current_round_id) {
          current_round_id = league.current_round_id;
        }

        const round_response = await this.axios.get(
          `http://localhost:3000/round/${current_round_id}`
        );
        let roundMatches = round_response.data.matches;

        let favorite_match_ids = new Set();
        if (this.$root.store.user) {
          const response = await this.axios.get(
            "http://localhost:3000/users/favoriteMatches"
          );

          favorite_match_ids = new Set(response.data.map((match) => match.id));
        }

        roundMatches.map((match) => {
          match.isFavorite = favorite_match_ids.has(match.id);
        });

        this.roundPastMatches = roundMatches.filter(
          (match) => match.status != "future"
        );
        this.roundFutureMatches = roundMatches.filter(
          (match) => match.status == "future"
        );
      } catch (error) {
        console.error("CurrentRoundPage: error in getting current round");
        console.error(error);
        console.error(error.response.data);
      }
    },
  },
  mounted() {
    console.log("current round page mounted");
    this.getRoundInfo();
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.title{
  text-align: center;
  font-weight: bold;
}

.split.right{
  padding: 35px
}
.split.left{
  padding: 35px
}

</style>
