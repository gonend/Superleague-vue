<template>
  <div class="team-info" v-if="team.id">
    <div :title="team.id" class="team-title">
      <h1>{{ team.name }}</h1>
      <PlayersTable :players="players"></PlayersTable>
      <div>
        <MatchesTable
          no-matches-title="There are no future games"
          :matches="futureMatches"
          mode="future"
        ></MatchesTable>
        <MatchesTable
          no-matches-title="There are no past games"
          :matches="pastMatches"
          mode="past"
        ></MatchesTable>
      </div>
    </div>
  </div>
</template>

<script>
import MatchesTable from "../components/MatchesTable";
import PlayersTable from "../components/PlayersTable";

export default {
  name: "TeamInfo",
  components: {
    MatchesTable,
    PlayersTable,
  },
  data() {
    return {
      team: {},
      pastMatches: [],
      futureMatches: [],
      players: [],
    };
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async loadTeam(teamId) {
      try {
        const team_response = await this.axios.get(
          `http://localhost:3000/teams/${teamId}`
        );
        this.team = team_response.data;

        const players_response = await this.axios.get(
          `http://localhost:3000/players/findByTeam/${teamId}`
        );

        this.players = players_response.data;

        const matches_response = await this.axios.get(
          `http://localhost:3000/matches/findByTeam/${teamId}`
        );

        let matches = matches_response.data;

        let favorite_match_ids = new Set();
        if (this.$root.store.user) {
          const favorite_response = await this.axios.get(
            "http://localhost:3000/users/favoriteMatches"
          );

          favorite_match_ids = new Set(
            favorite_response.data.map((match) => match.id)
          );
        }

        matches.map((match) => {
          match.isFavorite = favorite_match_ids.has(match.id);
        });

        this.futureMatches = matches.filter((match) => match.status != "done");

        this.pastMatches = matches.filter((match) => match.status == "done");

        console.log("team", this.team);
        console.log("players", this.players);
        console.log("futureMatches", this.futureMatches);
        console.log("pastMatches", this.pastMatches);
      } catch (err) {
        if (err && err.response) {
          console.error(err.response);
        } else {
          console.error("Something went wrong when trying load team");
        }
      }
    },
  },
  mounted() {
    this.loadTeam(this.teamId);
    console.log("team info mounted with team id", this.teamId);
  },
};
</script>

<style>
</style>
