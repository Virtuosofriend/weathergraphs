<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Temperature Graph</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
		
		<style type="text/css">
		
${demo.css}
		</style>
			</head>
		<body>
		<div class="container row">
		<div class="col-sm-12 col-md-12 col-lg-12 mt20 hidden" id="warning_sign">
										<div class="alert alert-dismissible alert-warning">
										  <button type="button" class="close" data-dismiss="alert">&times;</button>
										  <h4><i class="icon fa fa-exclamation-triangle "></i>Warning!</h4>
										  <p>You have chosen <strong>1 minute</strong> interval. Your browser might run out of memory and crash.</p>
										 </div>
									</div>
                               <div class="col-sm-12 col-md-12 col-lg-12" style="margin-top: 5em">
									<form action="" method="get" id="form">
										<div class="row">
											<div class="col-sm-4 col-md-4 col-lg-4" id="Gr_1">
															<label>Select Month: </label> <br>
													<select name="date" id="month">
																<?php

																	#################
																	# begin settings
																	# ##############
																	
																	# be sure to set the two settings variables below
																	
																	# enter 4 digit year of your oldest report on your server - example: 2006
																	$startyear = 2008;
																	
																	# Location of where the data files are located.
																	# You may need to change this and it must end with a slash.
																	# ./ is used if the files are in the same folder as your page with the dropdown list
																	$webdir = 'csv/';
																	
																	$clim = 'lgcsv';
																	#################
																	# end settings
																	# ##############
																	
																	
																	function getmonthfiles() {
																	 global $startyear, $webdir, $clim;
																	
																	 $year  = date('Y');
																	 $thismonth  = date('F');
																	 $thismonthN = date('n');
																	
																	 # find out how many years do we need to list files for
																	 $thisyear  = date('Y');
																	 $yearcount = $thisyear - $startyear;
																	
																	 # Safety setting incase some goofy year is entered like 200 for $startyear setting
																	 # only allows 20 years in the past maximum.
																	 if($yearcount > 20) $yearcount = 20;
																	
																	 $yearsarray = array();
																	 for ($num=0; $num <= $yearcount; $num++ ) {
																		  $yearsarray[]=$thisyear;
																		  $thisyear--;
																	 }
																	
																	 $monthsarray = array('12' => 'December','11' => 'November','10' => 'October','9' => 'September','8' => 'August','7' => 'July',
																	 '6' => 'June','5' => 'May','4' => 'April','3' => 'March','2' => 'February','1' => 'January');
																	
																	  if (isset($SITE['langMonths'])) {
																		  foreach (array('January', 'February', 'March', 'April', 'May', 'June',
																		'July', 'August', 'September', 'October', 'November', 'December') as $i => $english) {
																			$LANGLOOKUP[$english] = $SITE['langMonths'][$i];
																		  }
																		  echo "<!-- loaded langMonths to LANGLOOKUP -->\n";
																	  }
																	/* Displays two times the file,
																	$datestring = $_GET['date'];
																			
																					if (($datestring == "lgcsv") or ($datestring == "")) {
																			$selected = ' selected="selected"';
																			
																			}
																			echo "<option value=" . $thismonthN . $year ." $selected>$thismonth $year</option>\n";
																		*/		
																	
																	 # $datestring is used to keep the dropdown properly selected
																	 # see if it is there and 6 digits only
																	 # make sure a month selected exists
																	 # input sanity (allow only 6 digits for date query, nothing else)
																	 $defaultdatefound=0;
																	 $datestring ='';
																	 $selected = '';
																	 if ( isset($_GET['date'] ) && preg_match("/^[0-9]{6}$/", $_GET['date']) ) {
																		if (is_file($webdir.$clim.$monthsarray[substr($_GET['date'],4,2)].substr($_GET['date'],0,4).'.html')) {
																		   $datestring = $_GET['date'];
																		   $defaultdatefound=1;
																		}
																	 }
																	
																	  # this part properly sorts the files for the dropdown
																	  # start with this year and work back
																	  
																	  $count = 1;
																	  foreach ($yearsarray as $yk => $yv) {
																		   # start with December and work towards January for each year we are working with
																		   foreach ($monthsarray as $mk => $mv) {
																				  # only files FOUND on the server are included
																			$bfile = "$webdir$mk$yv$clim.csv";
																				  if(is_file($bfile)){
																					# make the default month, the first one we actually have found
																					# prevents January of a new year not found on Jan 1 because the file was not uploaded
																					if ($count ==1) $firstdatestring = "$mk$yv";
																			$datestring = $_GET['date'];
																					if ($datestring == "$mk$yvlgcsv")  $selected = ' selected="selected"';
																					echo '<option value="'.$mk.$yv.'" '.$selected.'>'.$mv.' '.$yv.'</option>'."\n";
																					$selected = '';
																					$count++;
																				  }
																		   }
																	  }
																		# make the default month, the first one we actually have found
																	   if (!$defaultdatefound) $datestring = $firstdatestring;
																	   return $datestring;
																	}
																	
																	// END
																	
																	$datefile2 = getmonthfiles();
																	
																	
																?>
													</select>
											</div>
											<div class="col-sm-8 col-md-8 col-lg-8" id="time_interval">
															<div class="btn-group" data-toggle="buttons">
												 <label id="timeint_t">Time interval for graphs</label><br>
														<label id="1minlabel" class="btn btn-default btn-sm">
															<input id="1min" type="radio" value="">1 minute
														</label>
														<label id="10minlabel" class="btn btn-default btn-sm">
															<input id="10min" type="radio" value="10">10 minutes
														</label>
														<label id="30minlabel" class="btn btn-default btn-sm">
															<input id="30min" type="radio" value="30">30 minutes
														</label>
														<label id="60minlabel" class="btn btn-default btn-sm active">
															<input id="60min" type="radio" value="60">60 minutes
														</label>
														
													</div>
											</div>
											
												
											
										</div>
									 <input id="months" class="btn btn-primary btn-sm pull-left mb20" type="button" value="Plot Graphs" />
												</form>
                                </div>
								
								
								
                   		 </div>
                    
                       	</div>
                       </div>
               </div>
             <hr>

                  <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
   
