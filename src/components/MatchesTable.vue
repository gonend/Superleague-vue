<template>
  <div class="container">
    <h4 class="center" v-if="matches.length == 0 && !isLoading">
      {{ noMatchesTitle }}
    </h4>
    <v-img
      class="center"
      v-if="matches.length == 0 && isLoading"
      height="300px"
      width="350px"
      src="@/assets/Pivot_soccer.gif"
    />
    <v-data-table
      v-if="matches.length > 0"
      dense
      :headers="headers"
      :items="matches"
      :single-expand="true"
      :show-expand="mode != 'future'"
      sort-by="date"
      class="elevation-1"
      :loading="isLoading"
      loading-text="Loading..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ getTitle() }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div data-app v-if="mode == 'manage'">
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Game
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        Date:
                        <div v-if="editedIndex < 0">
                          <datepicker
                            :v-model="editedItem.edit_date"
                            :format="DatePickerFormat"
                            id="match-date"
                            ref="myDate"
                          ></datepicker>
                        </div>
                        <h6 v-else>
                          {{ editedItem.edit_date }}
                        </h6>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        Hour:
                        <vue-timepicker
                          :disabled="editedIndex >= 0"
                          :minute-interval="5"
                          format="HH:mm:ss"
                          v-model="editedItem.edit_hour"
                        ></vue-timepicker>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        Home Team:
                        <b-form-select
                          :disabled="editedIndex >= 0"
                          v-model="editedItem.edit_home_id"
                          :options="teams"
                        ></b-form-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        Away Team:
                        <b-form-select
                          :disabled="editedIndex >= 0"
                          v-model="editedItem.edit_away_id"
                          :options="teams"
                        ></b-form-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :disabled="editedIndex >= 0"
                          v-model="editedItem.edit_referee"
                          label="Referee"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        Home Score:
                        <vue-number-input
                          :disabled="editedIndex < 0"
                          v-model="editedItem.edit_home_goals"
                          :min="0"
                          :max="30"
                          inline
                          controls
                        ></vue-number-input>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        Away Score:
                        <vue-number-input
                          :disabled="editedIndex < 0"
                          v-model="editedItem.edit_away_goals"
                          :min="0"
                          :max="30"
                          inline
                          controls
                        ></vue-number-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-toolbar>
      </template>

      <template
        v-slot:[`item.actions`]="{ item }"
        v-if="$root.store.user && mode == 'future'"
      >
        <v-icon v-if="item.isFavorite" small @click="removeFromFavorites(item)">
          mdi-star
        </v-icon>
        <v-icon v-else small class="mr-2" @click="addToFavorites(item)">
          mdi-star-outline
        </v-icon>
      </template>
      <template v-slot:[`item.home_team.name`]="{ item }">
        <v-chip
          v-on:click="handleClick(item.home_team)"
          :class="getHomeColor(item)"
          dark
        >
          {{ item.home_team.name }}
        </v-chip>
        <img :src="item.home_team.team_logo" />
      </template>
      <template v-slot:[`item.away_team.name`]="{ item }">
        <v-chip
          v-on:click="handleClick(item.away_team)"
          :class="getAwayColor(item)"
          dark
        >
          {{ item.away_team.name }}
        </v-chip>
        <img :src="item.away_team.team_logo" />
      </template>
      <template v-slot:[`item.home_team_goals`]="{ item }">
        <v-chip
          v-if="item.home_team_goals != undefined"
          :class="getHomeColor(item)"
          dark
        >
          {{ item.home_team_goals }}
        </v-chip>
      </template>
      <template v-slot:[`item.away_team_goals`]="{ item }">
        <v-chip
          v-if="item.away_team_goals != undefined"
          :class="getAwayColor(item)"
          dark
        >
          {{ item.away_team_goals }}
        </v-chip>
      </template>

      <template v-slot:[`item.start`]="{ item }">
        {{ item.start.split(" ")[0] }}
      </template>
      <template v-slot:[`item.hour`]="{ item }">
        {{ item.start.split(" ")[1] }}
      </template>
      <template
        v-if="mode != 'future'"
        v-slot:expanded-item="{ headers, item }"
      >
        <td :colspan="headers.length">
          <MatchEventsInfo
            :match-id="item.id"
            :events="item.events"
            :editable="mode == 'manage'"
          ></MatchEventsInfo>
        </td>
      </template>
      <template v-slot:[`item.edit-actions`]="{ item }">
        <v-icon
          v-if="
            item.home_team_goals == undefined &&
            item.start < new Date().toISOString()
          "
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:[`item.calories`]="{ item }">
        <v-chip :color="getColor(item.calories)" dark>
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import MatchEventsInfo from "./MatchEventsInfo";
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import Vue from "vue";

