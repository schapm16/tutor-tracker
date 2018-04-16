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
					<label for="class-code" class="col-4">Class Code</label>
					<input id="class-code" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][0]}" >
				</div>

				<div class="form-group row">
					<label for="grad-date" class="col-4">Graduation Date</label>
					<input id="grad-date" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][1]}" >
				</div>

				<div class="form-group row">
					<label for="name" class="col-4">Name</label>
					<input id="name" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][2]}" >
				</div>

				<div class="form-group row">
					<label for="email" class="col-4">Email</label>
					<input id="email" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][3]}" >
				</div>

				<div class="form-group row">
					<label for="github" class="col-4">GitHub</label>
					<input id="github" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][4]}" >
				</div>

				<div class="form-group row">
					<label for="topics" class="col-4">Topics</label>
					<input id="topics" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][5]}" >
				</div>

				<div class="form-group row">
					<label for="timezone" class="col-4">Timezone</label>
					<input id="timezone" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][6]}" >
				</div>

				<div class="form-group row">
					<label for="intro-date" class="col-4">Intro Sent On </label>
					<input id="intro-date" class="col-7 form-control" data-index="${i}" type="text" value="${roster[i][7]}" >
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
		let inputs = $(`input[data-index="${dataIndex}"]`);
		for (let i = 0; i < inputs.length; i++) {
			console.dir(inputs);
			currentData[dataIndex][i] = inputs.eq(i).val();
		}
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