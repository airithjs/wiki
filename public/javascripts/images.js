$(function(){
	$('.thumbnail button').click(function(){
		var filepath = $(this).attr('href');
		var markdownStr = "![](" + filepath + ")";
		insertStrOnCursor($('#editor'),markdownStr);
	});

	$('#searchImageBtn').click(function(){
		var query = $('#image_query').val();
		$('#images').load('/images/' + query);
	});
});