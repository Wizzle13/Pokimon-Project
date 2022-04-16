var score = 0;
var time = 10;
var startBtn = document.getElementById('startBtn');
var numAnwsers = 4;
var count = numAnwsers + 1;
var pokemonId = 1;
var sprite = 1;
var pokeAnwser = document.querySelector("#anwserSection");
var anwLoc = 0;


// randomly get pokemon
var getPokemon = function(){
    var randomPokemon = Math.floor(Math.random() * 149) + 1;
    pokemonId = randomPokemon;
}
// randomly where correct anwser is
var anwserLocaton = function(){
    anwLoc = Math.floor(Math.random() * numAnwsers) + 1;
    console.log("correct Anwser = " + anwLoc);
}    
// create high score page
// Get the modal
var modalHS = document.getElementById("highScoreModal");
var modalQuiz = document.getElementById("quizModal");
// Get the button that opens the modal
var btn = document.getElementById("highScore");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modalHS.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalHS.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalHS) {
    modalHS.style.display = "none";
  }
}

// create / cleanup game/start function
var startQuiz = function() {
  getPokemon();
  modalQuiz.style.display = "block";
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
  fetch(apiUrl).then(function(response){
    response.json().then(function(data){
      // console.log(data.name);
      // console.log(data.sprites.front_shiny);
      var name = data.name;
      anwserLocaton();
      var pokeSprite = data.sprites.front_shiny;
      document.querySelector('video').style.visibility='hidden';
      document.getElementById('pokemonImage').setAttribute("src",pokeSprite)
      for(var i = 1; i < numAnwsers; i++){
        
        console.log("i= "+ i + ", " + anwLoc );
        if(i === anwLoc){
          console.log("correct Anwser= "+ name);
          console.log("i= "+ i + ", " + anwLoc );
          $(pokeAnwser).append (
          "<div><input type='radio' id = " + name + "name='pmon' value = " + name + "><lable> " + name + "</lable></div>"
          );
          i++;
        } 
        if(i !== anwLoc){
          getPokemon();
          
          var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
          fetch(apiUrl).then(function(response){
            response.json().then(function(data){
              console.log("wrong Anwser= " + data.name);
              console.log("i = " + i + ", " + anwLoc );
              $(pokeAnwser).append (
                "<div><input type='radio' id = " + data.name + "name='pmon' value = " + data.name + "><lable> " + data.name + "</lable></div>"
                );
            });
          });
          
        };
      };
              
    }); 
  });
}



startBtn.addEventListener("click", function(){
    startQuiz();
})




