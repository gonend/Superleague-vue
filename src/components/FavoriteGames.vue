<template>
  <div>
    <MatchesTable
      :matches="slicedGames()"
      mode="future"
      title="Favorite Games"
      no-matches-title="There are no favorite games"
      :on-removed-from-favorites="removeFromFavorites"
    ></MatchesTable>
  </div>
</template>

<script>
import MatchesTable from "./MatchesTable";
export default {
  name: "FavoriteGames",
  props: {
    amount: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  components: {
    MatchesTable,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    slicedGames() {
      return this.games.slice(0, this.amount);
    },
    async updateGames() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches"
        );
        const games = response.data;
        this.games = [];
        const current_time = new Date().getTime();
        const future_games = games.filter(
          (game) => Date.parse(game.start) > current_time
        );

        future_games.map((match) => {
          match.isFavorite = true;
        });

        this.games.push(...future_games);
        console.log(response);
      } catch (error) {
        console.error("error in update games");
        console.error(error);
        console.error(error.response.data);
      }
    },
    async removeFromFavorites(id) {
      await this.axios.delete(
        `http://localhost:3000/users/favoriteMatch/${id}`
      );

      this.games = this.games.filter((game) => game.id != id);
    },
    async onGameRemoved(id) {
      console.log("(FavoriteGames) removing game: " + id);
      this.games = this.games.filter((game) => game.id != id);
    },
  },
  mounted() {
    console.log("favorite games mounted");
    this.updateGames();
  },
};
</script>

<style>

</style>