export default {
  components: {
    MatchEventsInfo,
    Datepicker,
    VueTimepicker,
    VueNumberInput,
  },
  data: () => ({
    futureHeaders: [
      {
        text: "Date",
        align: "start",
        sortable: true,
        value: "start",
      },
      { text: "Hour", value: "hour", sortable: false },
      { text: "Home Team", value: "home_team.name" },
      { text: "Away Team", value: "away_team.name" },
      { text: "Stadium", value: "stadium.name", sortable: false },
      { text: "Referee", value: "referee.name", sortable: false },
      { text: "Favorite", value: "actions", sortable: false },
    ],
    pastHeaders: [
      {
        text: "Date",
        align: "start",
        sortable: true,
        value: "start",
      },
      { text: "Hour", value: "hour", sortable: false },
      { text: "Home Team", value: "home_team.name" },
      { text: "Away Team", value: "away_team.name" },
      { text: "Home Goals", value: "home_team_goals", sortable: false },
      { text: "Away Goals", value: "away_team_goals", sortable: false },
      { text: "Stadium", value: "stadium.name", sortable: false },
      { text: "Referee", value: "referee.name", sortable: false },
    ],
    manageHeaders: [
      {
        text: "Date",
        align: "start",
        sortable: true,
        value: "start",
      },
      { text: "Hour", value: "hour", sortable: false },
      { text: "Home Team", value: "home_team.name" },
      { text: "Away Team", value: "away_team.name" },
      { text: "Home Goals", value: "home_team_goals", sortable: false },
      { text: "Away Goals", value: "away_team_goals", sortable: false },
      { text: "Stadium", value: "stadium.name", sortable: false },
      { text: "Referee", value: "referee.name", sortable: false },

      { text: "Actions", value: "edit-actions", sortable: false },
    ],
    dialog: false,
    editedIndex: -1,
    teams: [],
    DatePickerFormat: "dd/MM/yyyy",
    isLoading: true,
  }),
  computed: {
    headers() {
      if (this.mode == "future") {
        return this.futureHeaders;
      } else if (this.mode == "past") {
        return this.pastHeaders;
      } else {
        return this.manageHeaders;
      }
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Game" : "Edit Match";
    },
    defaultItem() {
      let home_id = "";
      let away_id = "";
      if (this.teams.length >= 2) {
        home_id = this.teams[0].value;
        away_id = this.teams[1].value;
      }
      return {
        edit_date: new Date().toISOString().split("T")[0],
        edit_hour: "21:00:00",
        edit_home_id: home_id,
        edit_away_id: away_id,
        edit_referee: "Sapir Berman",
        edit_home_goals: 0,
        edit_away_goals: 0,
      };
    },
    editedItem() {
      if (this.editedIndex >= 0) {
        return {
          edit_date: this.matches[this.editedIndex].start.split(" ")[0],
          edit_hour: this.matches[this.editedIndex].start.split(" ")[1],
          edit_home_id: this.matches[this.editedIndex].home_team.id,
          edit_away_id: this.matches[this.editedIndex].away_team.id,
          edit_referee: this.matches[this.editedIndex].referee?.name,
          edit_home_goals: this.matches[this.editedIndex].home_team_goals,
          edit_away_goals: this.matches[this.editedIndex].away_team_goals,
        };
      } else {
        return this.defaultItem;
      }
    },
  },
  props: {
    matches: {
      type: Array,
      required: true,
    },
    mode: {
      type: String,
      default: "future",
    },
    title: {
      type: String,
    },
    noMatchesTitle: {
      type: String,
      default: "There are no matches",
    },
    onRemovedFromFavorites: {
      type: Function,
    },
  },
  methods: {
    async removeFromFavorites(item) {
      if (this.onRemovedFromFavorites) {
        this.onRemovedFromFavorites(item.id);
      }

      item.isFavorite = false;
    },
    async loadTeams() {
      if (this.mode == "manage") {
        const teams_response = await this.axios.get(
          `http://localhost:3000/teams/all`
        );

        this.teams = teams_response.data.map((team) => {
          return { value: team.id, text: team.name };
        });
      }
    },
    getTitle() {
      if (this.title) {
        return this.title;
      } else if (this.mode == "future") {
        return "Future Games";
      } else if (this.mode == "past") {
        return "Past Games";
      } else {
        return "Games";
      }
    },
    async addToFavorites(item) {
      console.log("add to favorite", item);
      item.isFavorite = true;
      const response = await this.axios.post(
        `http://localhost:3000/users/favoriteMatch`,
        {
          match_id: item.id,
        }
      );
    },
    getHomeColor(match) {
      if (match.home_team_goals > match.away_team_goals) return "green";
      else if (match.home_team_goals == match.away_team_goals) return "grey";
      else return "red";
    },
    getAwayColor(match) {
      if (match.home_team_goals > match.away_team_goals) return "red";
      else if (match.home_team_goals == match.away_team_goals) return "grey";
      else return "green";
    },
    handleClick(value) {
      this.$router.push(`/team/?teamId=${value.id}`);

      // If we just change teams - need to reload
      if (window.location.href.includes("#/team/?teamId=")) {
        this.$router.go();
      }
    },
    editItem(item) {
      this.editedIndex = this.matches.indexOf(item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    async save() {
      let success = true;
      // Edit mode
      if (this.editedIndex > -1) {
        const home_goals = this.editedItem.edit_home_goals;
        const away_goals = this.editedItem.edit_away_goals;

        if (home_goals < 0 || away_goals < 0) {
          success = false;
          Vue.$toast.open({
            message: "Score can't be negative!",
            type: "error",
          });
        } else {
          const response = await this.axios.post(
            `http://localhost:3000/scores/add`,
            {
              matchId: this.matches[this.editedIndex].id,
              home: home_goals,
              away: away_goals,
            }
          );

          let updated_match = this.matches[this.editedIndex];
          updated_match.home_team_goals = home_goals;
          updated_match.away_team_goals = away_goals;

          Vue.$toast.open({
            message: "Match updated!",
            type: "success",
          });
        }
        // New match
      } else {
        if (!this || !this.$refs || !this.$refs.myDate._data.selectedDate) {
          success = false;
          Vue.$toast.open({
            message: "Must set a date!",
            type: "error",
          });
        } else if (
          this.editedItem.edit_home_id == this.editedItem.edit_away_id
        ) {
          success = false;
          Vue.$toast.open({
            message: "Must be different teams!",
            type: "error",
          });
        } else if (this.editedItem.edit_referee == "") {
          success = false;
          Vue.$toast.open({
            message: "Must set a referee!",
            type: "error",
          });
        } else if (this.$refs.myDate._data.selectedDate <= new Date()) {
          success = false;
          Vue.$toast.open({
            message: "Must be future date!",
            type: "error",
          });
        } else {
          const new_match = await this.axios.post(
            `http://localhost:3000/matches/add`,
            {
              roundId: 5,
              homeTeamId: this.editedItem.edit_home_id,
              awayTeamId: this.editedItem.edit_away_id,
              refereeName: this.editedItem.edit_referee,
              startTime:
                new Date(this.$refs.myDate._data.selectedDate)
                  .toISOString()
                  .split("T")[0] +
                " " +
                this.editedItem.edit_hour,
            }
          );
          this.matches.push(new_match.data);

          Vue.$toast.open({
            message: "Match added!",
            type: "success",
          });
        }
      }

      if (success) {
        this.close();
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    this.loadTeams();
    console.log("mounted");
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
.v-chip {
  position: inherit;
}

.v-chip.green {
  background: green !important;
}
.v-chip.red {
  background: red !important;
}
.v-chip.yellow {
  background: yellow !important;
}
</style>