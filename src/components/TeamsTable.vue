<template>
  <div class="container">
    <h4 v-if="teams.length == 0 && !isLoading">There are no teams to show</h4>
    <v-img
      v-if="teams.length == 0 && isLoading"
      height="300px"
      width="350px"
      src="@/assets/Pivot_soccer.gif"
    />
    <v-data-table
      v-if="teams.length > 0"
      dense
      :headers="headers"
      :items="teams"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teams</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <v-chip v-on:click="handleClick(item)" dark>
          {{ item.name }}
        </v-chip>
      </template>
      <template v-slot:[`item.logo`]="{ item }">
        <img :src="item.logo" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Stadium", value: "stadiumName" },
      { text: "", value: "logo" },
    ],
    isLoading: true,
  }),
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(value) {
      console.log(value);
      this.$router.push(`/team/?teamId=${value.id}`);
    },
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
