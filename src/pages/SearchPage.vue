<template>
  <div>
    <br>
    <br>
    <b-input-group id="search-input">
      <b-form-input
        placeholder="Search team or player"
        v-model="searchQuery"
        v-on:change="query(searchQuery)"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="query(searchQuery)"
          >Search</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <br />
    <PlayersTable v-if="players.length" :players="players"></PlayersTable>
    <TeamsTable v-if="teams.length" :teams="teams"></TeamsTable>
  </div>
</template>

<script>
import PlayersTable from "../components/PlayersTable";
import TeamsTable from "../components/TeamsTable";

export default {
  data() {
    return {
      searchQuery: "",
      players: [],
      teams: [],
    };
  },
  components: {
    PlayersTable,
    TeamsTable,
  },
  methods: {
    async query(searchQuery) {
      localStorage['searchQuery' + this.$root.store.user.id] = searchQuery;

      if (localStorage.searchQuery === "") {
        this.teams = [];
        this.players = [];
      } else {
        try {
          const players_response = await this.axios.get(
            `http://localhost:3000/players/search/?name=${searchQuery}`
          );
          this.players = players_response.data;

          const teams_response = await this.axios.get(
            `http://localhost:3000/teams/search/?name=${searchQuery}`
          );
          this.teams = teams_response.data;
          console.log("teams", this.teams);
          console.log("players", this.players);
        } catch (err) {
          if (err && err.response) {
            console.error(err.response);
          } else {
            console.error(
              "Something went wrong when trying load search result"
            );
          }
        }
      }
    },
  },
  mounted() {
    if (this.$root.store.user && localStorage['searchQuery' + this.$root.store.user.id]) {
      this.searchQuery = localStorage['searchQuery' + this.$root.store.user.id];
      this.query(this.searchQuery);
    }
  },
};
</script>

<style scoped>
#search-input {
  margin-left: 400px;
  width: 400px;
  
}

</style>