</body>	
	
		<!-- Primary JS -->
<script src="js/jquery-2.1.0.min.js"></script>
<script src="js/bootstrap.min.js"></script>

		<!-- HighCharts JS -->
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="themes/ecosmos.js"></script>

		<!-- BlockUI JS -->
<script src="js/jquery.blockUI.js"></script>

		
		<script type="text/javascript">
		// First of all we show the little loading message, so users don't think nothing is going on
		jQuery(document).ready(function ($) {
			$.blockUI.defaults.css = {};
				$.ajaxSetup({ cache: false });
				$(document).ajaxStart(function () {
					$('#container').block({
					message: '<div class="pull-center"><p class="montserrat color-white"><i class="fa fa-spinner fa-pulse mr10"></i>Please be patient, data is retrieving from the server!</p></div>'
				});
			});
			$(document).ajaxStop(function () {
			$('#container').unblock();
			}); 
		});
		
		// Initial build of the graph, needs some input data
		var initialdate = new Date();
		var year = initialdate.getFullYear();
		var month = initialdate.getMonth();
		month = month + 1;					// remember to set the proper month according to JS

		// Global Variables
	
		var station = 'eCosmos.com/weather';
		var files = "csv/";							// Folder where the csv files are located. Remember the / at the end
		var version = "10";							// Based on the csv file that you are using, you can choose between the
													// 60 minutes file --> 60
													// 30 minutes file --> 30
													// 10 minutes file --> 10
													// 
													// 
													// Keep in mind that the 1 minute file will cause a huge delay on plotting times
		
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
		
		$("#time_interval").change(function() {				// showing the warning sign if the 1 minute is selected
			$("#warning_sign").removeClass("hidden");
		});
		
		
		// Chart plotting
		
