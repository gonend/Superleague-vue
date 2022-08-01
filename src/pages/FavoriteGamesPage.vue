<template>
  <div class="container">
    <h1 class="title">Favorite Games</h1>
    <FavoriteGames></FavoriteGames>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
export default {
  components: {
    FavoriteGames
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.title{
  text-align: center;
  font-weight: bold;
}
</style>
