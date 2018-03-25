

function renderRoster(roster) {

for (let i = 1; i < roster.length; i ++) {
	$('#roster').append(`<div class="col-6">
		<div class="card bg-light">
		<div class="card-header text-center">
			<span><h3>Student: ${roster[i].name}</h3></span>
			<span class="fas fa-undo fa-sm" data-toggle="tooltip" data-placement="bottom" title="Undo Changes"></span>
			<span class="far fa-save fa-lg" data-toggle="tooltip" data-placement="bottom" title="Save Changes"></span>
			<span class="far fa-window-close fa-lg" data-toggle="tooltip" data-placement="bottom" title="Delete Student"></span>
		</div>
		<div class="card-body">
			<form>
				<div class="form-group row">
					<label for="name" class="col-3">Name</label>
					<input id="name" class="col-8 form-control" type="text" value="${roster[i].name}">
				</div>

				<div class="form-group row">
					<label for="class-code" class="col-3">Class Code</label>
					<input id="class-code" class="col-8 form-control" type="text" value="${roster[i].classCode}">
				</div>

				<div class="form-group row">
					<label for="email" class="col-3">Email</label>
					<input id="email" class="col-8 form-control" type="text" value="${roster[i].email}">
				</div>
			</form>
		</div>
		</div>
		</div>
		`);

	$('[data-toggle="tooltip"]').tooltip();
}


}

$(document).ready(function() {
	console.log('Roster script running');
	
	requestRoster().done(function(data) {
		console.log(data);
		renderRoster(data);
	});


});