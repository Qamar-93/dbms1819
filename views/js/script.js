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
function loadMyReservations(userId='tax_code2') {
	resTable = document.querySelector('.myReservation-table tbody');
	resTable.innerHTML = 'Loading...';
	$.ajax({url: "http://localhost:4000/api/my-reservations?userId="+userId, success: function(result){
		
		resTable.innerHTML = result.reduce(function(acc,res){
			return acc + `<tr>
			<th scope="col">${moment(res.created_at).format('DD-MM-YYYY')}</th>
			<th scope="col">${res.amount}</th>
			<th scope="col">${JSON.parse(res.duration)}</th>
			<th scope="col">${res.type}</th>
			<th scope="col">${res.state}</th>
		  </tr>`
		},'')
	  }});
}
function loadRooms() {
	resTable = document.querySelector('#roomsList');
	resTable.innerHTML = 'Loading...';
	$.ajax({url: "http://localhost:4000/api/availabe-rooms", success: function(result){
		
		resTable.innerHTML = result.reduce(function(acc,res){
			return acc + `<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div class="resume-content">
              <h3 class="mb-0">${res.notes}</h3>
              <ul>
                <li>capacity: ${res.capacity} Adults</li>
                <li>Price: ${res.price}$ / night</li>
              </ul>
            </div>
            <div class="resume-date text-md-right">
              <a class="text-primary text-left" href="#">
                  view more details
              </a>
              <a href="#book_room" class="book_it js-scroll-trigger">
                  Book it
              </a>
            </div>
          </div>`
		},'');
	  }});
}