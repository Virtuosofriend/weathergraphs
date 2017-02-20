<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>LamiaWeather.com Graphs Page</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons-wind.min.css">
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
								
								<div class="col-sm-12 col-md-12 col-lg-12">
									<form action="" method="get" id="form">
										<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="btn_en">
											<label class="pull-center">Select Graph Set </label>

											 <div class="btn-group">
												<a href="#" name="graphset" role="button" class="btn btn-lw btn-default btn-sm" value="temperature" text_en="Temperature" text_gr="Θερμοκρασία"><i class="wi wi-thermometer mr10"></i>Temperature</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="rain" text_en="Percipitation" text_gr="Βροχόπτωση"><i class="wi wi-umbrella mr10"></i>Rain</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="humidity" text_en="Humidity" text_gr="Υγρασία"><i class="wi wi-humidity mr10"></i>Humidity</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="dewpoint" text_en="Dewpoint & Heat Index" text_gr="Σημείο Δρόσου & Αίσθηση Ζέστης"><i class="fa fa-leaf mr10"></i>DewPoint & Heat Index</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="solar" text_en="Solar Power" text_gr="Ηλιακή Ενέργεια"><i class="fa fa-sun-o mr10"></i>Solar</a>
										
											</div>
												
											<div class="btn-group">
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="windspeed" text_en="Wind Speed" text_gr="Ταχύτητα Ανέμου"><i class="wi wi-strong-wind mr10"></i>Wind Speed</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="gstspeed" text_en="Gust Speed" text_gr="Ταχύτητα Ριπής Ανέμου"><i class="wi wi-windy mr10"></i>Gust Speed</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="winddir" text_en="Wind Direction" text_gr="Διεύθυνση Ανέμου"><i class="wi wi-wind from-0-deg mr10"></i>Wind Direction</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="barometer" text_en="Barometer" text_gr="Βαρόμετρο"><i class="wi wi-barometer mr10"></i>Barometer</a>
											</div>
												

										</div>
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hidden" id="btn_gr">
											<label class="pull-center">Επιλέξτε διάγραμμα </label>

											 <div class="btn-group">
												<a href="#" name="graphset" role="button" class="btn btn-lw btn-default btn-sm" value="temperature" text_en="Temperature" text_gr="Θερμοκρασία"><i class="wi wi-thermometer mr10"></i>Θερμοκρασία</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="rain" text_en="Percipitation" text_gr="Βροχόπτωση"><i class="wi wi-umbrella mr10"></i>Βροχή</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="humidity" text_en="Humidity" text_gr="Υγρασία"><i class="wi wi-humidity mr10"></i>Υγρασία</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="dewpoint" text_en="Dewpoint & Heat Index" text_gr="Σημείο Δρόσου & Αίσθηση Ζέστης"><i class="fa fa-leaf mr10"></i>Σημείο δρόσου & Αίσθηση ζέστης</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="solar" text_en="Solar Power" text_gr="Ηλιακή Ενέργεια"><i class="fa fa-sun-o mr10"></i>Ήλιος</a>
										
											</div>
												
											<div class="btn-group">
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="windspeed" text_en="Wind Speed" text_gr="Ταχύτητα Ανέμου"><i class="wi wi-strong-wind mr10"></i>Ταχύτητα ανέμου</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="gstspeed" text_en="Gust Speed" text_gr="Ταχύτητα Ριπής Ανέμου"><i class="wi wi-windy mr10"></i>Ριπή ανέμου</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="winddir" text_en="Wind Direction" text_gr="Διεύθυνση Ανέμου"><i class="wi wi-wind from-0-deg mr10"></i>Δ/νση ανέμου</a>
												<a href="#" name="graphset" role="button" class="btn btn-default btn-sm" value="barometer" text_en="Barometer" text_gr="Βαρόμετρο"><i class="wi wi-barometer mr10"></i>Βαρόμετρο</a>
											</div>
										</div>
									
											<div class="col-sm-4 col-md-4 col-lg-4 mt20" id="Gr_1">
															<label>Select Month </label>
												<fieldset name="date" disabled>
													<select name="date">
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
																	
																	// Additions to translate months
																	$cookie_name = 'graphs_lang';
																	if ($_COOKIE[$cookie_name] == 'en') {
																		$monthsarray = array('12' => 'December','11' => 'November','10' => 'October','9' => 'September','8' => 'August','7' => 'July',
																	 '6' => 'June','5' => 'May','4' => 'April','3' => 'March','2' => 'February','1' => 'January');
																	} else {
																		$monthsarray = array('12' => 'Δεκέμβριος','11' => 'Νοέμβριος','10' => 'Οκτώβριος','9' => 'Σεπτέμβριος','8' => 'Αύγουστος','7' => 'Ιούλιος',
																	 '6' => 'Ιούνιος','5' => 'Μάιος','4' => 'Απρίλιος','3' => 'Μάρτιος','2' => 'Φεβρουάριος','1' => 'Ιανουάριος');
																	}																 
																	
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
																					echo '<option id="date_option" value="'.$mk.$yv.'" '.$selected.'>'.$mv.' '.$yv.'</option>'."\n";
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
												</fieldset>
											</div>
											<div class="col-sm-8 col-md-8 col-lg-8 mt20" id="time_interval">
											 <fieldset name="time" disabled>
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
												</fieldset>
											</div>
										</div>
									 
                                <input id="months" class="btn btn-primary btn-sm pull-right mt20 disabled" type="button" value="Plot Graphs" />
                                </form></div>
								
                   		 </div>
                    
                       	</div>
                       </div>
               </div>
             <hr>

                 <div class="container">
                  <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
				  <div class="row mt10 bg-gray" id="details"></div>
                  </div>
   
</body>	
	
		<!-- Primary JS -->
<script src="js/jquery-2.1.0.min.js"></script>
<script src="js/bootstrap.min.js"></script>

		<!-- HighCharts JS -->
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="themes/ecosmos.js"></script>
<script src="js/date.js"></script>
<script src="js/js.cookie.js"></script>
<script src="js/weathergraphs_clima.js"></script>
<script src="js/weathergraphs.js"></script>
<script src="js/weathergraphs_get.js"></script>
<script src="js/weathergraphs_extra.js"></script>
</html>
