<template>
  <div class="player-info" v-if="player.id">
    <div :title="player.id" class="player-title">
      <b>Player:</b> {{ player.name }}
    </div>
    <ul class="player-content">
      <li>birthDate: {{ player.birthDate }}</li>
      <li v-on:click="openTeam">team: {{ player.team.name }}</li>
      <li>position: {{ player.position.name }} ({{ player.position.id }}) </li>
      <li>birthCountry: {{ player.birthCountry }}</li>
      <li>nationality: {{ player.nationality }}</li>
      <li>height: {{ player.height }}</li>
      <li>weight: {{ player.weight }}</li>
    </ul>
    <img :src="player.picture" />
  </div>
</template>

<script>
export default {
  name: "PlayerInfo",
  data: () => ({
    player: {},
  }),
  props: {
    playerId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async loadPlayer(playerId) {
      try {
        const player_response = await this.axios.get(
          `http://localhost:3000/players/${playerId}`
        );
        this.player = player_response.data;
        console.log("player", this.player)
      } catch (err) {
        if (err && err.response) {
          console.error(err.response);
        } else {
          console.error("Something went wrong when trying load player");
        }
      }
    },
    openTeam() {
      this.$router.push(`/team/?teamId=${this.player.team.id}`);
    }
  },
  mounted() {
    this.loadPlayer(this.playerId);
    console.log("player info mounted");
  },
};
</script>

<style>
.player-info {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.player-info .player-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.player-info .player-content {
  width: 100%;
  overflow: hidden;
}
</style>
