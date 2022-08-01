<template>
<!-- TODO -->
  <div class="container">
    <h1 class="main_title" >About page</h1>
    <br>
     <b-container fluid class="bg">
    <h4 class="titles">-Website-</h4>
     <p>
       The website represents Comprehensive system of the Soccer Association for the management of the leagues, teams, players
       For the use of the various factors involved in football games.
       you can find here :
       <br>
       <br>
      <ul>
      <li>League Details such as : Games Documentation.</li>
      <li>If you are a registered user you can save favorite games before their occurrence time. </li>
      <li>Player / Coach Association Card.</li>
      <li>If you are a registered user you can save favorite player.</li>
      <li>Team Association Card</li>
      </ul>
     Also, every visitor can explore games/players/teams using search page.
     <br>
     <br>
       </p>
    <h4 class="titles">-Developers-
       <th>
              <img src="../assets/dev.jpg" class="img_container" align="center">
        </th>
    </h4>
    <p>
      This website developed by S.G.T team™ ©.
      
       
      
      <br>
      <br>
      <u>
      </u>
      <br>
      <table>
        <tr>
          <th>
            <b>
              Sarit Hollander -  
            </b>
            
            <ul>
              <li>ID: 206172686</li>
              <li>Email: sarithol@post.bgu.ac.il</li>
            </ul>
          </th>
        </tr>
      </table>
      <table>
        <tr>
          <th>
            <b>
            Tslil Brami - 
            </b>
            
            <ul>
              <li>ID: 2079458415</li>
              <li>Email: tslilbr@post.bgu.ac.il</li>
            </ul>
          </th>
        </tr>
      </table>
      <table>
        <tr>
          <th>
            <b>
            Gonen Davidi - 
            </b>
            
            <ul>
              <li>ID: 313304578</li>
              <li>Email: gonend@post.bgu.ac.il</li>
            </ul>
          </th>
        </tr>
      </table>
   
    <h4 class="titles">-Our Work-

            <th>
              <img src="../assets/boy.jpg" class="img_container" align="center">
        </th>
    </h4>

    <br>
    <br>

    <table>
        <tr>
          <th>
            <b>
            3rd age prsonal websites - 
            </b>
            
            <ul>
              <li>Tslil's - https://web-development-environments-2021.github.io/207945841/#home</li>
              <li>Gonen's - https://web-development-environments-2021.github.io/313304578/ </li>
              <li>Sarit's - https://web-development-environments-2021.github.io/assignment1-206172686/ </li>
            </ul>
          </th>
        </tr>
      </table>

      <br>

      <table>
        <tr>
          <th>
            <b>
            Pacman website - 
            </b>
            
            <ul>
              <li> https://web-development-environments-2021.github.io/assignment2-206172686_207945841_313304578/ </li>
            </ul>
          </th>
        </tr>
      </table>

      <br>

      <table>
        <tr>
          <th>
            <b>
            Superliga Documentation - 
            </b>
            
            <ul>
              <li>https://app.swaggerhub.com/apis/Tslilb/superliga/3.0.0</li>
            </ul>
          </th>
        </tr>
      </table>
      
    </b-container>
  </div>
</template>

<style lang="scss" scoped>

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}


.container {
  max-width: 700px;
  min-width: 700px;
  background-color: #EFEFEF;
  border-radius: 40px;
  border-style: solid;
  border-color: darkgrey;
  padding: 20px;
  

}

.img_container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  text-align: center;

  img{
    display:block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  // .helper{
  //   display: inline-block;
  //   vertical-align: middle;
  //   height: 10%;

  // }
}

.titles {
    font-weight: bold;
}

.main_title{

  font-weight: bold;
  text-align: center;
}
</style>
