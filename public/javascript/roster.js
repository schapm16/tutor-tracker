function renderRoster(roster) {

	$('#roster').empty();

for (let i = 1; i < roster.length; i ++) {
	$('#roster').append(`<div class="col-6">
		<div class="card bg-light">
		<div class="card-header text-center">
			<span><h3>Student: ${roster[i][2]}</h3></span>
			<span class="fas fa-undo fa-sm" data-action="undo" data-index="${i}" data-toggle="tooltip" data-placement="bottom" title="Undo Changes"></span>
			<span class="far fa-save fa-lg" data-action="save" data-index="${i}" data-toggle="tooltip" data-placement="bottom" title="Save Changes"></span>
			<span class="far fa-window-close fa-lg" data-action="delete" data-index="${i}" data-toggle="tooltip" data-placement="bottom" title="Delete Student"></span>
		</div>
		<div class="card-body">
			<form>
				<div class="form-group row">
					<label for="name" class="col-3">Name</label>
					<input id="name" class="col-8 form-control" data-index="${i}" type="text" value="${roster[i][2]}" >
				</div>

				<div class="form-group row">
					<label for="class-code" class="col-3">Class Code</label>
					<input id="class-code" class="col-8 form-control" data-index="${i}" type="text" value="${roster[i][0]}" >
				</div>

				<div class="form-group row">
					<label for="email" class="col-3">Email</label>
					<input id="email" class="col-8 form-control" data-index="${i}" type="text" value="${roster[i][3]}" >
				</div>
			</form>
		</div>
		</div>
		</div>
		`);

	$('.tooltip').remove();
	$('[data-toggle="tooltip"]').tooltip('dispose');
	$('[data-toggle="tooltip"]').tooltip();
	}
}


$(document).ready(function() {
	console.log('Roster script running');
	let currentData;

	requestRoster()
		.done(function(data) {
		console.log(data);
		renderRoster(data);
		currentData = data;
		});

	$(document).on('click', 'span[data-action="undo"]', function() {
		requestRoster()
			.done(function(data) {
			console.log(data);
			renderRoster(data);
			currentData = data;
			});
	});

	$(document).on('click', 'span[data-action="save"]', function() {
		let dataIndex = parseInt($(this).attr('data-index'));
		currentData[dataIndex][2] = $(`#name[data-index="${dataIndex}"`).val();
		currentData[dataIndex][0] = $(`#class-code[data-index="${dataIndex}"`).val();
		currentData[dataIndex][3] = $(`#email[data-index="${dataIndex}"`).val();
		writeRoster(currentData)
			.done(function() {
				requestRoster()
					.done(function(data) {
					console.log(data);
					renderRoster(data);
					currentData = data;
					});
			});
	});

	$(document).on('click', 'span[data-action="delete"]', function() {
		let dataIndex = parseInt($(this).attr('data-index'));
		currentData.splice(dataIndex, 1);
		writeRoster(currentData)
			.done(function() {
				requestRoster()
					.done(function(data) {
					console.log(data);
					renderRoster(data);
					currentData = data;
					});
			});	
	});

	


});