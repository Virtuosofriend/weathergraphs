///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																		//
//							WeatherGraphs - Standalone Script - Created by Dimitris Sakellariou											//	
//                                                                                                          							//
//											www.euacosmos.com & www.lamiaweather.com													//
//																																		//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
function piechartavg(aboveavgperc,belowavgperc) {
	
	if ( lang == "en") {
		var title = "Temperature Analysis";
		var subtitle = "Percentage";
		var tmptitle1 = "Above Average";
		var tmptitle2 = "Below Average";
	} else {
		var title = "Στατιστικά Θερμοκρασίας";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Πάνω απο το Μ.Ο.";
		var tmptitle2 = "Κάτω απο το Μ.Ο.";
	}
	
		Highcharts.chart('piechartavg', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: aboveavgperc
			}, {
				name: tmptitle2,
				y: belowavgperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function piechartabovemax(abovemaxperc) {
	
	if ( lang == "en") {
		var title = "Hot Weather Analysis";
		var subtitle = "Percentage";
		var tmptitle1 = "Above Max";
		var tmptitle2 = "Below Max";
	} else {
		var title = "Στατιστικά ζεστού καιρού";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Υψηλότερα Μεγ";
		var tmptitle2 = "Χαμηλότερα Μεγ";
	}
	
		Highcharts.chart('piechartabovemax', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: abovemaxperc
			}, {
				name: tmptitle2,
				y: 100 - abovemaxperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function piechartbelowmin(belowminperc) {
	
	if ( lang == "en") {
		var title = "Cold Weather Analysis";
		var subtitle = "Percentage";
		var tmptitle1 = "Above Min";
		var tmptitle2 = "Below Min";
	} else {
		var title = "Στατιστικά ψυχρού καιρού";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Υψηλότερα Ελαχ";
		var tmptitle2 = "Χαμηλότερα Ελαχ";
	}
	
		Highcharts.chart('piechartbelowmin', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: 100 - belowminperc
			}, {
				name: tmptitle2,
				y: belowminperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function piechartrainvsdraought(rainyperc,dryperc) {

	if ( lang == "en") {
		var title = "Wet vs Dry days";
		var subtitle = "Percentage";
		var tmptitle1 = "Dry days";
		var tmptitle2 = "Wet days";
	} else {
		var title = "Βροχερές & Στεγνές μέρες";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Στεγνές μέρες";
		var tmptitle2 = "Βροχερές μέρες";
	}
	
		Highcharts.chart('piechartrainvsdraught', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: dryperc
			}, {
				name: tmptitle2,
				y: rainyperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function scatterrain(montharr){

	if ( lang == "en") {
		var title = "Month Rain Graph";
		var subtitle = "Hover over the chart for details";
		var tmptitle1 = "Precipitation";
	} else {
		var title = "Εξέλιξη μηνιαιού υετού";
		var subtitle = "Χρησιμοποιήστε το ποντίκι για λεπτομέριες";
		var tmptitle1 = "Υετός";
		
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ']
			}
		});
	
	}
	
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});
	
	Highcharts.chart('scatterrain', {
		chart: {
			backgroundColor: "#eeeeee",
			width: 650,
			height: 300,
			margin: [10, 10, 10, 10],
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		subtitle: {
			text: subtitle,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		xAxis: {
			type: 'datetime',
			visible: true
			},
		yAxis:{        
			title: {
				text: title + ' (mm)'
				},
			labels: {
				format: '{value} '
			},
		},
		legend: {
			enabled: false
		},
		tooltip: {
			pointFormat: tmptitle1 + ': <b> {point.y} mm</b>'
		},
		series: [{
			name: title,
			color: '#2196f3',
			data: montharr
			}]
	});
}

function piecharthumavg(aboveavgperc) {
	
	if ( lang == "en") {
		var title = "Humidity Analysis";
		var subtitle = "Percentage";
		var tmptitle1 = "Above Average";
		var tmptitle2 = "Below Average";
	} else {
		var title = "Στατιστικά Υγρασίας";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Πάνω απο το Μ.Ο.";
		var tmptitle2 = "Κάτω απο το Μ.Ο.";
	}
	
		Highcharts.chart('piecharthumavg', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: aboveavgperc
			}, {
				name: tmptitle2,
				y: 100 - aboveavgperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function piecharthumcomfort(comfortperc) {
	
	if ( lang == "en") {
		var title = "Human Comfort";
		var subtitle = "Percentage";
		var tmptitle1 = "Discomfort";
		var tmptitle2 = "Feels ok";
	} else {
		var title = "Αίσθηση Ανθρώπου";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Δυαρέσκεια";
		var tmptitle2 = "Καλή αίσθηση";
	}
	
		Highcharts.chart('piechartcomfort', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: comfortperc
			}, {
				name: tmptitle2,
				y: 100 - comfortperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function piecharthumidity(comfortperc,lowperc,mediumperc,highperc) {
		var tmptitle1 = "0-30";
		var tmptitle2 = "35-45";
		var tmptitle3 = "46-66";
		var tmptitle4 = "66-100";
	if ( lang == "en") {
		var title = "Comfort Levels";
		var subtitle = "Percentage";
	} else {
		var title = "Επίπεδα Αίσθησης Υγρασίας";
		var subtitle = "Ποσοστό";
	}
	
		Highcharts.chart('piecharthumidity', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: lowperc
			}, {
				name: tmptitle2,
				y: comfortperc,
				sliced: true,
				selected: true
			}, {
				name: tmptitle3,
				y: mediumperc,
			}, {
				name: tmptitle4,
				y: highperc
			}]
		}]
	});
}

function piechartbaroavg(aboveavgperc) {
	
	if ( lang == "en") {
		var title = "Barometer Analysis";
		var subtitle = "Percentage";
		var tmptitle1 = "Above Average";
		var tmptitle2 = "Below Average";
	} else {
		var title = "Στατιστικά Βαρομετρικής Πίεσης";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Πάνω απο το Μ.Ο.";
		var tmptitle2 = "Κάτω απο το Μ.Ο.";
	}
	
		Highcharts.chart('piechartbaroavg', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: aboveavgperc
			}, {
				name: tmptitle2,
				y: 100 - aboveavgperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function piecbaromean(abovemeanperc,belowmeanperc) {
		
	if ( lang == "en") {
		var title = "Abovs vs Below mean Sea Level Pressure (1013 hPa)";
		var subtitle = "Percentage";
		var tmptitle1 = "Higher";
		var tmptitle2 = "Lower";
	} else {
		var title = "Σύγκριση με την Πίεση στο Επίπεδο της Θάλασσας (1013 hPa)";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Υψηλότερη";
		var tmptitle2 = "Χαμηλότερη";
	}
	
		Highcharts.chart('piechartbaromean', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: abovemeanperc,
				sliced: true,
				selected: true
			}, {
				name: tmptitle2,
				y: belowmeanperc,
			}]
		}]
	});
}

function piecbarodays(baddaysperc,gooddaysperc,normaldaysperc) {
		
	if ( lang == "en") {
		var title = "Days Summary (based on barometer forecast)";
		var subtitle = "Percentage";
		var tmptitle1 = "Fair weather";
		var tmptitle2 = "Bad weather";
		var tmptitle3 = "Little change";
	} else {
		var title = "Κατάσταση ημερών (σύμφωνα με την πρόγνωση του βαρομέτρου)";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Καλός καιρός";
		var tmptitle2 = "Κακός καιρός";
		var tmptitle3 = "Μικρές καιρικές αλλαγές";
	}
	
		Highcharts.chart('piechartbarodays', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: gooddaysperc,
				sliced: true,
				selected: true
			}, {
				name: tmptitle2,
				y: baddaysperc
			}, {
				name: tmptitle3,
				y: normaldaysperc
			}]
		}]
	});
}

