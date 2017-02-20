		// Initial build of the graph, needs some input data
		var initialdate = new Date();
		var year = initialdate.getFullYear();
		var month = initialdate.getMonth();
			month = month + 1;					// remember to set the proper month according to JS

		// Settings area
		//
		//	
		//	Global Variables
		var lang = "en";							// en: English language , gr: Greek language
		var station = 'LamiaWeather.com';			// Your station name (it will be displayed on the graphs as well as on the page title)
		var files = "csv/";							// Folder where the csv files are located. Remember the / at the end
		var version = "10";							// Based on the csv file that you are using, you can choose between the
													// 60 minutes file --> 60
													// 30 minutes file --> 30
													// 10 minutes file --> 10
													// 
													// 
													// Keep in mind that the 1 minute file will cause a huge delay on plotting times
													//
		var solar = "1";							// 1 to use solar
													// 0 to disable
													//
		var detailsbox = "1";						// Set 1 to show the details box below graph
													// 0 to disable it
		//
		//
		// No edit after this point --------------->
		
		Cookies.set('graphs_lang', lang, { expires: 365 });

		var month_en = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		};
		
		var month_gr = {
			1: "Ιανουάριος",
			2: "Φεβρουάριος",
			3: "Μάρτιος",
			4: "Απρίλιος",
			5: "Μάιος",
			6: "Ιούνιος",
			7: "Ιούλιος",
			8: "Αύγουστος",
			9: "Σεπτέμβριος",
			10: "Οκτώβριος",
			11: "Νοέμβριος",
			12: "Δεκέμβριος"
		};
		
		if ( version == "" ) {
			$("#1minlabel").addClass("active");
			$("#10minlabel").addClass("disabled");
			$("#30minlabel").addClass("disabled");
			$("#60minlabel").removeClass("active").addClass("disabled");
		} else if (version == "10")  {
			$("#10minlabel").addClass("active");
			$("#30minlabel").addClass("disabled");
			$("#60minlabel").removeClass("active").addClass("disabled");
		} else if (version == "30") {
			$("#10minlabel").addClass("disabled");
			$("#30minlabel").addClass("active");
			$("#60minlabel").removeClass("active").addClass("disabled");
		} else {
			$("#10minlabel").addClass("disabled");
			$("#30minlabel").addClass("disabled");
		}
		
		if ( solar == "1" ) {
			$("#solaropt").removeClass("hidden");
			$("#solaropt2").removeClass("hidden");
		}
		
		if ( detailsbox == "0" ) {
			$("#details").addClass("hidden");
		}
		
		$("#time_interval").change(function() {				// showing the warning sign if the 1 minute is selected
			$("#warning_sign").removeClass("hidden");
		});
		
		var titlepage = $("title");

		
		// General settings
		
		function returngraph(data){
			$("#container").empty();
			$("#details").empty();
			if (value_graph == "temperature") {
				graphsData(data);
			} else if (value_graph == "dewpoint") {
				dewpointGraph(data);
			} else if (value_graph == "windspeed") {
				windspdGraph(data);
			} else if (value_graph == "gstspeed") {
				gstspdGraph(data);
			} else if (value_graph == "winddir") {
				winddirGraph(data);
			} else if (value_graph == "rain") {
				rainGraph(data);
			} else if (value_graph == "barometer") {
				baroGraph(data);
			} else if (value_graph == "humidity") {
				humGraph(data);	
			}
		}
		
			var field_graph = $("a[name='graphset']");
			var field_date = $("fieldset[name='date']");
			var field_time = $("fieldset[name='time']");
	
		$("a[name='graphset']").click(function() {	
         
			value_graph = $(this).attr("value");
			$("a[name='graphset']").not(this).removeClass("btn-success");
			$(this).addClass("btn-success");

			field_date.removeAttr("disabled");
			field_time.removeAttr("disabled");
			$("#months").removeClass("disabled");
		});

		$( "#months").click(function() {
			
			var value_date = $("select[name='date']").val();
			var value_text_en = field_graph.attr("text_en");
			var value_text_gr = field_graph.attr("text_gr");
			if (value_date.length > 5) {
				month = value_date.slice(0,2);
				year = value_date.slice(2,6);
			} else {
				month = value_date.slice(0,1);
				 year = value_date.slice(1,5);
			}

			var value_time = $("label.active > input[type='radio']").attr("value");
				version = value_time;
				if (value_graph != "solar") {
					$.ajax({
							type: 'get',
							url: files + value_date + 'lgcsv' + value_time + '.csv',
							cache: false,
							success: returngraph,
							context: {
								value_text_en: value_text_en,
								value_text_gr: value_text_gr
							}
						});
				} else {
					$.ajax({
							type: 'get',
							url: files + value_date + 'vantagelogcsv.csv',
							cache: false,
							success: solarGraph,
							context: {
								value_text_en: value_text_en,
								value_text_gr: value_text_gr
							}
						});
				}
						
		  
			});
			
/* General Functions */

function climadata(month,avgdata,dataMin,dataMax) {
	var climaTavg = clima[month-1].avgT;
	var climaTmax = clima[month-1].maxT;
	var climaTmin = clima[month-1].minT;
	
	if ( lang == "en") {
		if (avgdata > climaTavg) {
			return "<span class='title-slider color-white label bg-deeporange'>Month is warmer than climate average data (" + climaTavg + "\xB0C)</span>" ;
		} else {
			return "<p class='title-slider color-white label bg-blue'>Month is colder than climate average data (" + climaTavg + "\xB0C)</span>" ;
		}
	} else {
		if (avgdata > climaTavg) {
			return "<span class='title-slider color-white label bg-deeporange'>Ο μήνας είναι πιο ζεστός απο τις μέσες κλιματικές τιμές (" + climaTavg + "\xB0C)</span>" ;
		} else {
			return "<p class='title-slider color-white label bg-blue'>Ο μήνας είναι πιο ψυχρός απο τις μέσες κλιματικές τιμές (" + climaTavg + "\xB0C)</span>" ;
		}
	}

}

function climaraindata(month,avgdata_1, avgdata_2) {
	var climaRain = clima[month-1].avgRain;
	
	if ( lang == "en") {
		if (avgdata_2 > climaRain) {
			return "<span class='title-slider color-white label bg-darkblue'>Month is wetter than climate average data (" + climaRain + "mm)</span>" ;
		} else {
			return "<p class='title-slider color-dark label bg-yellow'>Month is drier than climate average data (" + climaRain + "mm)</span>" ;
		}
	} else {
		if (avgdata_2 > climaRain) {
			return "<span class='title-slider color-white label bg-darkblue'>Ο μήνας είναι πιο βροχερός απο τις μέσες κλιματικές τιμές (" + climaRain + "mm)</span>" ;
		} else {
			return "<p class='title-slider color-dark label bg-yellow'>Ο μήνας είναι πιο ξηρός απο τις μέσες κλιματικές τιμές (" + climaRain + "mm)</span>" ;
		}
	}
}

function climahumdata(month,avgdata) {
	var climaHum = clima[month-1].humidity;
	
	if ( lang == "en") {
		if (avgdata > climaHum) {
			return "<span class='title-slider color-white label bg-darkblue'>Month's humidity is higher than climate average data (" + climaHum + "%)</span>" ;
		} else {
			return "<p class='title-slider color-dark label bg-yellow'>Month's humidity is lower than climate average data (" + climaHum + "%)</span>" ;
		}
	} else {
		if (avgdata > climaHum) {
			return "<span class='title-slider color-white label bg-darkblue'>Η υγρασία του μήνα είναι υψηλότερη απο τις μέσες κλιματικές τιμές (" + climaHum + "%)</span>" ;
		} else {
			return "<p class='title-slider color-dark label bg-yellow'>Η υγρασία του μήνα είναι χαμηλότερη απο τις μέσες κλιματικές τιμές (" + climaHum + "%)</span>" ;
		}
	}
}

