

var xCharacters = ["Wolverine", "Jean Grey", "Magneto","Professor X", "Scott Summers","Mystique", "Havok","Gambit","X 23", "Sabretooth"];


function displayCharacterInfo() {
      var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=L8mlXOfB8oskNyeqCNIPx5oKo8TtNKKc&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

           var results = response.data;

           for (var i = 0; i < results.length; i++) {

            var characterDiv = $("<div class='characterimg'>");
            var rating =  $("<p>").text("Rating: " + results[i].rating);

            characterDiv.append(rating);

            var characterImage = $("<img>");
            characterImage.addClass("image")

            characterImage.attr("src", results[i].images.fixed_height_still.url)
            characterImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            characterImage.attr("data-animate",results[i].images.fixed_height_small.url);
            characterImage.attr("data-state", "still");

  

            characterImage.attr("src", results[i].images.fixed_height_url)
            ;
            characterDiv.append(characterImage);
         
  

            $("#characters").prepend(characterDiv);
          }

      });
  }



function renderButtons() {

	$("#characterButtons").empty();

	for (var i = 0; i < xCharacters.length; i++) {

		var a = $("<button>");

		a.addClass("character");

		a.attr("data-name", xCharacters[i]);

		 a.text(xCharacters[i]);

		     $("#characterButtons").append(a);
        }
      }

      $("#addCharacter").on("click", function(event) {

      	event.preventDefault();

        var character = $("#character-input").val().trim();

      	xCharacters.push(character);

      	renderButtons();
      });
    
  $(document).on("click", ".character", displayCharacterInfo);
    
      renderButtons();
    
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
    });