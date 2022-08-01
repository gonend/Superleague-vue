<template>
  <div class="container main">
    <div class="split left">
      <LeagueInfo></LeagueInfo>
    </div>
    <div class="split right">
      <LoginPage v-if="!$root.store.user"></LoginPage>
      <FavoriteGames :amount=3 v-else></FavoriteGames>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGames,
  },
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

.container main{
  max-width: 900px;
  min-width:700px;
  background-color: #EFEFEF;
  border-radius: 40px;
  border-style: solid;
  border-color: darkgrey;
  padding: 40px;
  text-align: center;
}
</style>