function climawinddata(month,avgdata) {
	var climaWind = clima[month-1].wind;
	
	if ( lang == "en") {
		if (avgdata > climaWind) {
			return "<span class='title-slider color-white label bg-deeporange'>Month is more windy than climate average data (" + climaWind + "m/s)</span>" ;
		} else {
			return "<p class='title-slider color-white label bg-green'>Mont is less windy than climate average data (" + climaWind + "m/s)</span>" ;
		}
	} else {
		if (avgdata > climaWind) {
			return "<span class='title-slider color-white label bg-deeporange'>Η μέση ταχύτητα ανέμου του μήνα είναι υψηλότερη απο τις μέσες κλιματικές τιμές (" + climaWind + "m/s)</span>" ;
		} else {
			return "<p class='title-slider color-white label bg-green'>Η μέση ταχύτητα ανέμου του μήνα είναι χαμηλότερη απο τις μέσες κλιματικές τιμές (" + climaWind + "m/s)</span>" ;
		}
	}
}
			
/* Graphs */

function graphsData(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Temperature";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var plotband1 = "Very cold";
		var plotband2 = "Cold";
		var plotband3 = "Chilly";
		var plotband4 = "Pleasant";
		var plotband5 = "Warm";
		var plotband6 = "Hot";
		var plotband7 = "Heatwave";
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Minimum</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Θερμοκρασία";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		var plotband1 = "Πολύ κρύος";
		var plotband2 = "Κρύος";
		var plotband3 = "Ψυχρός";
		var plotband4 = "Ευχάριστος";
		var plotband5 = "Ζεστός";
		var plotband6 = "Πολύ ζεστός";
		var plotband7 = "Καύσωνας";
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Ελάχιστη</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
	}

	
	var lines = data.split('\n');
		lines.pop();
    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[5]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray.push([x,mainPlotline]);
            }
        }
    });
	
	$(function () {
		  $("#container").highcharts({
			chart: {
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:{        
				title: {
					text: title + ' (\xB0C)'
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
				plotBands: [{ 
				// Minus
					from: -20,
					to: 0,
					color: 'rgba(0, 0, 0, 0)',
					label: {
						text: plotband1,
						style: {
							color: '#54b3b6'
						}
					}
				}, {
					from: 0,
					to: 10,
					color: 'rgba(68, 170, 213, 0.1)',
					label: {
						text: plotband2,
						style: {
							color: '#5490b6'
						}
					}
				}, { 
					from: 10,
					to: 18,
					color: 'rgba(0, 0, 0, 0)',
					label: {
						text: plotband3,
						style: {
							color: '#5480b6'
						}
					}
				}, { 
					from: 18,
					to: 26,
					color: 'rgba(68, 170, 213, 0.1)',
					label: {
						text: plotband4,
						style: {
							color: '#54b682'
						}
					}
				}, { 
					from: 26,
					to: 32,
					color: 'rgba(0, 0, 0, 0)',
					label: {
						text: plotband5,
						style: {
							color: '#dc8100'
						}
					}
				}, { 
					from: 32,
					to: 36,
					color: 'rgba(68, 170, 213, 0.1)',
					label: {
						text: plotband6,
						style: {
							color: '#d85c31'
						}
					}
				}, { 
					from: 36,
					to: 52,
					color: 'rgba(0, 0, 0, 0)',
					label: {
						text: plotband7,
						style: {
							color: '#f00098'
						}
					}
						   
				}]
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' °C',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
				name: title,
				negativeColor: '#2d98c4',
				lineWidth: 2,
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
				zones: [{ 
					value: 0,
					color: '#004ff0'  
				}, { 
					value: 10,
					color: '#5490b6'
				}, {
					value: 18,
					color: '#5480b6'
				}, {
					value: 26,
					color: '#54b682' 
				}, {
					value: 32,
					color: '#dc8100'
				}, {
					value: 36,
					color: '#d85c31'
				}, {
					value: 52,
					color: '#f00098'
				}]
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var avgdata = 0;
		var freezingcnt = 0;
		var heatingcnt = 0;
		var aboveavgcnt = 0;
		var abovemaxcnt = 0;
		var belowmincnt = 0;
		for (var i=0; i < graphsdataarray.length; i++) {
			avgdata += graphsdataarray[i][1];
			
			if (graphsdataarray[i][1] < 0) {
				freezingcnt++;
			}
			
			if (graphsdataarray[i][1] >= 36) {
				heatingcnt++
			}
			
			if (graphsdataarray[i][1] > clima[month-1].avgT) {
				aboveavgcnt++
			}
			
			if (graphsdataarray[i][1] >= clima[month-1].maxT) {
				abovemaxcnt++
			}
			
			if (graphsdataarray[i][1] <= clima[month-1].minT) {
				belowmincnt++
			}
		}

		if (version == "10") {
			var freezingdays = freezingcnt/6;
				freezingdays = freezingdays.toFixed(1) + hrs;
			var heatingdays = heatingcnt/6;
				heatingdays = heatingcnt.toFixed(1) + hrs;
		} else if (version == "30") {
			var freezingdays = freezingcnt/2;
				freezingdays = freezingdays.toFixed(1) + hrs;
			var heatingdays = heatingcnt/2;
				heatingdays = heatingcnt.toFixed(1) + hrs;
		} else if (version == "60") {
			var freezingdays = freezingcnt + hrs;
			var heatingdays = heatingcnt + hrs;
		} else {
			var freezingdays = freezingcnt + mins;
			var heatingdays = heatingcnt + mins;
		}
		
		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		var aboveavgperc = aboveavgcnt*100/graphsdataarray.length;
				aboveavgperc = Math.round(aboveavgperc);
		var belowavgperc = 100 - aboveavgperc;
		
		var abovemaxperc = abovemaxcnt*100/graphsdataarray.length;
				abovemaxperc = Math.round(abovemaxperc);
		var belowminperc = belowmincnt*100/graphsdataarray.length;
				belowminperc = Math.round(belowminperc);

		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
		});
		
		var tpmmin = graphsdataarray.reduce(function(min, arr) { 
                      return min[1] <= arr[1] ? min : arr;
                   });
		
		var Max_time = new Date(tpmmax[0]);
		var Min_time = new Date(tpmmin[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "<br>" + climadata(month,avgdata,dataMin,dataMax) + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " \xB0C </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMin + " \xB0C </strong><br>" + at + "<br>" + Min_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + avgdata + " \xB0C </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Max: </strong>" + clima[month-1].maxT + " \xB0C <span class='ml5'><strong>Min: </strong>" + clima[month-1].minT + " \xB0C <br>" +
							"<strong>Average: </strong>" + clima[month-1].avgT + " \xB0C</p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									"<p class='text-center'>Ice conditions: " + freezingdays + " <span class='ml5'>Heatwave conditions: " + heatingdays + "</span></p>" +
								"</div>";
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέγιστη: </strong>" + clima[month-1].maxT + " \xB0C <span class='ml5'><strong>Ελάχιστη: </strong>" + clima[month-1].minT + " \xB0C <br>" +
							"<strong>Μέση Τιμή: </strong>" + clima[month-1].avgT + " \xB0C</p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									"<p class='text-center'>Συνθήκες παγετού: " + freezingdays + " <span class='ml5'>Συνθήκες καύσωνα: " + heatingdays + "</span></p>" +
								"</div>";
		}
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartavg'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartabovemax'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartbelowmin'></div>";
		
		$("#details").html(tmpgraphdetails);
		piechartavg(aboveavgperc,belowavgperc);
		piechartabovemax(abovemaxperc);
		piechartbelowmin(belowminperc);
	});
}


// --------------------------------
// DewPoint & Heat Index Chart Plot
// --------------------------------
function dewpointGraph(data) { 
	var graphsdataarray1 = [];
	var graphsdataarray2 = [];
	
	if ( lang == "en") {
		var title = "Dewpoint & Heat Index";
		var tmptitle1 = "Dewpoint";
		var tmptitle2 = "Heat Index";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var tablehead1 = "<th class='bg-red color-white fs-almostfull text-center'>Maximum <br>Heat Index</th><th class='bg-cyan color-white fs-almostfull text-center'>Minimum <br>Heat Index</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average <br>Heat Index</th>";
		var tablehead2 = "<th class='bg-red color-white fs-almostfull text-center'>Maximum <br>Dewpoint</th><th class='bg-cyan color-white fs-almostfull text-center'>Minimum <br>Dewpoint</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average <br>Dewpoint</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Σημείο Δρόσου & Αίσθηση Ζέστης";
		var tmptitle1 = "Σημείο Δρόσου";
		var tmptitle2 = "Αίσθηση Ζέστης";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead1 = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη <br>Αίσθηση Ζέστης</th><th class='bg-cyan color-white fs-almostfull text-center'>Ελάχιστη <br>Αίσθηση Ζέστης</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση τιμή <br>Αίσθηση Ζέστης</th>";
		var tablehead2 = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστο <br>Σημείου Δρόσου</th><th class='bg-cyan color-white fs-almostfull text-center'>Ελάχιστο <br>Σημείου Δρόσου</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση τιμή <br>Σημείου Δρόσου</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[16]);
            var secondaryPlotline = parseFloat(items[7]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray1.push([x,mainPlotline]);
				graphsdataarray2.push([x,secondaryPlotline]);
			}
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:[{        
				title: {
					text: tmptitle2 + ' (\xB0C)'
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,			
			}, { // Secondary yAxis
				title: {
					text: tmptitle1 + ' (\xB0C)'
				},
				labels: {
					format: '{value} '
				},
				opposite: true,
			}],
		
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' °C',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
			name: tmptitle2,
			color: '#c4392d',
			negativeColor: '#5b686d',
			lineWidth: 2,
			data: graphsdataarray1,
			events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
			zones: [{ 
					value: 0,
					color: '#004ff0'  
				}, { 
					value: 10,
					color: '#5490b6'
				}, {
					value: 18,
					color: '#5480b6'
				}, {
					value: 26,
					color: '#54b682' 
				}, {
					value: 32,
					color: '#dc8100'
				}, {
					value: 36,
					color: '#d85c31'
				}, {
					value: 52,
					color: '#f00098'
				}]
			 }, {
			name: tmptitle1,
			yAxis: 1,
			type: 'areaspline',
            color: '#045e83',
			lineWidth: 2,
            negativeColor: '#2d98c4',
            fillOpacity: 0.1,
			data: graphsdataarray2,
			events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
			zones: [{ 
					value: 0,
					color: '#004ff0'  
				}, { 
					value: 10,
					color: '#5490b6'
				}, {
					value: 18,
					color: '#5480b6'
				}, {
					value: 26,
					color: '#54b682' 
				}, {
					value: 32,
					color: '#dc8100'
				}, {
					value: 36,
					color: '#d85c31'
				}, {
					value: 52,
					color: '#f00098'
				}]
		}]
		
	});	
	
		var chart = $("#container").highcharts();
		var dataMin_1 = chart.yAxis[0].dataMin; 
		var dataMax_1 = chart.yAxis[0].dataMax;
		var dataMin_2 = chart.yAxis[1].dataMin; 
		var dataMax_2 = chart.yAxis[1].dataMax;
		var avgdata_1 = 0;
		var avgdata_2 = 0;
		var raincnt = 0;
		var drycnt = 0;
		var raineventcnt = 0;
		var rainarr = [];
		var daysrain = [];
		for (var i=0; i < graphsdataarray1.length; i++) {
			avgdata_1 += graphsdataarray1[i][1];
			
		}
		avgdata_1 = (avgdata_1 / graphsdataarray1.length).toFixed(2);
		
		var montharr = [];
		for (var j=0; j < graphsdataarray2.length; j++) {
			avgdata_2 += graphsdataarray2[j][1]; 
		
		}
		avgdata_2 = (avgdata_2 / graphsdataarray2.length).toFixed(2);

		if (version == "10") {
			var rainydays = raincnt/6;
				rainydays = rainydays.toFixed(1) + hrs;
			var rainyhrs = raineventcnt/6;
				rainyhrs = rainyhrs.toFixed(1);
			var drydays = drycnt/6;
				drydays = drydays.toFixed(1)
		} else if (version == "30") {
			var rainydays = raincnt/2;
				rainydays = rainydays.toFixed(1) + hrs;
			var rainyhrs = raineventcnt/2;
				rainyhrs = rainyhrs.toFixed(1);
			var drydays = drycnt/2;
				drydays = drydays.toFixed(1)
		} else if (version == "60") {
			var rainydays = raincnt + hrs;
			var rainyhrs = raineventcnt;
			var drydays = drycnt;
		} else {
			var rainyhrs = raineventcnt;
			var rainydays = raincnt + mins;
			var drydays = drycnt;
		}
		
		var tpmmax1 = graphsdataarray1.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
					});
		
		var tpmmin1 = graphsdataarray1.reduce(function(min, arr) { 
                      return min[1] <= arr[1] ? min : arr;
                   });
		var tpmmax2 = graphsdataarray2.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
					});
		
		var tpmmin2 = graphsdataarray2.reduce(function(min, arr) { 
                      return min[1] <= arr[1] ? min : arr;
                   });
		
		var Max_time1 = new Date(tpmmax1[0]);
		var Min_time1 = new Date(tpmmin1[0]);
		var Max_time2 = new Date(tpmmax2[0]);
		var Min_time2 = new Date(tpmmin2[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "<br>" + climaraindata(month,avgdata_1, avgdata_2) + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead1 + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax_1 + " \xB0C </strong><br>" + at + "<br>" + Max_time1.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMin_1 + " \xB0C </strong><br>" + at + "<br>" + Min_time1.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + avgdata_1 + " \xB0C </strong>" +
								"</td>" +
							  "</tr>" +
							"</table> " +
							"<table class='table table-responsive text-center'><tr>" + tablehead2 + "</tr>" +
							 "<tr>" +
							  "<td><strong>" + dataMax_2 + " \xB0C </strong><br>" + at + "<br>" + Max_time2.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMin_2 + " \xB0C </strong><br>" + at + "<br>" + Min_time2.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + avgdata_2 + " \xB0C </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Max: </strong>" + clima[month-1].maxT + " \xB0C <span class='ml5'><strong>Min: </strong>" + clima[month-1].minT + " \xB0C <br>" +
							"<strong>Average: </strong>" + clima[month-1].avgT + " \xB0C</p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Rain conditions: " + rainydays + " <span class='ml5'> Days with rain: " + daysrain.length + "</span></p>" +
								"</div>" ;
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέγιστη: </strong>" + clima[month-1].maxT + " \xB0C <span class='ml5'><strong>Ελάχιστη: </strong>" + clima[month-1].minT + " \xB0C <br>" +
							"<strong>Μέση Τιμή: </strong>" + clima[month-1].avgT + " \xB0C</p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Συνθήκες βροχής: " + rainydays + " <span class='ml5'> Ημέρες με βροχή: " + daysrain.length + "</span></p>" +
								"</div>" ;
		}
		
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartrainvsdraught'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-8 col-lg-8' id='scatterrain'></div>";
		
		$("#details").html(tmpgraphdetails);
							
							
	});
}