function piechartwindavg(aboveavgperc) {
	
	if ( lang == "en") {
		var title = "Wind Speed Analysis";
		var subtitle = "Percentage";
		var tmptitle1 = "Above Average";
		var tmptitle2 = "Below Average";
	} else {
		var title = "Στατιστικά Ανέμου";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Πάνω απο το Μ.Ο.";
		var tmptitle2 = "Κάτω απο το Μ.Ο.";
	}
	
		Highcharts.chart('piechartwindavg', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: aboveavgperc
			}, {
				name: tmptitle2,
				y: 100 - aboveavgperc,
				sliced: true,
				selected: true
			}]
		}]
	});
}

function columnnwind(avgday,kwhperday){
	
	if ( lang == "en") {
		var title = "Daily Avg Speed and Daily Estimated Power";
		var subtitle = "Day";
		var tmptitle1 = "Avg Speed";
		var tmptitle2 = "Avg Power";
	} else {
		var title = "Μέσος Ημερήσιος Άνεμος & Μέση Ηλεκτρική Ενέργεια";
		var subtitle = "Ημέρα";
		var tmptitle1 = "Μέση Ταχύτητα";
		var tmptitle2 = "Μέση Ενέργεια";
	}
	
	var cats = [];
	for (var i=0; i < avgday.length; i++) {
		var num = i +1;
		cats.push("<strong>" + subtitle + "</strong> " + num);
	}
	
		Highcharts.chart('columnavgday', {
		chart: {
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'column',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		legend: {
			align: 'right',
			verticalAlign: 'top',
			layout: 'horizontal',
			useHTML: true,
			lineHeight: 8,
			x: 0,
			y: 40
		},
		xAxis: {
			categories: cats,
			crosshair: true,
			visible: false
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Wind Speed (m/s)'
			}
		},
		tooltip: {
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: tmptitle1,
			data: avgday,
			color: '#8bc34a',
			tooltip: {
                valueSuffix: ' m/s'
            }
		 },{
			name: tmptitle2,
			data: kwhperday,
			color: '#f44336',
			tooltip: {
                valueSuffix: ' kW/m<sup>2</sup>'
            }
		}]
	});
}

