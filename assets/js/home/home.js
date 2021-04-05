function btnSearchVideos(){

	var url  = URL + "/videos/get&search=" + $('#input-search').val()+"&"+$(".form-durations").serialize();

	$('#input-search, .input-day').on('keypress', function (e) {
        if(e.which === 13 && $("#input-search").val()){
        	window.location = url;
        }
   	});

	$('.btn-search').on('click', function (e) {
		window.location = url;
	});

}

function clicks(){
	btnSearchVideos();
}

$(document).ready(function() {
	clicks();
});