// --------------------------------
// Precipitation Chart Plot
// --------------------------------

function rainGraph(data) { 
	var graphsdataarray1 = [];
	var graphsdataarray2 = [];
	
	if ( lang == "en") {
		var title = "Precipitation";
		var tmptitle1 = "Daily Precipitation";
		var tmptitle2 = "Monthly Precipitation";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Daily Max</th><th class='bg-cyan color-white fs-almostfull text-center'>Monthly</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Βροχόπτωση";
		var tmptitle1 = "Ημερήσια";
		var tmptitle2 = "Μηνιαία";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη Ημερήσια</th><th class='bg-cyan color-white fs-almostfull text-center'>Μηνιαία</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[13]);
            var secondaryPlotline = parseFloat(items[14]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray1.push([x,mainPlotline]);
				graphsdataarray2.push([x,secondaryPlotline]);
			}
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:[{        
				title: {
					text: tmptitle1 + ' (mm) '
				},
				labels: {
					format: '{value}'
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,					
			}, { // Secondary yAxis
				title: {
					text: tmptitle2 + ' (mm) ',
				},
				labels: {
					format: '{value}'
				},
				opposite: true,
			}],
		
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' mm',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
			name: tmptitle1,
			color: '#c4392d',
			negativeColor: '#5b686d',
			lineWidth: 2,
			data: graphsdataarray1,
			events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
			zones: [{ 
					value: 0,
					color: '#004ff0'  
				}, { 
					value: 10,
					color: '#5490b6'
				}, {
					value: 18,
					color: '#5480b6'
				}, {
					value: 26,
					color: '#54b682' 
				}, {
					value: 32,
					color: '#dc8100'
				}, {
					value: 36,
					color: '#d85c31'
				}, {
					value: 52,
					color: '#f00098'
				}]
			 }, {
			name: tmptitle2,
			yAxis: 1,								// apply the second column to the second y-axis
			type: 'areaspline',						// Make the new plot fill the area
            color: '#045e83',
			lineWidth: 2,
            negativeColor: '#2d98c4',
            fillOpacity: 0.1,
			data: graphsdataarray2,
			events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},

		}]
		
	});	
	
		var chart = $("#container").highcharts();
		var dataMin_1 = chart.yAxis[0].dataMin; 
		var dataMax_1 = chart.yAxis[0].dataMax; 
		var dataMin_2 = chart.yAxis[1].dataMin; 
		var dataMax_2 = chart.yAxis[1].dataMax;
		var avgdata_1 = 0;
		var avgdata_2 = 0;
		var raincnt = 0;
		var drycnt = 0;
		var raineventcnt = 0;
		var rainarr = [];
		var daysrain = [];
		for (var i=0; i < graphsdataarray1.length; i++) {
			avgdata_1 += graphsdataarray1[i][1];
			
			if (graphsdataarray1[i][1] > 0) {
				raincnt++
				raineventcnt++
				rainarr.push([ graphsdataarray1[i][0],graphsdataarray1[i][1] ]);
				var tmpdate = new Date(graphsdataarray1[i][0]);
				daysrain.push(tmpdate.toString('dd/MM/yyyy'));
				if (i>0 && (graphsdataarray1[i][1] == graphsdataarray1[i-1][1])) {
					raincnt--
					
				}
			}
			
			if (graphsdataarray1[i][1] == 0) {
				drycnt++
			}
			
			for (var k=0; k < daysrain.length; k++) {
				if (daysrain[k] == daysrain[k-1]){
					daysrain.pop();
				}
			}
			
		}
		avgdata_1 = (avgdata_1 / graphsdataarray1.length).toFixed(2);
		
		var montharr = [];
		for (var j=0; j < graphsdataarray2.length; j++) {
			avgdata_2 += graphsdataarray2[j][1]; 
			
			var tmpdatemonth = new Date(graphsdataarray2[j][0]);
			if (tmpdatemonth == tmpdatemonth && graphsdataarray2[j][1] > 0) {
				if ( j>0 && graphsdataarray2[j][1] != graphsdataarray2[j-1][1]) {
					montharr.push([ graphsdataarray2[j][0],graphsdataarray2[j][1] ]);
				}
			}

		}
		avgdata_2 = (avgdata_2 / graphsdataarray2.length).toFixed(2);

		if (version == "10") {
			var rainydays = raincnt/6;
				rainydays = rainydays.toFixed(1) + hrs;
			var rainyhrs = raineventcnt/6;
				rainyhrs = rainyhrs.toFixed(1);
			var drydays = drycnt/6;
				drydays = drydays.toFixed(1)
		} else if (version == "30") {
			var rainydays = raincnt/2;
				rainydays = rainydays.toFixed(1) + hrs;
			var rainyhrs = raineventcnt/2;
				rainyhrs = rainyhrs.toFixed(1);
			var drydays = drycnt/2;
				drydays = drydays.toFixed(1)
		} else if (version == "60") {
			var rainydays = raincnt + hrs;
			var rainyhrs = raineventcnt;
			var drydays = drycnt;
		} else {
			var rainyhrs = raineventcnt;
			var rainydays = raincnt + mins;
			var drydays = drycnt;
		}
		
		var tpmmax = graphsdataarray1.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
		});
		
		var Max_time = new Date(tpmmax[0]);
		
		var rainyperc = raineventcnt*100/graphsdataarray1.length;
				rainyperc = Math.round(rainyperc);
		var dryperc = drycnt*100/graphsdataarray1.length;
				dryperc = Math.round(dryperc);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "<br>" + climaraindata(month,avgdata_1, avgdata_2) + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax_1 + " mm </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMax_2 + " mm </strong>" +
								"</td>" +
								"<td><strong>" + avgdata_1 + " mm </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Average: </strong>" + clima[month-1].avgRain + " mm <span class='ml5'> <strong>Rainy days: </strong>" + clima[month-1].daysRain + "</span></p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									"<p class='text-center'>Rain conditions: " + rainydays + " <span class='ml5'> Days with rain: " + daysrain.length + "</span></p>" +
								"</div>" ;
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέση Τιμή: </strong>" + clima[month-1].avgRain + " mm <span class='ml5'> <strong>Ημέρες βροχής: </strong>" + clima[month-1].daysRain + "</span></p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									"<p class='text-center'>Συνθήκες βροχής: " + rainydays + " <span class='ml5'> Ημέρες με βροχή: " + daysrain.length + "</span></p>" +
								"</div>" ;
		}
		
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartrainvsdraught'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-8 col-lg-8' id='scatterrain'></div>";
		
		$("#details").html(tmpgraphdetails);
		piechartrainvsdraought(rainyperc,dryperc);
		scatterrain(montharr);
	});
}

