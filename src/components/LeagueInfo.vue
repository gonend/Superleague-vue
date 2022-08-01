<template>
  <div class="league-preview">
    <b-card img-alt="Image" tag="article" style="max-width: 20rem" class="mb-2">
      <b-card-title>{{ league.name }}</b-card-title>
      <b-card-text>
        Season: {{ league.current_season_name }}
        <br />
        Current round: {{ league.current_round_id }}
        <br />
        Next Match:
        <br />
        {{ nextMatch.home_team_name }} VS. {{ nextMatch.away_team_name }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      league: {},
      nextMatch: {}
    };
  },
  methods: {
    async getLeagueInfo() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails"
        );
        this.league = response.data;
        if (!this.league.current_round_id) {
          this.league.current_round_id = 5;
        }
        const round_response = await this.axios.get(
          `http://localhost:3000/round/${this.league.current_round_id}`
        );
        let roundMatches = round_response.data.matches;
        const nextMatch = roundMatches
          .filter((match) => match.status != "done")
          .sort((a, b) =>
            a.start > b.start ? 1 : b.start > a.start ? -1 : 0
          )[0];

          this.nextMatch = {
            home_team_name : nextMatch.home_team.name,
            away_team_name : nextMatch.away_team.name
          }
      } catch (error) {
        console.error("error in get league details");
        console.error(error);
        console.error(error.response.data);
      }
    },
  },
  mounted() {
    console.log("league info mounted");
    this.getLeagueInfo();
  },
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(44, 89, 116);
  background-color: #EFEFEF;
  text-align: center;
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
  text-align: center;
}
</style>