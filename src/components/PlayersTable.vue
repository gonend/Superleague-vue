<template>
  <div class="container">
    <h4 v-if="players.length == 0 && !isLoading">
      There are no players to show
    </h4>
    <v-img
      v-if="players.length == 0 && isLoading"
      height="300px"
      width="350px"
      src="@/assets/Pivot_soccer.gif"
    />
    <v-data-table
      v-if="players.length > 0"
      dense
      :headers="headers"
      :items="players"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Players</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <v-chip v-on:click="handlePlayerClick(item)" dark>
          {{ item.name }}
        </v-chip>
      </template>
      <template v-slot:[`item.picture`]="{ item }">
        <img v-on:click="handlePlayerClick(item)" :src="item.picture" />
      </template>
      <template v-slot:[`item.team.name`]="{ item }">
        {{ item.team.name }}
        <img v-on:click="handleTeamClick(item)" :src="item.team.logo" />
      </template>
      <template v-slot:[`item.position`]="{ item }">
        {{ item.position.name }} ({{ item.position.id }})
      </template>
      <template v-slot:[`body.append`]>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="position"
              type="string"
              label="position:"
            ></v-text-field>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <v-text-field
              v-model="team"
              type="string"
              label="team:"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    position: "",
    team: "",
    isLoading: true,
  }),
  computed: {
    headers() {
      return [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Position",
          value: "position",
          filter: (value) => {
            if (!this.position) return true;

            return (
              value.name.toLowerCase().includes(this.position.toLowerCase()) ||
              value.id
                .toString()
                .toLowerCase()
                .includes(this.position.toLowerCase())
            );
          },
        },
        { text: "Nationality", value: "nationality" },
        { text: "BirthDate", value: "birthDate" },
        { text: "", value: "picture" },
        {
          text: "Team",
          value: "team.name",
          filter: (value) => {
            if (!this.team) return true;

            return value.toLowerCase().includes(this.team.toLowerCase());
          },
        },
      ];
    },
  },
  props: {
    players: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handlePlayerClick(value) {
      this.$router.push(`/player/?playerId=${value.id}`);
    },

    handleTeamClick(value) {
      this.$router.push(`/player/?teamId=${value.team.id}`);
    },
  },
  mounted() {
    console.log("players table page mounted");
    console.log(this.players);
  },
  updated() {
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