// --------------------------------
// Solar Power Chart Plot
// --------------------------------
function solarGraph(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Solar Power";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Minimum</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Ηλιακή Ενέργεια";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Ελάχιστη</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[5]);
            if(!isNaN(mainPlotline) && !isNaN(x) && mainPlotline != 0 && mainPlotline < 1400){		// bug fixing for Solar spikes that WD sometimes records
				graphsdataarray.push([x,mainPlotline]);
            }
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				type: 'areaspline',	
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:{        
				title: {
					text: title + ' (W/m<sup>2</sup>) '
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' W/m<sup>2</sup>',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
				name: title,
				color: '#eab320',
				fillColor: '#eab320',
				fillOpacity: 1,
				lineWidth: 2,
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var avgdata = 0;
		for (var i=0; i < graphsdataarray.length; i++) {
			avgdata += graphsdataarray[i][1]; 			
		}
		
		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		
		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
				});
		
		var tpmmin = graphsdataarray.reduce(function(min, arr) { 
                      return min[1] <= arr[1] ? min : arr;
                   });
		
		var Max_time = new Date(tpmmax[0]);
		var Min_time = new Date(tpmmin[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " W/m<sup>2</sup> </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMin + " W/m<sup>2</sup> </strong><br>" + at + "<br>" + Min_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + avgdata + " W/m<sup>2</sup> </strong>" +
								"</td>" +
							  "</tr>" +
							"</table>"
							
		if ( lang == "en") {
			tmpgraphdetails += "<p class='fs-almostfull text-justified'>The United Nations Intergovernmental Panel on Climate Change (IPCC) reported in 2014, that 'It is extremely likely that human influence has been the dominant cause of the observed warming since the mid-20th century'. <br> " + 
									"<strong>Support the Climate Reality Project , so we can live in a better planet, by clicking the picture on your right.</strong></p>";
		} else {
			tmpgraphdetails += "<p class='fs-almostfull text-justified'>Η μέση θερμοκρασία του πλανήτη έχει αυξηθεί 0.6 ± 0.2 °C από τα τέλη του 19ου αιώνα και η αύξηση αυτή οφείλεται σημαντικά στην ανθρώπινη δραστηριότητα των τελευταίων 50 ετών. <br> " + 
									"Υποστηρίξτε το <strong>Climate Reality Project</strong>, έτσι ώστε να προστάτεψουμε το σπίτι μας, κάνοντας click στην εικόνα στα δεξιά σας.</p>";
		}
							
		tmpgraphdetails +=	"</div><div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<a href='https://www.climaterealityproject.org/' target='_blank'><img src='images/climate.jpg' class='img-rounded pull-center'></a>" +
							"</div>";
		
		
		$("#details").html(tmpgraphdetails);
	});
}

