$(document).ready(function () {

    let topics = ['elephants','goonies','flamingo','turtle','cats','sloth'];

    createButtons();
    // let gifButtons = $("#gifButtons").append("<button>button</button>");
    function createButtons() {
        for (let i = 0; i < topics.length; i++) {
            let button = $('<button>');
            button.val(topics[i]).text(topics[i]).addClass('buttons').addClass('userButton');
            // making sure values are added to buttons
            let value = button.val();
            console.log(value);
            // Appending to gifs collumn
            $('#gifButtons').append(button);
        }
    }
    // add new, user-created gif button to topics array
    $('.addNew').on('click', function(event) {
        event.preventDefault();
        let values = $('.addTopic').val();
        values = values.toLowerCase();
        topics.push(values);
        let button = $('<button>');
        button.val(values).text(values).addClass('buttons').addClass('userButton');
        $('#gifButtons').append(button);
    })

    $(document).on('click','.buttons',function(event){
        event.preventDefault();
        $('#showGifs').empty();
        console.log('I CLICK BUTTON MEOW!');

        let searchTopic = $(this).val();
        let request = `http://api.giphy.com/v1/gifs/search?q=${searchTopic}&api_key=qB9i2AVWdKXvBftt0NseR6gPtZJLSzEl&limit=10`;
        console.log(searchTopic);
        console.log(request);

        populateGifs(request);
    })
    // get data, show it in console and present them on the page with a function call
    function populateGifs(request) {
        $.ajax({
            url: request,
            method: 'GET'
        })
            .then(function (response) {
                console.log(request);
                console.log(response);

                presentGifs(response);
            });
    }
    // function to add the gifs to the page
    function presentGifs(response){
        console.log(response.data);
        let gifFiles = response.data;

        for (let i =0; i < gifFiles.length; i++){
            let newDiv = $('<div>');
            let p = $('<p>');
            p.text('Rated: ' + gifFiles[i].rating.toUpperCase());

            let gifImage = $('<img>');
            gifImage.attr("src", gifFiles[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', gifFiles[i].images.preview_gif.url);
            gifImage.attr('data-still', gifFiles[i].images.fixed_height_still.url);
            gifImage.attr('data-state','still');
            gifImage.addClass('gifFile');

            newDiv.append(gifImage);
            newDiv.append(p);

            $('.presentGifs').css('background-color', 'azure')
            $('#showGifs').append(newDiv);
        }
    }
    // click function to start and pause an individual gif image
    // I hate using this, but practice makes perfect. This was the hardest part, by far!
    $(document).on('click','.gifFile',function(){
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    })

});

// .border = .showButtons
// #gifsButtons = #gifButtons
// .addOn = .addNew
// #gifsDisplay = #showGifs