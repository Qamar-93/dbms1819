$( document ).ready(function() {
    $('input.datepicker_1').datepicker({
		dateFormat: 'yy-mm-dd',
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
        defaultDate: +0,
        datesDisabled: ['2019/06/6'],
		showAnim: "fold"
	});

$('.datepicker.sample').datepicker({
		dateFormat: 'yy-mm-dd',
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
        defaultDate: +0,
        datesDisabled: ['2019/06/6'],
		showAnim: "fold"
	});
	$('.datepicker').datepicker({
		onSelect: function(dateText, inst) {
		  $("input[name='something']").val(dateText);
		}
	});
	jQuery.validator.addMethod("codfiscale", function(value) { 
        var regex = /[A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1}/;
        return value. match(regex);  
    }, "Please insert a valid italian identification number");
    $(document).ready(function(){
        $("#form").validate();
	});
	var taxCodeForm = document.querySelector("#form");
	if(taxCodeForm){
		taxCodeForm.addEventListener('submit',function(e){
			e.preventDefault();
			if($("#form").valid()) {
				var fromInput = document.querySelector('#form_from');
				alert(fromInput.value);
				$("#form :input").prop("disabled", true);
				taxCodeForm.classList.add('disabled');
			}else{
				alert("please input valid values");
			}
		})
	}
});