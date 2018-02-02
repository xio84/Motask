function showAlert(message,alerttype) {

	$('#alert-area').append('<div id="alertdiv" class="alert alert-' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>');
}

$(document).ready(function() {
	$.ajaxSetup({
	  headers: {
	    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	  }
	});

});

$(document).on('change','#change-role',function(){
		user_id = $(this).attr('data-id');
		role = $(this).find("option:selected").attr('value');

	    $.ajax({
		    url: '/admin/manage-role',
		    type: 'PATCH',
		    data: { 'user_id': user_id,
		    		'role': role,
			},
		    success: function(result) {
		    	if(result.status == 'success')
		        	showAlert(result.message, 'success');
		        else if (result.status == 'error')
		        	showAlert(result.message, 'danger');
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
				showalert('Server error', 'danger');
			}
		});
	});

function deleteProject(id) {
	$.ajax({
	    url: '/project/delete',
	    type: 'DELETE',
	    data: {'id': id},
	    success: function(result) {
	        window.location.replace('/home');
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
			if(xhr.status==403) {
			    window.location.replace('/forbidden');
			}
		}
	});	
}