function piechartwind(calmperc,verylowperc,lowperc,mediumperc,uppermediumperc,strongperc,stormperc) {
		
	if ( lang == "en") {
		var title = "Wind Levels";
		var subtitle = "Percentage";
		var tmptitle1 = "Light air";
		var tmptitle2 = "Light breeze";
		var tmptitle3 = "Gentle breeze";
		var tmptitle4 = "Moderate breeze";
		var tmptitle5 = "Fresh breeze";
		var tmptitle6 = "Strong breeze";
		var tmptitle7 = "Near Gale";
	} else {
		var title = "Επίπεδα Ανέμου";
		var subtitle = "Ποσοστό";
		var tmptitle1 = "Σχεδόν Άπνοια";
		var tmptitle2 = "Πολύ Ασθενής";
		var tmptitle3 = "Ασθενής";
		var tmptitle4 = "Σχεδόν Μέτριος";
		var tmptitle5 = "Μέτριος";
		var tmptitle6 = "Ισχυρός";
		var tmptitle7 = "Σχεδόν Θυελλώδης";
	}
	
		Highcharts.chart('piechartwind', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			backgroundColor: "#eeeeee",
			width: 350,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'pie',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			labelFormatter: function() {
				return this.name + " (" + this.y + "%)";
			},
			layout: "vertical",
			align: "right",
			itemStyle: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '11px'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				size: "75%",
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: subtitle,
			colorByPoint: true,
			data: [{
				name: tmptitle1,
				y: calmperc
			}, {
				name: tmptitle2,
				y: verylowperc,
				sliced: true,
				selected: true
			}, {
				name: tmptitle3,
				y: lowperc,
			}, {
				name: tmptitle4,
				y: mediumperc
			}, {
				name: tmptitle5,
				y: uppermediumperc,
			}, {
				name: tmptitle6,
				y: strongperc,
			}, {
				name: tmptitle7,
				y: stormperc
			}]
		}]
	});
}

function columnnwinddir(avgday){
	
	if ( lang == "en") {
		var title = "Daily Dominant Wind Direction";
		var subtitle = "Day";
		var tmptitle1 = "Direction";
		var tmptitle2 = "Avg Power";
	} else {
		var title = "Ημερήσια Κυρίαρχη Δ/νση Ανέμου";
		var subtitle = "Ημέρα";
		var tmptitle1 = "Διεύθυνση";
		var tmptitle2 = "Μέση Ενέργεια";
	}
	
	var cats = [];
	for (var i=0; i < avgday.length; i++) {
		var num = i +1;
		cats.push("<strong>" + subtitle + "</strong> " + num);
	}
	
		Highcharts.chart('columndirday', {
		chart: {
			backgroundColor: "#eeeeee",
			width: 550,
			height: 300,
			margin: [10, 10, 10, 10],
			type: 'column',
			style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		title: {
			text: title,
			style: {
				fontFamily: '"Fira Sans" ,sans-serif',
				fontSize: '13px'
			}
		},
		legend: {
			align: 'right',
			verticalAlign: 'top',
			layout: 'vertical',
			useHTML: true,
			enabled: false,
			lineHeight: 8,
			x: 0,
			y: 40
		},
		xAxis: {
			categories: cats,
			crosshair: true,
			visible: false
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Direction'
			}
		},
		tooltip: {
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: tmptitle1,
			data: avgday,
			color: '#8bc34a',
			tooltip: {
                valueSuffix: ' \xB0'
            }
		}]
	});
}