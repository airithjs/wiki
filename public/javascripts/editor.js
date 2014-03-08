function blockTabKey(dom){
	dom.keydown(function(e){
		var key = e.keycode || e.which;
		if( key == 9 ){
			e.preventDefault();
			var index = dom[0].selectionStart;
			var data = dom.val();
			var front = data.substring(0,index);
			var back = data.substring(index, data.length);
			dom.val(front + "\t" + back);
			dom[0].selectionStart = index + 1;
			dom[0].selectionEnd = index + 1;
		}
	});
}

function scrollSync(){
	$('#editor').scroll(function(){
		var position = $(this).scrollTop();
		var a = $(this).prop('scrollHeight');
		var b = $(this).outerHeight();
		var c = $('#preview').prop('scrollHeight');
		var d = $('#preview').outerHeight();
		var y =  position * (c - d)/(a - b);
		$('#preview').scrollTop(y);
	});
}

function convertMarkdown(string){
	var rowString = string.replace(/\t/g, "    ");
	var result = marked(rowString);
	result.replace(/\[\[(.+)\]\]/g , "<a href='/view/$1'>$1</a>");
	return result;
}

function changePreview(){
	$('#preview').html(convertMarkdown($('#editor').val()));
}

$(function(){
	$('#editor').keyup(changePreview);
	blockTabKey($('#editor'));
	scrollSync();
});