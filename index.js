var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false

$(document).on("keypress", function(){// Target al documento con evento de teclado para que cuando el usuario presione una tecla inicie el juego
            if(!started){
                $("#level-title").text(`Level ${level}`) //La funcion es llamada ya que started es true al momento de tocar una tecla 
                setTimeout(() => {
                    nextSequence()
                }, 1000); 
                started=true
            }
}) 
        
$(".btn").on("click", function(){ //Selecciona todos los botones 
var userChosenColour = $(this).attr("id") // Utilizando el constructor para hacer referencia al ID de los botones 
   userClickedPattern.push(userChosenColour) // llenar el arreglo con los clicks que de el usuario en los botones
   playSound(userChosenColour) // Cuando el usuario haga click en un boton se dispara el sonido correspondiente
   animatePress(userChosenColour) //Dispara la animacion dependiendo del boton clickeado
   checkAnswer(userClickedPattern.length-1) // Llama a la funcion una vez que el usuario haga click y devuelve el index del arreglo
})

function nextSequence(){
    var randomNumber = Math.floor( Math.random() * 4 ) //Genera un numero aleatorio 0-4    
    var randomChosenColour = buttonColours[randomNumber] // Obtiene un valor aleatorio del arreglo
    
    gamePattern.push(randomChosenColour) // El valor aleatorio es agregado al arreglo vacio 

    $(`.${randomChosenColour}`).fadeOut().fadeIn() // Aplicar animacion al boton seleccionado dependiendo su color
    playSound(randomChosenColour) // Callback de la funcion para que cuando refresque inicie con el sonido correspondiente al color aleatorio  
    level++; // Incrementamos el nivel cada vez que la funcion sea llamada
    $("#level-title").text(`Level ${level}`) 

    userClickedPattern= [] // Una vez sea llamada la funcion reinicia el arreglo para el proximo nivel

}
        

function playSound(name){ //Funcion utilizada para el sonido de el juego
     var audio = new Audio(`sounds/${name}.mp3`) // Obtiene el audio correspondiente al color
     audio.play()
} 

function animatePress(currentColour){
    $(`#${currentColour}`).on("click", function(){
        
        $(`#${currentColour}`).addClass("pressed") // Añade la clase pressed a todos los botones

        setTimeout(() => {
            $(".btn").removeClass("pressed") // Remueve la clase pressed luego de 0.10 segundos
        },100);
    })
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // estan en el mismo nivel?

        //4. Revisa que el usuario tenga la ultima respuesta correcta y que termine con un if statement
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Llama la funcion con un delay de 1000 milisegundos
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
       var wrong = new Audio("/sounds/wrong.mp3") // Sonido para la respuesta erronea 
       wrong.play()

       $("body").addClass("game-over") // Respuesta erronea agrega una clase para darle efecto

       $("#level-title").text("Game Over, Press Any Key to Restart")

       setTimeout(() => {
           $("body").removeClass("game-over") 
       }, 200);
       
       startOver()
     }
}

function startOver(){
    level = 0;
    gamePattern = []
    started = false
}


animatePress()

