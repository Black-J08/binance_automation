$("#logOut").on("click", function () {
	$.ajax({
		url: "/accounts/logout/",
		method: "POST",
		data: "logout",
		headers: { "X-CSRFToken": csrftoken },
		success: function () {
			document.location.reload();
		},
	});
});