$(function defaultchart() {

		// months calculations
		
		if ( month == '1' ) {
			nmonth = "January";
		} else if ( month == '2' ) {
			nmonth == "February";
		} else if ( month == '3' ) {
			nmonth = "March";
		} else if ( month == '4' ) {
			nmonth = "April";
		} else if ( month == '5' ) {
			nmonth = "May";
		} else if ( month == '6' ) {
			nmonth = "June";
		} else if ( month == '7' ) {
			nmonth = "July";
		} else if ( month == '8' ) {
			nmonth = "August";
		} else if ( month == '9' ) {
			nmonth = "September";
		} else if ( month == '10' ) {
			nmonth = "October";
		} else if ( month == '11' ) {
			nmonth = "November";
		} else if ( month == '12' ) {
			nmonth = "December";
		}
		
		// Radio buttons function
		
		
	var options = {
		chart: {
			renderTo: 'container',
			defaultSeriesType: 'line',
			zoomType: 'x',
			marginTop: '80',
			marginBottom: '50'
		},
		title: {
			text: 'Temperature Graph<br>' + nmonth + " " + year,
			x: -20 //center
		},
		subtitle: {
			text: 'Source: ' + station, 
			x: -20
		},
		xAxis: {
			type: 'datetime',
			tickInterval:  24 * 3600 * 1000
		},
		yAxis:[{        
			title: {
				text: 'Temperature'
			},
			labels: {
                format: '{value} \xB0C'
            },
		
		}, { // Secondary yAxis
            title: {
                text: '',
            },
			labels: {
                format: '{value} \xB0C'
            },
            opposite: true
        }],
		legend:{
				layout: 'horizontal',
				borderColor: '#1b617e',
				borderRadius: 5,
				borderWidth: 1,
				padding: 13,
				floating: true,
				align: 'left',
				verticalAlign: 'top',
			 },
		series: [{
			name: 'Temperature',
			color: '#c4392d',
			negativeColor: '#2d98c4',
			lineWidth: 2,
			data: []
			 }, {
			name: 'Dewpoint',
			yAxis: 1,								// apply the second column to the second y-axis
			type: 'areaspline',						// Make the new plot fill the area
            color: '#2d98c4',
			lineWidth: 1,
            negativeColor: '#5b686d',
            fillOpacity: 0.1,
			showInLegend: false,
			data: []
		}],
		
		 tooltip: {
            shared: true,
            useHTML: true,
			valueSuffix: ' \xB0C',
            headerFormat: '<kbd>{point.key}</kbd> <table class="table table-striped mt20" style="width:200px">',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                '<td><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 1
        },
		
		credits: {
			position: {
			align: 'right',
			x: -10,
			verticalAlign: 'bottom',
			y: -5
			},
            text: 'Courtesy of eCosmos.com',
            href: 'http://www.euacosmos.com/weather'
        }
	};
$.get(files + month + year + 'lgcsv' + version + '.csv', function(data){
    var lines = data.split('\n');
    $.each(lines, function (lineNo, line) {
        var items = line.split(',');
		items[1] = items[1] - 1;		// JS has the bad habit to identify months by numbers. So 0 is January, 1 is February etc...
        if(lineNo !== 0) {
           var x = + new Date(items[2],items[1],items[0],items[3],items[4]),
               mainPlotline = parseFloat(items[5]),
               secondaryPlotline = parseFloat(items[7]);
            if(!isNaN(mainPlotline) && !isNaN(x)){
                options.series[0].data.push([x,mainPlotline]);
				//options.series[1].data.push([x,secondaryPlotline]);
            }
        }
    });
	new Highcharts.Chart(options);
	
	
		
});
$("#months").unbind('click');													// Unbind the clicks / Credits to Argyros Argyridis for this small tip ;)
$("#months").click(function(){
								if ( $("#container").is(':empty') ) {
									
									var mdata = $("#month").val();								// We collect the value data of the month form
									var nversion = $("#form  label.active input").val();		// and the time interval thing
									version = nversion;
									if (mdata.length == 6) {
										
										month = mdata.substring(2, mdata.length - 6);
										year = mdata.slice(2);
										
										
									} else {
										
										month = mdata.substring(1, mdata.length - 5);
										year = mdata.slice(1);
									}
									
									new defaultchart(options);
									
								} else {
									
									$('#container').highcharts().destroy();
									var mdata = $("#month").val();								// We collect the value data of the month form
									var nversion = $("#form  label.active input").val();		// and the time interval thing
									version = nversion;
									if (mdata.length == 6) {
										
										month = mdata.substring(2, mdata.length - 6);
										year = mdata.slice(2);
										
									} else {
										
										month = mdata.substring(1, mdata.length - 5);
										year = mdata.slice(1);
									}
									
									new defaultchart(options);
								}
									
								});
	
});



		</script>
</html>
