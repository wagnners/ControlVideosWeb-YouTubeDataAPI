function btnSearchVideos(){

	$('#input-search, .input-day').on('keypress', function (e) {
		
        if(e.which === 13 && $("#input-search").val()){

        	var url  = URL + "/videos/get&search=" + $('#input-search').val()+"&"+$(".form-durations").serialize();

        	window.location = url;
        }
   	});

	$('.btn-search').on('click', function (e) {

		var url  = URL + "/videos/get&search=" + $('#input-search').val()+"&"+$(".form-durations").serialize();

		window.location = url;
	});

}

function clicks(){
	btnSearchVideos();
}

$(document).ready(function() {
	clicks();
});