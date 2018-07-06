// Initial array of movies
var teams = ["Boston Celtics", "Chicago Bulls", "Dallas Mavericks", "Detroit Pistons", "Houston Rockets", "Los Angeles Clippers", "Memphis Grizzlies", "Milwaukee Bucks",
"New Orleans Pelicans", "Oklahoma City Thunder", "Philadelphia 76ers", "Portland Trail Blazers", "San Antonio Spurs", "Utah Jazz"];

// Adding click event listen listener to all buttons
$("button").on("click", function() {
  // Grabbing and storing the data-team property value from the button
  var team = $(this).attr("data-team");

  // Constructing a queryURL using the team name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    team + "&api_key=dc6zaTOxFJmzC&limit=5";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);
      console.log(response);

      // storing the data from the AJAX request in the results variable
      var results = response.data;





// ========================================================================================================================
      // Function for displaying movie data
      function renderButtons()
      {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
// ========================================================================================================================





      // Looping through each result item
      for (var i = 0; i < results.length; i++)
      {

        // Creating and storing a div tag
        var teamDiv = $("<div>");




// THE FOLLOWING FIVE LINES (SANS COMMENTS) ARE REGARDING NEW BUTTONS GETTING ADDED TO PAGE --- NOT YET WORKING
// ========================================================================================================================
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var newButton = $("<button>");

        // Adding a class of team-btn to our button
        newButton.addClass("team-btn");

        // Adding a data-attribute
        newButton.attr("data-name", teams[i]);

        // Providing the initial button text
        newButton.text(teams[i]);

        // Adding the button to the buttons-view div
        $("#buttons-view").append(newButton);

      }
    }
// ========================================================================================================================

    // This function handles events where a movie button is clicked
    $("#add-team").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var movie = $("#team-input").val().trim();

      // Adding movie from the textbox to our array
      movies.push(movie);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    });


        // Creating a paragraph tag with the result GIF's title
        var pTitle = $("<p>").text("Gif Title: " + results[i].title);

        // Creating a paragraph tag with the result GIF's URL
        var pUrl = $("<p>").text("Gif URL: " + results[i].url);

        // Creating a paragraph tag with the result GIF's rating
        var pRating = $("<p>").text("Gif Rating: " + results[i].rating);

        // Creating and storing an image tag
        var teamImage = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        teamImage.attr("src", results[i].images.fixed_height.url);







// THE FOLLOWING SECTION IS REGARDING THE TOGGLING OF ACTIVE AND NON-ACTIVE GIF STATES --- NOT YET WORKING
// ========================================================================================================================
        teamImage.attr("data-state", results[i].images.fixed_width_small_still.url);
        teamImage.attr("data-state", results[i].images.fixed_width_still.url);

        $("button").on("click", function()
        // $(".gif").on("click", function()
        {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");

          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value

          if (state === "still")
          {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }

          else
          {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
// ========================================================================================================================



        // Appending the paragraph and image tag to the teamDiv
        teamDiv.append(pTitle);
        teamDiv.append(pUrl);
        teamDiv.append(pRating);
        teamDiv.append(teamImage);

        // Prependng the teamDiv to the HTML page in the "#gifsDiv" div
        $("#gifsDiv").prepend(teamDiv);
        renderButtons();
    });
});
