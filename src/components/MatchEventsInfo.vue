<template>
  <div class="match-events-preview">
    <ul id="example-1" class="no-bullets">
      <li v-for="(event, index) in events" :key="index">
        <MatchEventInfo :event="event"></MatchEventInfo>
      </li>
    </ul>
    <div data-app v-if="editable">
      <v-dialog v-model="eventDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Add Event
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">New Event</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedEventItem.description"
                    label="Description"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  Minute:
                  <vue-number-input
                    v-model="editedEventItem.minute"
                    :min="0"
                    :max="90"
                    inline
                    controls
                  ></vue-number-input>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  Event type:
                  <b-form-select
                    v-model="editedEventItem.eventType"
                    :options="eventTypes"
                  ></b-form-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="saveEvent"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import MatchEventInfo from "./MatchEventInfo";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import Vue from "vue";

export default {
  components: {
    MatchEventInfo,
    VueNumberInput,
  },
  data: () => ({
    editedEventItem: {
      description: "",
      minute: 0,
      eventType: "goal",
    },
    eventDialog: false,
    eventTypes: [
      { value: "foul", text: "Foul" },
      { value: "goal", text: "Goal" },
      { value: "injury", text: "Injury" },
      { value: "offside", text: "Offside" },
      { value: "penaltyMissed", text: "Penalty Missed" },
      { value: "redCard", text: "Red Card" },
      { value: "substitution", text: "Substitution" },
      { value: "yellowCard", text: "Yellow Card" },
    ],
  }),
  props: {
    matchId: {
      type: Number,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    events: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addEvent() {
      this.eventDialog = true;
      this.editedEventItem = {
        description: "",
        minute: 0,
        eventType: "goal",
      };
    },
    close() {
      this.eventDialog = false;
    },
    async saveEvent() {
      const minute = this.editedEventItem.minute;
      const eventType = this.editedEventItem.eventType;
      const description = this.editedEventItem.description;
      const matchId = this.matchId;

      if (minute < 0 || minute > 120) {
        success = false;
        Vue.$toast.open({
          message: "Minute is not valid!",
          type: "error",
        });
      } else {
        const response = await this.axios.post(
          `http://localhost:3000/events/add`,
          {
            matchId,
            minute,
            eventType,
            description,
          }
        );

        const event = {
          minute,
          type: eventType,
          description,
        };

        this.events.push(event);
        this.events.sort((a, b) =>
          a.minute > b.minute ? 1 : b.minute > a.minute ? -1 : 0
        );

        Vue.$toast.open({
          message: "Event added!",
          type: "success",
        });
      }
    },
  },
  watch: {
    eventDialog(val) {
      val || this.close();
    },
  },
  mounted() {
    console.log("match events mounted");
    console.log(this.events);
  },
};
</script>

<style>
.match-events-preview{
  max-width: 200px;
}

ul.no-bullets {
  list-style-type: none;
}
</style>