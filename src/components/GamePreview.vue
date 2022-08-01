<template>
  <div class="game-preview">
    <div :title="id" class="game-title"><b>Game Id:</b> {{ id }}</div>
    <ul class="game-content">
      <li>host: {{ hostTeam.name }}</li>
      <li>guest: {{ guestTeam.name }}</li>
      <li>date: {{ date }}</li>
      <li>hour: {{ hour }}</li>
      <li>stadium: {{ stadium.name }}</li>
      <li v-if="homeTeamGoals">home team goals: {{ homeTeamGoals }}</li>
      <li v-if="awayTeamGoals">away team goals: {{ awayTeamGoals }}</li>
    </ul>
    <input
      class="star"
      type="checkbox"
      title="bookmark page"
      :value="this.isFavorite"
      v-on:click="toggleFavorite"
    /><br /><br />
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
    hostTeam: {
      type: Object,
      required: true,
    },
    guestTeam: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    stadium: {
      type: Object,
      required: true,
    },
    homeTeamGoals: {
      type: Number,
    },
    awayTeamGoals: {
      type: Number,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
    onRemoveAction: {
      type: Function,
      required: false,
    },
  },
  methods: {
    onRemove() {
      this.onGameRemoved(this.id);
      if (this.onRemoveAction) {
        this.onRemoveAction(this.id);
      }
    },
    toggleFavorite() {
      if (this.isFavorite) {
        this.onGameRemoved(this.id);
        if (this.onRemoveAction) {
          this.onRemoveAction(this.id);
        }
      } else {
      }
    },
    async onGameRemoved(id) {
      console.log("(GamePreview) removing favorite game: " + id);
      try {
        if (!this.$root.store.apiOffMode) {
          const response = await this.axios.delete(
            `http://localhost:3000/users/favoriteMatch/${id}`
          );
          console.log(response);
        }
        this.isFavorite = false;
      } catch (error) {
        console.error("error in removing game " + id);
        console.error(error);
      }
    },
    async onGameAdded(id) {
      console.log("(GamePreview) add favorite game: " + id);
      try {
        if (!this.$root.store.apiOffMode) {
          const response = await this.axios.post(
            `http://localhost:3000/users/favoriteMatch`,
            {
              match_id: id,
            }
          );
          console.log(response);
        }

        this.isFavorite = true;
      } catch (error) {
        console.error("error in add favorite game " + id);
        console.error(error);
      }
    },
  },
  mounted() {
    console.log("game preview mounted");
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: fit-content;
  height: fit-content;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  background-color: white;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}

.star {
  visibility: hidden;
  font-size: 30px;
  cursor: pointer;
}
.star:before {
  content: "\2605";
  position: absolute;
  visibility: visible;
}
.star:checked:before {
  content: "\2606";
  position: absolute;
}
</style>
