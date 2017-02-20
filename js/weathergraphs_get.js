
	$.ajax({
					type: 'get',
					url: files + month + year + 'lgcsv' + version + '.csv',
					cache: false,
					success: graphsData,
				});
