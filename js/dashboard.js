var status = {};
var animation;

$(document).ready(function() {
	
	printHi();
	function printHi() {
		/* counter++; */
		setTimeout(function() { 
			$('#drawImage').attr('src', './ApplicationStatus');
			$('#drawImage').height(664);
			$('#drawImage').width(664);
			printHi();

		}, 5);
	}
	
	doCanvasSetup('sensor-activity-canvas');
	
	$("canvas").attr('width', 340);
	$("canvas").attr('height', 306);
	
	
	eClassImage = new Image();
	eClassImage.src = 'img/e-class.png';
	bsmInactive = new Image();
	bsmInactive.src = 'img/sensor-icons/blind-spot-inactive.png';
	bsmActive = new Image();
	bsmActive.src = 'img/sensor-icons/blind-spot-active.png';
	bsmLowSpeed = new Image();
	bsmLowSpeed.src = 'img/sensor-icons/blind-spot-lowspeed.png';
	spiActive = new Image();
	spiActive.src = 'img/sensor-icons/spi-active.png';
	spiInactive = new Image();
	spiInactive.src = 'img/sensor-icons/spi-inactive.png';
	lidarActive = new Image();
	lidarActive.src = 'img/sensor-icons/lidar-active.png';
	lidarInactive = new Image();
	lidarInactive.src = 'img/sensor-icons/lidar-inactive.png';
	
	eClassImage.onload = function() {
		context.drawImage(eClassImage, 98.6, 12, 139.32, 264.06);
	};

     
      
//      var continuousSaveInProgress;
//      function changeContSaveImageProgress() {
//    	  changeImages();
//    	  continuousSaveInProgress = setTimeout(changeContSaveImageProgress, 80);
//      }
//      
//      var canTriggeredSaveInProgress;
//      function changeCanTriggerSaveImageProgress() {
//    	  changeCanTriggeredImages();
//    	  canTriggeredSaveInProgress = setTimeout(changeCanTriggerSaveImageProgress, 80);  
//      }
//      
//      
      $('#continuous-recording-button').bind("click touch", function() {
    	  $.post('ApplicationCommand', { "command": "toggle-continuous-save" });
      });
//      
//      
      $('#can-trigger-recording-button').bind("click touch", function(){
    	  $.post('ApplicationCommand', { "command": "toggle-can-trigger-recording" });
      });
//      
//      
      

      $('#ring-buffer-recording-button').bind("click touch", function(){
    	  $.post('ApplicationCommand', { "command": "dump-ring-buffer" });
		  $('#ring-buffer-recording-button').css('background-color', '#5d98d9');
		  $('#ring-buffer-record-button-counter').css('background-color', '#2d66a5');
		  changeback = setTimeout(changeBackToGreen, 120);
    	  
    	 
      });
      
      function changeBackToGreen() {
    	  $('#ring-buffer-recording-button').css('background-color', '#88c09d');
		  $('#ring-buffer-record-button-counter').css('background-color', '#649175');
      };
      
	motion = setTimeout(animate, 5);
	function animate() {
		getPageUpdate();
		motion = setTimeout(animate, 50);
	};
	

});

function changeImages() {
//	alert($('#continuous-record-button').attr('src'));
	var currentImage = $('#continuous-record-button').attr('src');
	
	if(currentImage.indexOf('icon-2') > -1) {
		$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-4.png');
	} else if(currentImage.indexOf('icon-4') > -1) {
		$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-6.png');
	} else if(currentImage.indexOf('icon-6') > -1) {
		$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-8.png');
	} else if(currentImage.indexOf('icon-8') > -1) {
		$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-10.png');
	} else if(currentImage.indexOf('icon-10') > -1) {
		$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-12.png');
	} else if(currentImage.indexOf('icon-12') > -1) {
		$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-2.png');
	}
};

function changeCanTriggeredImages() {
	
	var currentImage = $('#can-trigger-record-button').attr('src');
	
	if(currentImage.indexOf('icon-2') > -1) {
		$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-4.png');
	} else if(currentImage.indexOf('icon-4') > -1) {
		$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-6.png');
	} else if(currentImage.indexOf('icon-6') > -1) {
		$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-8.png');
	} else if(currentImage.indexOf('icon-8') > -1) {
		$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-10.png');
	} else if(currentImage.indexOf('icon-10') > -1) {
		$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-12.png');
	} else if(currentImage.indexOf('icon-12') > -1) {
		$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-2.png');
	}
	
}