// --------------------------------
// Barometer Chart Plot
// --------------------------------

function baroGraph(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Barometer";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Minimum</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Βαρόμετρο";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Ελάχιστη</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[8]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray.push([x,mainPlotline]);
            }
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:{        
				title: {
					text: title + ' (hPa) '
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' hPa',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
				name: 'Barometer',
				negativeColor: '#2d98c4',
				lineWidth: 2,
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
				zones: [{ 
					value: 960,
					color: '#004ff0'  
				}, { 
					value: 980,
					color: '#5490b6'
				}, {
					value: 1000,
					color: '#5480b6'
				}, {
					value: 1010,
					color: '#54b682' 
				}, {
					value: 1020,
					color: '#dc8100'
				}, {
					value: 1030,
					color: '#d85c31'
				}, {
					value: 1040,
					color: '#f00098'
				}]
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var avgdata = 0;
		var aboveavgcnt = 0;
		var meanbaro = 0;
		var belowmean = 0;
		var abovemean = 0;
		var badweather = 0;
		var gooddays = 0;
		var normaldays = 0;
		for (var i=0; i < graphsdataarray.length; i++) {
			avgdata += graphsdataarray[i][1];
			
			if (graphsdataarray[i][1] > clima[month-1].baro) {
				aboveavgcnt++
			}
			
			if (graphsdataarray[i][1] == 1013) {
				meanbaro++
			} else if ( graphsdataarray[i][1] < 1013) {
				belowmean++
			} else if (graphsdataarray[i][1] > 1013 ) {
				abovemean++
			}
			
			if ( graphsdataarray[i][1] < 1009.14 ) {
				badweather++
			} else if ( graphsdataarray[i][1] > 1022.69) {
				gooddays++
			} else if (graphsdataarray[i][1] >= 1009.14 && graphsdataarray[i][1] <= 1022.69 ) {
				normaldays++
			}
		}
		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		var aboveavgperc = aboveavgcnt*100/graphsdataarray.length;
				aboveavgperc = Math.round(aboveavgperc);
		var meanbaroperc = meanbaro*100/graphsdataarray.length;
				meanbaroperc = Math.round(meanbaroperc);
		var abovemeanperc = abovemean*100/graphsdataarray.length;
				abovemeanperc = Math.round(abovemeanperc);
		var belowmeanperc = belowmean*100/graphsdataarray.length;
				belowmeanperc = Math.round(belowmeanperc);
		var baddaysperc = badweather*100/graphsdataarray.length;
				baddaysperc = Math.round(baddaysperc);
		var gooddaysperc = gooddays*100/graphsdataarray.length;
				gooddaysperc = Math.round(gooddaysperc);
		var normaldaysperc = normaldays*100/graphsdataarray.length;
				normaldaysperc = Math.round(normaldaysperc);

		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
		});
		
		var tpmmin = graphsdataarray.reduce(function(min, arr) { 
                      return min[1] <= arr[1] ? min : arr;
                   });
		
		var Max_time = new Date(tpmmax[0]);
		var Min_time = new Date(tpmmin[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " hPa </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMin + " hPa </strong><br>" + at + "<br>" + Min_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + avgdata + " hPa </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'><strong>Average: </strong>" + clima[month-1].baro + " \xB0C</p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Ice conditions: " + freezingdays + " <span class='ml5'>Heatwave conditions: " + heatingdays + "</span></p>" +
								"</div>";
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέση Τιμή: </strong>" + clima[month-1].baro + " hPa</p>" +
							"</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Συνθήκες παγετού: " + freezingdays + " <span class='ml5'>Συνθήκες καύσωνα: " + heatingdays + "</span></p>" +
								"</div>";
		}
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartbaroavg'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartbaromean'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartbarodays'></div>";
		
		$("#details").html(tmpgraphdetails);
		piechartbaroavg(aboveavgperc);
		piecbaromean(abovemeanperc,belowmeanperc);
		piecbarodays(baddaysperc,gooddaysperc,normaldaysperc);
	});
}


// --------------------------------
// Humidity Chart Plot
// --------------------------------
function humGraph(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Humidity";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Minimum</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Υγρασία";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Ελάχιστη</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[6]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray.push([x,mainPlotline]);
            }
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:{        
				title: {
					text: title + ' (%) '
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' %',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
				name: title,
				negativeColor: '#2d98c4',
				lineWidth: 2,
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
				zones: [{ 
					value: 5,
					color: '#f00098'					
				}, { 
					value: 20,
					color: '#d85c31'	
				}, {
					value: 40,
					color: '#dc8100'
				}, {
					value: 50,
					color: '#54b682' 
				}, {
					value: 60,
					color: '#5480b6'
				}, {
					value: 70,
					color: '#5490b6'
				}, {
					value: 80,
					color: '#004ff0' 
				}, {
					value: 100,
					color: '#004ff0' 
				}]
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var avgdata = 0;
		var aboveavgcnt = 0;
		var comfortcnt = 0;
		var lowcnt = 0;
		var mediumcnt = 0;
		var highcnt = 0;
		for (var i=0; i < graphsdataarray.length; i++) {
			avgdata += graphsdataarray[i][1];
			
			if (graphsdataarray[i][1] >= clima[month-1].humidity) {
				aboveavgcnt++
			}
			
			if (graphsdataarray[i][1] >= 0 && graphsdataarray[i][1] < 35) {
				lowcnt++
			} else if (graphsdataarray[i][1] >= 35 && graphsdataarray[i][1] <= 45) {
				comfortcnt++
			} else if (graphsdataarray[i][1] > 45 && graphsdataarray[i][1] < 66) {
				mediumcnt++
			} else {
				highcnt++
			}
		}
		
		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		
		var aboveavgperc = aboveavgcnt*100/graphsdataarray.length;
				aboveavgperc = Math.round(aboveavgperc);
		
		var comfortperc = comfortcnt*100/graphsdataarray.length;
				comfortperc = Math.round(comfortperc);
		
		var lowperc = lowcnt*100/graphsdataarray.length;
				lowperc = Math.round(lowperc);
		var mediumperc = mediumcnt*100/graphsdataarray.length;
				mediumperc = Math.round(mediumperc);
		var highperc = highcnt*100/graphsdataarray.length;
				highperc = Math.round(highperc);

		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
					});
		
		var tpmmin = graphsdataarray.reduce(function(min, arr) { 
                      return min[1] <= arr[1] ? min : arr;
                   });
		
		var Max_time = new Date(tpmmax[0]);
		var Min_time = new Date(tpmmin[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "<br>" + climahumdata(month,avgdata) + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " % </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + dataMin + " % </strong><br>" + at + "<br>" + Min_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + avgdata + " % </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Average: </strong>" + clima[month-1].humidity + "%</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Ice conditions: " + freezingdays + " <span class='ml5'>Heatwave conditions: " + heatingdays + "</span></p>" +
								"</div>";
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέση: </strong>" + clima[month-1].humidity + "%</div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Συνθήκες παγετού: " + freezingdays + " <span class='ml5'>Συνθήκες καύσωνα: " + heatingdays + "</span></p>" +
								"</div>";
		}
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piecharthumavg'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartcomfort'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piecharthumidity'></div>";
		
		$("#details").html(tmpgraphdetails);
		piecharthumavg(aboveavgperc);
		piecharthumcomfort(comfortperc);
		piecharthumidity(comfortperc,lowperc,mediumperc,highperc);
	});
}

