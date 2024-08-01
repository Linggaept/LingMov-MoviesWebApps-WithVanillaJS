function searchMovies() {
    $('#movie-list').html('');

    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com",
        data: {
            'apikey': '3aa3ae40',
            's': $('#search-input').val()
        },
        dataType: "json",
        success: function(result) {
            if (result.Response == "True") { //.Response diambil dari ketika hit api di postman
                let movies = result.Search;

                $.each(movies, function(i, data) {

                    $('#movie-list').append(`
                        <div class="col-md-2 justify-content-center">
                            <div class="card mb-3">
                                <img src=` + data.Poster + ` class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                    <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                                </div>
                            </div>
                        </div>
                        `);
                });

                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    <h1 class="text-center">` +
                    result.Error + `</h1>
                    `);
            }
        }
    });
}
$('#search-button').on('click', function() {
    searchMovies();
});

$('#search-input').on('keyup', function(e) {
    if (e.keyCode === 13) {
        searchMovies();
    }
});

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        type: "get",
        url: "http://omdbapi.com",
        data: {
            'apikey': '3aa3ae40',
            'i': $(this).data('id')
        },
        dataType: "json",
        success: function(movie) {
            if (movie.Response === "True")
                $('#exampleModalLabel').html(`<h5>` + movie.Title + `</h5>`)
            $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item"><h3>` + movie.Released + `</h3></li>
                                    <li class="list-group-item"><h3>` + movie.Genre + `</h3></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `);
        }
    });
});