function getPageUpdate() {
	
	$.post('SensorStatus', function(jsonText) {
		var status = jQuery.parseJSON(jsonText);

		context.clearRect(0, 0, 500, 500);
		context.drawImage(eClassImage, 98.6, 12, 139.32, 264.06);

		// draw lidars
		if(status.isDriverLidarActive) {
			context.drawImage(lidarActive, 105, 270);
		} else {
			context.drawImage(lidarInactive, 105, 270);
		}

		// draw lidars
		if(status.isPassengerLidarActive) {
			context.drawImage(lidarActive, 204, 270);
		} else {
			context.drawImage(lidarInactive, 204, 270);
		}
		
		// draw SPIs
		if(status.isDriverBSMSPIActive) {
			context.drawImage(spiActive, 130, 246);
		} else {
			context.drawImage(spiInactive, 130, 246);
		}
		
		if(status.isPassengerBSMSPIActive) {
			context.drawImage(spiActive, 178, 246);
		} else {
			context.drawImage(spiInactive, 178, 246);
		}
		
		if(status.isDriverDTRSPIActive) {
			context.drawImage(spiActive, 136, 10);
		} else {
			context.drawImage(spiInactive, 136, 10);
		}
		
		if(status.isPassengerDTRSPIActive) {
			context.drawImage(spiActive, 170, 10);
		} else {
			context.drawImage(spiInactive, 170, 10);
		}


		if(status.isGPSActive) {
			$('#vehicle-sensor-gps-icon').addClass("sensor-icon-active").removeClass("sensor-icon-inactive");
			$('#vehicle-sensor-gps-icon p').addClass("sensor-icon-active-p").removeClass("sensor-icon-inactive-p");
		} else {
			$('#vehicle-sensor-gps-icon').addClass("sensor-icon-inactive").removeClass("sensor-icon-active");
			$('#vehicle-sensor-gps-icon p').addClass("sensor-icon-inactive-p").removeClass("sensor-icon-active-p");
		}
		
		// set the name of the public bus text
		$('#publicBusText').text(status.publicBusName);

		if(status.isPublicBusActive) {
			$('#vehicle-sensor-can-icon').addClass("sensor-icon-active").removeClass("sensor-icon-inactive");
			$('#vehicle-sensor-can-icon p').addClass("sensor-icon-active-p").removeClass("sensor-icon-inactive-p");
		} else {
			$('#vehicle-sensor-can-icon').addClass("sensor-icon-inactive").removeClass("sensor-icon-active");
			$('#vehicle-sensor-can-icon p').addClass("sensor-icon-inactive-p").removeClass("sensor-icon-active-p");
		}

		if(status.isPrivateCANActive) {
			$('#vehicle-sensor-mld-icon').addClass("sensor-icon-active").removeClass("sensor-icon-inactive");
			$('#vehicle-sensor-mld-icon p').addClass("sensor-icon-active-p").removeClass("sensor-icon-inactive-p");
		} else {
			$('#vehicle-sensor-mld-icon').addClass("sensor-icon-inactive").removeClass("sensor-icon-active");
			$('#vehicle-sensor-mld-icon p').addClass("sensor-icon-inactive-p").removeClass("sensor-icon-active-p");
		}

		if(status.isCameraSystemActive) {
			$('#vehicle-sensor-video-icon').addClass("sensor-icon-active").removeClass("sensor-icon-inactive");
			$('#vehicle-sensor-video-icon p').addClass("sensor-icon-active-p").removeClass("sensor-icon-inactive-p");
		} else {
			$('#vehicle-sensor-video-icon').addClass("sensor-icon-inactive").removeClass("sensor-icon-active");
			$('#vehicle-sensor-video-icon p').addClass("sensor-icon-inactive-p").removeClass("sensor-icon-active-p");
		}
		
		
		
		if(status.isDiskAvailable) {
			$('#vehicle-sensor-hd-icon').addClass("sensor-icon-active").removeClass("sensor-icon-inactive");
			$('#vehicle-sensor-hd-icon p').addClass("sensor-icon-active-p").removeClass("sensor-icon-inactive-p");
		} else {
			$('#vehicle-sensor-hd-icon').addClass("sensor-icon-inactive").removeClass("sensor-icon-active");
			$('#vehicle-sensor-hd-icon p').addClass("sensor-icon-inactive-p").removeClass("sensor-icon-active-p");
		}

		$('#continuous-record-button-counter').text(status.continuousSaveCounter);
		$('#ring-buffer-record-button-counter').text(status.ringBufferSaveCounter);
		$('#can-trigger-record-button-counter').text(status.triggeredSaveCounter);


		$('#date-time').html(status.date + '  <strong> ' + status.twentyFourHourTime + '</strong>');		

		
		// vehicle speed
		if(status.vehicleSpeed == null || status.vehicleSpeed == undefined) {
			$('#vehicle-mph').text('Speed Unavailable');
		} else {
			$('#vehicle-mph').text(status.vehicleSpeed + ' mph');
		}
		
		// update vehicle BSMs
		if(status.isLowSpeedWarningActive) {
			context.drawImage(bsmLowSpeed, 46, 92);
			context.drawImage(bsmLowSpeed, 253, 92);
		} else {
			if(status.isDriverBSMActive) {
				context.drawImage(bsmActive, 46, 92);
			} else {
				context.drawImage(bsmInactive, 46, 92);
			} 
			
			if(status.isPassengerBSMActive) {
				context.drawImage(bsmActive, 253, 92);
			} else {
				context.drawImage(bsmInactive, 253, 92);
			}
		}
		
		
		// update the buttons
		if(!status.isInContinuousSave) {
//			clearTimeout(continuousSaveInProgress);
			$('#continuous-recording-button').css('background-color', '#88c09d');
			$('#continuous-record-button-counter').css('background-color', '#649175');
			$('#continuous-record-button').attr('src', 'img/inprogressicons/record.png');
			$('#continuous-recording-button-text').text("Start recording");
		} else {
//			continuousSaveInProgress = setTimeout(changeContSaveImageProgress, 0);
			$('#continuous-recording-button').css('background-color', '#5d98d9');
			$('#continuous-record-button-counter').css('background-color', '#2d66a5');
//			$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-4.png');
			$('#continuous-recording-button-text').text("End recording");
			
			var currentImage = $('#continuous-record-button').attr('src');
			
			if(currentImage.indexOf('icon-2') > -1 || currentImage.indexOf('record.png') > -1) {
				$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-4.png');
			} else if(currentImage.indexOf('icon-4') > -1) {
				$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-6.png');
			} else if(currentImage.indexOf('icon-6') > -1) {
				$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-8.png');
			} else if(currentImage.indexOf('icon-8') > -1) {
				$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-10.png');
			} else if(currentImage.indexOf('icon-10') > -1) {
				$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-12.png');
			} else if(currentImage.indexOf('icon-12') > -1) {
				$('#continuous-record-button').attr('src', 'img/inprogressicons/progress-icon-2.png');
			}
		}

		if(!status.isInTriggeredSave) {
			$('#can-trigger-recording-button').css('background-color', '#88c09d');
			$('#can-trigger-record-button-counter').css('background-color', '#649175');
			$('#can-trigger-record-button').attr('src', 'img/inprogressicons/record.png');
			$('#can-trigger-recording-button-text').text("Start can trigger");

		} else {
			$('#can-trigger-recording-button').css('background-color', '#5d98d9');
			$('#can-trigger-record-button-counter').css('background-color', '#2d66a5');
//			$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-4.png');
			$('#can-trigger-recording-button-text').text("End can trigger");
			
			var currentImage = $('#can-trigger-record-button').attr('src');
			
			if(currentImage.indexOf('icon-2') > -1 || currentImage.indexOf('record.png') > -1) {
				$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-4.png');
			} else if(currentImage.indexOf('icon-4') > -1) {
				$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-6.png');
			} else if(currentImage.indexOf('icon-6') > -1) {
				$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-8.png');
			} else if(currentImage.indexOf('icon-8') > -1) {
				$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-10.png');
			} else if(currentImage.indexOf('icon-10') > -1) {
				$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-12.png');
			} else if(currentImage.indexOf('icon-12') > -1) {
				$('#can-trigger-record-button').attr('src', 'img/inprogressicons/progress-icon-2.png');
			}
		}




	}, 'json').fail(function() {
		console.log("Couldn\'t get page update...");
	});
};

//function getData(requestkey) {
////	var data = {};
//	$.post('InMotionRequestServlet', { "requestkey": requestkey }, function(data) {
////		return data;
//	}, 'json');
//};