// --------------------------------
// Wind Speed Chart Plot
// --------------------------------

function windspdGraph(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Wind Speed";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var plotband1 = "Light air";
		var plotband2 = "Light breeze";
		var plotband3 = "Gentle breeze";
		var plotband4 = "Moderate breeze";
		var plotband5 = "Fresh breeze";
		var plotband6 = "Strong breeze";
		var plotband7 = "Near Gale";
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Average Estimated Power</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average speed</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Ταχύτητα Ανέμου";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		var plotband1 = "Σχεδόν Άπνοια";
		var plotband2 = "Πολύ Ασθενής";
		var plotband3 = "Ασθενής";
		var plotband4 = "Σχεδόν Μέτριος";
		var plotband5 = "Μέτριος";
		var plotband6 = "Ισχυρός";
		var plotband7 = "Σχεδόν Θυελλώδης";
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Μέση Ημερήσια Ενέργεια</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση ταχύτητα</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[9]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray.push([x,mainPlotline]);
            }
        }
    });

	$(function () {
	
		  $("#container").highcharts({
			chart: {
				type: 'scatter',	
				zoomType: 'xy',
				marginTop: '80',
				marginBottom: '50',
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:{        
				title: {
					text: title + ' (m/s)'
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
				plotBands: [{ // Light air
                from: 0.3,
                to: 1.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband1,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1.5,
                to: 3.3,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: plotband2,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 3.3,
                to: 5.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband3,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 5.5,
                to: 8,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: plotband4,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 8,
                to: 11,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband5,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 11,
                to: 14,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: plotband6,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Near Gale
                from: 14,
                to: 25,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband7,
                    style: {
                        color: '#606060'
                    }
                }
            
            }]
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' m/s',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
				name: title,
				negativeColor: '#2d98c4',
                marker: {
                    radius: 2
				},
				lineWidth: 0,
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
				zones: [{ 
					value: 0,
					color: '#004ff0'  
				}, { 
					value: 2,
					color: '#5490b6'
				}, {
					value: 4,
					color: '#5480b6'
				}, {
					value: 8,
					color: '#54b682' 
				}, {
					value: 12,
					color: '#dc8100'
				}, {
					value: 20,
					color: '#d85c31'
				}, {
					value: 30,
					color: '#f00098'
				}]
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var cnt = 0;
		var avgdata = 0;
		var aboveavgcnt = 0;
		var calmcnt = 0;
		var lowcnt = 0;
		var verylowcnt = 0;
		var mediumcnt = 0;
		var uppermediumcnt = 0;
		var strongcnt = 0;
		var verystrongcnt = 0;
		var stormcnt = 0;
		var kwhperday = [];
		var avgday = [];
		var tmpdata = 0;
		var dailydata = 0;
		
		if (version == "10") {
			var points = 144;
		} else if (version == "30") {
			var points = 48;
		} else if (version == "60") {
			var points = 24;
		} else {
			var points = 1440;
		}
		
		
		for (var i=0; i < graphsdataarray.length; i++) {
			cnt++
			avgdata += graphsdataarray[i][1];
			dailydata += graphsdataarray[i][1];
			if (graphsdataarray[i][1] >= clima[month-1].wind) {
				aboveavgcnt++
			}
			
			var tmpdate = new Date(graphsdataarray[i][0]);
			
			tmpdata += 0.006*Math.pow(graphsdataarray[i][1],3);
			if (cnt == points) {
				tmpdata = +((tmpdata/points).toFixed(2));
				dailydata = +((dailydata/points).toFixed(2));
				kwhperday.push(tmpdata);
				avgday.push(dailydata);
				cnt = 0;
			}
			
			if (graphsdataarray[i][1] >= 0.3 && graphsdataarray[i][1] <= 1.5) {
				calmcnt++
			} else if (graphsdataarray[i][1] > 1.5 && graphsdataarray[i][1] <= 3.3) {
				verylowcnt++
			} else if (graphsdataarray[i][1] > 3.3 && graphsdataarray[i][1] <= 5.5) {
				lowcnt++
			} else if (graphsdataarray[i][1] > 5.5 && graphsdataarray[i][1] <= 8) {
				mediumcnt++
			} else if (graphsdataarray[i][1] > 8 && graphsdataarray[i][1] <= 11) {
				uppermediumcnt++
			} else if (graphsdataarray[i][1] > 11 && graphsdataarray[i][1] <= 14) {
				strongcnt++
			} else if (graphsdataarray[i][1] > 14 && graphsdataarray[i][1] <= 25) {
				verystrongcnt++
			} else {
				stormcnt++
			}
		}

		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		var kwhwind = (0.006*Math.pow(avgdata,3)).toFixed(2);
		var aboveavgperc = aboveavgcnt*100/graphsdataarray.length;
				aboveavgperc = Math.round(aboveavgperc);
		
		var calmperc = calmcnt*100/graphsdataarray.length;
				calmperc = Math.round(calmperc);
		var verylowperc = verylowcnt*100/graphsdataarray.length;
				verylowperc = Math.round(verylowperc);
		var lowperc = lowcnt*100/graphsdataarray.length;
				lowperc = Math.round(lowperc);
		var mediumperc = mediumcnt*100/graphsdataarray.length;
				mediumperc = Math.round(mediumperc);
		var uppermediumperc = uppermediumcnt*100/graphsdataarray.length;
				uppermediumperc = Math.round(uppermediumperc);
		var strongperc = strongcnt*100/graphsdataarray.length;
				strongperc = Math.round(strongperc);
		var stormperc = stormcnt*100/graphsdataarray.length;
				stormperc = Math.round(stormperc);

		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
					});
		
		var Max_time = new Date(tpmmax[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "<br>" + climawinddata(month,avgdata) + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " m/s </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + kwhwind + " kWh/m<sup>2</sup> </strong><br>" +
								"</td>" +
								"<td><strong>" + avgdata + " m/s </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Average speed: </strong>" + clima[month-1].wind + " m/s <span class='ml5'> <strong>Dominant direction: </strong>"  + clima[month-1].winddir + "\xB0</span></div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Ice conditions: " + freezingdays + " <span class='ml5'>Heatwave conditions: " + heatingdays + "</span></p>" +
								"</div>";
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέση ταχ: </strong>" + clima[month-1].wind + " m/s <span class='ml5'> <strong>Κυρίαρχη Δ/νση: </strong>"  + clima[month-1].winddir + "\xB0</span></div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Συνθήκες παγετού: " + freezingdays + " <span class='ml5'>Συνθήκες καύσωνα: " + heatingdays + "</span></p>" +
								"</div>";
		}
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartwindavg'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='columnavgday'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartwind'></div>";
		
		$("#details").html(tmpgraphdetails);
		piechartwindavg(aboveavgperc);
		columnnwind(avgday,kwhperday);
		piechartwind(calmperc,verylowperc,lowperc,mediumperc,uppermediumperc,strongperc,stormperc);
	});
}

// --------------------------------
// Gust Speed Chart Plot
// --------------------------------

function gstspdGraph(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Gust Speed";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var plotband1 = "Light air";
		var plotband2 = "Light breeze";
		var plotband3 = "Gentle breeze";
		var plotband4 = "Moderate breeze";
		var plotband5 = "Fresh breeze";
		var plotband6 = "Strong breeze";
		var plotband7 = "Near Gale";
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Average Estimated Power</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average speed</th>";
		var at = " <small>at</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Ριπή Ανέμου";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		var plotband1 = "Σχεδόν Άπνοια";
		var plotband2 = "Πολύ Ασθενής";
		var plotband3 = "Ασθενής";
		var plotband4 = "Σχεδόν Μέτριος";
		var plotband5 = "Μέτριος";
		var plotband6 = "Ισχυρός";
		var plotband7 = "Σχεδόν Θυελλώδης";
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Μέση Ημερήσια Ενέργεια</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση ταχύτητα</th>";
		var at = " <small>στις</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
            var mainPlotline = parseFloat(items[10]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray.push([x,mainPlotline]);
            }
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				type: 'scatter',	
				zoomType: 'xy',
				marginTop: '80',
				marginBottom: '50',
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis:{        
				title: {
					text: title + ' (m/s)'
				},
				labels: {
					format: '{value} '
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
				plotBands: [{ // Light air
                from: 0.3,
                to: 1.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband1,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1.5,
                to: 3.3,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: plotband2,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 3.3,
                to: 5.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband3,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 5.5,
                to: 8,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    ttext: plotband4,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 8,
                to: 11,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband5,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 11,
                to: 14,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: plotband6,
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Near Gale
                from: 14,
                to: 25,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: plotband7,
                    style: {
                        color: '#606060'
                    }
                }
            
            }]
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' m/s',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},
			series: [{
				name: title,
				negativeColor: '#2d98c4',
                marker: {
                    radius: 2
				},
				lineWidth: 0,
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
				zones: [{ 
					value: 0,
					color: '#004ff0'  
				}, { 
					value: 2,
					color: '#5490b6'
				}, {
					value: 4,
					color: '#5480b6'
				}, {
					value: 8,
					color: '#54b682' 
				}, {
					value: 12,
					color: '#dc8100'
				}, {
					value: 20,
					color: '#d85c31'
				}, {
					value: 30,
					color: '#f00098'
				}]
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var cnt = 0;
		var avgdata = 0;
		var aboveavgcnt = 0;
		var calmcnt = 0;
		var lowcnt = 0;
		var verylowcnt = 0;
		var mediumcnt = 0;
		var uppermediumcnt = 0;
		var strongcnt = 0;
		var verystrongcnt = 0;
		var stormcnt = 0;
		var kwhperday = [];
		var avgday = [];
		var tmpdata = 0;
		var dailydata = 0;
		
		if (version == "10") {
			var points = 144;
		} else if (version == "30") {
			var points = 48;
		} else if (version == "60") {
			var points = 24;
		} else {
			var points = 1440;
		}
		
		for (var i=0; i < graphsdataarray.length; i++) {
			cnt++
			avgdata += graphsdataarray[i][1];
			dailydata += graphsdataarray[i][1];
			if (graphsdataarray[i][1] >= clima[month-1].wind) {
				aboveavgcnt++
			}
			
			var tmpdate = new Date(graphsdataarray[i][0]);
			
			tmpdata += 0.006*Math.pow(graphsdataarray[i][1],3);
			if (cnt == points) {
				tmpdata = +((tmpdata/points).toFixed(2));
				dailydata = +((dailydata/points).toFixed(2));
				kwhperday.push(tmpdata);
				avgday.push(dailydata);
				cnt = 0;
			}
			
			if (graphsdataarray[i][1] >= 0.3 && graphsdataarray[i][1] <= 1.5) {
				calmcnt++
			} else if (graphsdataarray[i][1] > 1.5 && graphsdataarray[i][1] <= 3.3) {
				verylowcnt++
			} else if (graphsdataarray[i][1] > 3.3 && graphsdataarray[i][1] <= 5.5) {
				lowcnt++
			} else if (graphsdataarray[i][1] > 5.5 && graphsdataarray[i][1] <= 8) {
				mediumcnt++
			} else if (graphsdataarray[i][1] > 8 && graphsdataarray[i][1] <= 11) {
				uppermediumcnt++
			} else if (graphsdataarray[i][1] > 11 && graphsdataarray[i][1] <= 14) {
				strongcnt++
			} else if (graphsdataarray[i][1] > 14 && graphsdataarray[i][1] <= 25) {
				verystrongcnt++
			} else {
				stormcnt++
			}
		}

		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		var kwhwind = (0.006*Math.pow(avgdata,3)).toFixed(2);
		var aboveavgperc = aboveavgcnt*100/graphsdataarray.length;
				aboveavgperc = Math.round(aboveavgperc);
		
		var calmperc = calmcnt*100/graphsdataarray.length;
				calmperc = Math.round(calmperc);
		var verylowperc = verylowcnt*100/graphsdataarray.length;
				verylowperc = Math.round(verylowperc);
		var lowperc = lowcnt*100/graphsdataarray.length;
				lowperc = Math.round(lowperc);
		var mediumperc = mediumcnt*100/graphsdataarray.length;
				mediumperc = Math.round(mediumperc);
		var uppermediumperc = uppermediumcnt*100/graphsdataarray.length;
				uppermediumperc = Math.round(uppermediumperc);
		var strongperc = strongcnt*100/graphsdataarray.length;
				strongperc = Math.round(strongperc);
		var stormperc = stormcnt*100/graphsdataarray.length;
				stormperc = Math.round(stormperc);

		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
					});
		
		var Max_time = new Date(tpmmax[0]);

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "<br>" + climawinddata(month,avgdata) + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " m/s </strong><br>" + at + "<br>" + Max_time.toString('dd/MM/yyyy') +
								"</td>" +
								"<td><strong>" + kwhwind + " kWh/m<sup>2</sup> </strong><br>" +
								"</td>" +
								"<td><strong>" + avgdata + " m/s </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Average speed: </strong>" + clima[month-1].wind + " m/s <span class='ml5'> <strong>Dominant direction: </strong>"  + clima[month-1].winddir + "\xB0</span></div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Ice conditions: " + freezingdays + " <span class='ml5'>Heatwave conditions: " + heatingdays + "</span></p>" +
								"</div>";
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέση ταχ: </strong>" + clima[month-1].wind + " m/s <span class='ml5'> <strong>Κυρίαρχη Δ/νση: </strong>"  + clima[month-1].winddir + "\xB0</span></div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Συνθήκες παγετού: " + freezingdays + " <span class='ml5'>Συνθήκες καύσωνα: " + heatingdays + "</span></p>" +
								"</div>";
		}
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartwindavg'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='columnavgday'></div>" +
								"<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4' id='piechartwind'></div>";
		
		$("#details").html(tmpgraphdetails);
		piechartwindavg(aboveavgperc);
		columnnwind(avgday,kwhperday);
		piechartwind(calmperc,verylowperc,lowperc,mediumperc,uppermediumperc,strongperc,stormperc);
	});
}


