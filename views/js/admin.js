loadReservations();
function loadReservations() {
	resTable = document.querySelector('.reservations-table tbody');
	resTable.innerHTML = 'Loading...';
	$.ajax({url: "/api/reservations", success: function(result){
		
		resTable.innerHTML = result.reduce(function(acc,res){
            return acc + `<tr>
            <th scope="col">${res.reservation_id}</th>
            <th scope="col">${res.service_type}</th>
            <th scope="col">${res.client_name}</th>
            <th scope="col">${res.client_tax_code}</th>
            <th scope="col">${res.order_state}</th>
			<th scope="col">${moment(res.created_at).format('DD-MM-YYYY')}</th>
			<th scope="col">${res.approved_by}</th>
			<th scope="col">${res.notes}</th>
			<th scope="col">${res.amount}</th>
		  </tr>`
		},'')
      }});
      
}