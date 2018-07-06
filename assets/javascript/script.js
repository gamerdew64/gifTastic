// Initial array of movies
var teams = ["Boston Celtics", "Chicago Bulls", "Dallas Mavericks", "Detroit Pistons", "Houston Rockets", "Los Angeles Clippers", "Memphis Grizzlies", "Milwaukee Bucks",
"New Orleans Pelicans", "Oklahoma City Thunder", "Philadelphia 76ers", "Portland Trail Blazers", "San Antonio Spurs", "Utah Jazz"];

// Adding click event listen listener to all buttons
$("button").on("click", function()
{
  // Grabbing and storing the data-team property value from the button
  var team = $(this).attr("data-team");

  // Constructing a queryURL using the team name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    team + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response)
    {
      console.log(queryURL);
      console.log(response);

      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++)
      {

        // Creating and storing a div tag
        var teamDiv = $("<div>");

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
    }
  });
});