// --------------------------------
// Wind Direction Chart Plot
// --------------------------------

function winddirGraph(data) { 
	var graphsdataarray = [];
	
	if ( lang == "en") {
		var title = "Wind Direction";
		var subtitle = "Last update: " + new Date().toString('dd/MM/yyyy ');
		var monthgraph = month_en[month];
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Maximum</th><th class='bg-cyan color-white fs-almostfull text-center'>Dominant Wind Direction</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Average Gust speed</th>";
		var at = " <small>from</small> ";
		var hrs = " hrs";
		var mins = " mins";
	} else {
		var title = "Δ/νση Ανέμου";
		var subtitle = "Τελευταία ανανέωση: " + new Date().toString('dd/MM/yyyy');
		var monthgraph = month_gr[month];
		Highcharts.setOptions({
			lang: {
				months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
				weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν' , 'Ιουλ', 'Αυγ', 'Σεπτ', 'Οκτ', 'Νοε', 'Δεκ'],
				loading:		"Παρακαλώ περιμένετε...",
				printChart: 	"Εκτύπωση διαγράμματος",
				downloadJPEG: 	"Κατεβάστε σε εικόνα JPG",
				downloadPDF:	"Κατεβάστε σε αρχείο PDF",
				downloadPNG:	"Κατεβάστε σε εικόνα PNG",
				downloadSVG:	"Κατεβάστε σε εικόνα SVG",
			}
		});
		var tablehead = "<th class='bg-red color-white fs-almostfull text-center'>Μέγιστη</th><th class='bg-cyan color-white fs-almostfull text-center'>Κυρίαρχη Δ/νση Ανέμου</th><th class='bg-dark-gray color-white fs-almostfull text-center'>Μέση ταχύτητα Ριπής</th>";
		var at = " <small>από</small> ";
		var hrs = " ώρες";
		var mins = " λεπτά";
	}
	
	var lines = data.split('\n');	

    $.each(lines, function (lineNo, line) {
		var items = line.split(',');
		items[1] = items[1] - 1;
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]);
				mainPlotline = parseFloat(items[11]),
				secondaryPlotline = parseFloat(items[9]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
				graphsdataarray.push([mainPlotline,secondaryPlotline]);
            }
        }
    });
	
	$(function () {
	
		  $("#container").highcharts({
			chart: {
				type: 'column',
				polar: true,
				marginTop: '130',
				marginBottom: '80',
				spacingLeft: 0,
				style: {
					fontFamily: '"Fira Sans" ,sans-serif', // default font
					fontSize: '12px'
				},
				events: {
					load: function() {
						this.showLoading();  
					},
				}  
			},
			global: {
				useUTC: false,
			},
			loading: {
				labelStyle: {
					color: '#eceff1'
				},
				style: {
					backgroundColor: '#263238'
				}
			},
			title: {
				useHTML: true,
				text: title + ' <span class="label label-primary ml5 mb05 fs-small">' + monthgraph + ' ' + year + '</span>',
				x: 0 
			},
			subtitle: {
				text: subtitle,
				x: 0
			},
			pane: {
				startAngle: 0,
				endAngle: 360,
				size: '150%'
			},
		
			xAxis: {
				min: 0,
				max: 360,
				tickInterval: 45,
				labels: {
					format: '{value} \xB0'
				}
			},
			yAxis:{        
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: ' m/s',
				headerFormat: '<kbd class="pull-center">{point.key}</kbd> <table class="table table-striped mt20" style="width:auto">',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td><span class="label label-primary">{point.y}</span></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 1
			},
			legend:{
					layout: 'horizontal',
					borderColor: '#1b617e',
					borderRadius: 5,
					borderWidth: 1,
					padding: 13,
					floating: true,
					align: 'left',
					enabled: false,
					verticalAlign: 'top',
				 },
			credits: {
				position: {
				align: 'right',
				x: -10,
				verticalAlign: 'bottom',
				y: -5
				},
				text: '© LamiaWeather.com',
				href: 'http://www.lamiaweather.com/'
			},		
			series: [{
				name: title,
				color: '#0e8922',
				shadow: false,
				shadow: {
					color: '#000000',
					width: 2,
					offsetX: 0,
					offsetY: 0,
					opacity: 0.1
					},
				data: graphsdataarray,
				events: {
						afterAnimate: function() {
								chart.hideLoading();
									}
				},
			}]
		});	
	
		var chart = $("#container").highcharts();
		var dataMin = chart.yAxis[0].dataMin; 
		var dataMax = chart.yAxis[0].dataMax;
		var cnt = 0;
		var avgdata = 0;
		var avgday = [];
		var tmpdata = 0;
		var dirdailydata = 0;
		
		if (version == "10") {
			var points = 144;
		} else if (version == "30") {
			var points = 48;
		} else if (version == "60") {
			var points = 24;
		} else {
			var points = 1440;
		}
		
		for (var i=0; i < graphsdataarray.length; i++) {
			cnt++
			avgdata += graphsdataarray[i][1];
			dirdailydata += graphsdataarray[i][0];			
			var tmpdate = new Date(graphsdataarray[i][0]);
			
			tmpdata += 0.006*Math.pow(graphsdataarray[i][1],3);
			if (cnt == points) {
				tmpdata = +((tmpdata/points).toFixed(2));
				dirdailydata = +((dirdailydata/points).toFixed(0));
				avgday.push(dirdailydata);
				cnt = 0;
			}
		}
		
		var tmpdaydir = 0;
		for (var j=0; j<avgday.length; j++) {
			tmpdaydir += avgday[j];
		}
		var dom_dir = (tmpdaydir/avgday.length).toFixed(0);
		
		avgdata = (avgdata / graphsdataarray.length).toFixed(2);
		var tpmmax = graphsdataarray.reduce(function(max, arr) {
			return max[1] >= arr[1] ? max : arr;
					});
		
		var max_dir = tpmmax[0];

		var tmpgraphdetails = "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'><h4 class='montserrat text-center'>" + monthgraph + " " + year + "</h4></div>" +
							"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 bg-gray'>" +
							  "<table class='table table-responsive text-center'><tr>" + tablehead + "</tr>" +
							  "<tr>" +
								"<td><strong>" + dataMax + " m/s </strong><br>" + at + "<br>" + max_dir + "\xB0" +
								"</td>" +
								"<td><strong>" + dom_dir + " \xB0 </strong><br>" +
								"</td>" +
								"<td><strong>" + avgdata + " m/s </strong>" +
								"</td>" +
							  "</tr>" +
							"</table></div>";
		if ( lang == "en") {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Official Climate Data <br> <small>Source: HNMS</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Average speed: </strong>" + clima[month-1].wind + " m/s <span class='ml5'> <strong>Dominant direction: </strong>"  + clima[month-1].winddir + "\xB0</span></div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Ice conditions: " + freezingdays + " <span class='ml5'>Heatwave conditions: " + heatingdays + "</span></p>" +
								"</div>";
		} else {
			tmpgraphdetails += "<div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 bg-gray' style='border-left: 1px solid #e0e0e0'>" +
							"<h4 class='fs-almostfull text-center'>Επίσημα Κλιματολογικά Στοιχεία <br> <small>Πηγή: Ε.Μ.Υ.</small></h4>" +
							"<p class='fs-almostfull text-center'> <strong>Μέση ταχ: </strong>" + clima[month-1].wind + " m/s <span class='ml5'> <strong>Κυρίαρχη Δ/νση: </strong>"  + clima[month-1].winddir + "\xB0</span></div>" +
							"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-gray' style='padding:1em'>" +
									//"<p class='text-center'>Συνθήκες παγετού: " + freezingdays + " <span class='ml5'>Συνθήκες καύσωνα: " + heatingdays + "</span></p>" +
								"</div>";
		}
			tmpgraphdetails += 	"<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12' id='columndirday'></div>";
		
		$("#details").html(tmpgraphdetails);
		columnnwinddir(avgday);
	});
}