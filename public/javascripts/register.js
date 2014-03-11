var check = {
	name: false, password: false, email: false, id: false
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function changeForm(form, state){
	$('#' + form + "Form").removeClass().addClass('form-group has-' + state);
	if( state == 'success' ){ check[form] = true } else { check[form] = false };
	if( check.name && check.password && check.email && check.id){
		$('#submit_register').removeAttr('disabled');
	}else{
		$('#submit_register').attr('disabled','disabled');
	}
}

$(function(){
	$('#username').change(function(){
		var username = $(this).val();
		if( username != '') changeForm('name', 'success');
		else changeForm('name', 'error');
	});

	$('#userid').change(function(){
		var userid = $(this).val();
		if( userid.length < 5) changeForm('id', 'error');
		else changeForm('id', 'success');
	});

	$('#passwordForm input').change(function(){
		var password = $('#password').val();
		var passwordcheck = $('#passwordcheck').val();
		if( password.length < 6) changeForm('password', 'warning');
		else if( password != passwordcheck ) changeForm('password','error');
		else changeForm('password', 'success');
	});

	$('#email').change(function(){
		var email = $('#email').val();
		if( validateEmail(email)) changeForm('email', 'success');
		else changeForm('email', 'error');
	});
});