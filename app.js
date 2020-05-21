var g = N$('John', 'doe');
g.greet().setLang('ib').greet(true).log();

$('#login').click(function(){

    var loginGrtr = N$('John', 'Doe');

    $('#logindiv').hide();

    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});