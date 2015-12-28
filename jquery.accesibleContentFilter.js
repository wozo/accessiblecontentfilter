/*

 * Name: jquery.accesibleContentFilter.js
 * Version: 0.9
 * Date: 2015-12-28
 * Autor: wh

*/

$(function () {
	
	$.fn.acf = function(settings) {
		
		/* config  */
		var cat1Array = [];
		var cat2Array = [];
		var cat3Array = [];
		var catEntryArray = [];
		/* / config  */
		
		var acfContainer = this.attr("id");

		var settings = $.extend({
			listClass: ".wat-cf-entry",
			cat1FormLabel: "Category1",
			cat2FormLabel: "Category2",
			cat3FormLabel: "Category3",
			cat1FormTyp: "select",
			cat2FormTyp: "select",
			cat3FormTyp: "select",
			catErrorNoType: "No form element type for this category defined",
			catSubmitText: "apply",
			catResetText: "reset",
			catHideModus: "fade",
			catNoResult: "Sorry, no matching items for this filter found.",
			catYesResult: "matches found.",
			catYesSingleResult: "match found.",
			catFilterLegend: "Choose filter categories",
			catAllText: "any"
			
		}, settings );

		init = function() {
			if($(settings.listClass).length > 0 ) {
				buildFilter(); 	
				doFilter(); 
			}
		}
		init();
		
		function buildFilter() {
			
			
			var entryId = 0;
			$(settings.listClass).each(function (k1,v1) {

				if ($(this).attr("data-cat1") && settings.cat1FormTyp != false) {
					var tempArray = $(this).attr("data-cat1").trim().split(',');
					$(tempArray).each(function (k2,v2) {
						var tempV2 = $.trim(v2)
						if ($.inArray($.trim(v2), cat1Array) == -1) {
						   cat1Array.push($.trim(v2));
						}
					});
				}

				if ($(this).attr("data-cat2") && settings.cat2FormTyp != false) {
					var tempArray = $(this).attr("data-cat2").trim().split(',');
					$(tempArray).each(function (k2,v2) {
						if ($.inArray($.trim(v2), cat2Array) == -1) {
						   cat2Array.push($.trim(v2));
						}
					});
				}
				if ($(this).attr("data-cat3") && settings.cat3FormTyp != false) {
					var tempArray = $(this).attr("data-cat3").trim().split(',');
					$(tempArray).each(function (k2,v2) {
						if ($.inArray($.trim(v2), cat3Array) == -1) { 
						   cat3Array.push($.trim(v2));
						}
					});
				}	
			entryId++;
			});
			//console.log("catEntryArray:" + JSON.stringify(catEntryArray));
			
			//buildFilterBar
			var acfFilter = $('<form action="#" id="acf_mainForm"><fieldset><div id="acfFilterbar">').prependTo("#" + acfContainer);		
			
			if(cat1Array.length > 0){
				if(settings.cat1FormTyp == "select") {
					var acfSel1 = $('<div class="acf_formitem acf_select"><label for="acf_Select1">' + settings.cat1FormLabel + ': </label><select id="acf_Select1" name="acf_Select1">').appendTo("#acfFilterbar");
					$('#acf_Select1').append($("<option>").attr('value', settings.catAllText).text(settings.catAllText));
					$(cat1Array).each(function(k1,v1) {
					 $('#acf_Select1').append($("<option>").attr('value',v1).text(v1));
					});
				}
				else if(settings.cat1FormTyp == "checkbox") {
					var acfSel1 = $('<div id="acf_checkboxes1" class="acf_formitem"><strong>' + settings.cat1FormLabel + ': </strong>').appendTo("#acfFilterbar");
					$(cat1Array).each(function(k1,v1) {
						var tempCheck = '<label for="acf_checkboxes1_' + k1 + '" class="acf_checkbox"><input type="checkbox" name="acf_checkboxgroup1" value="' + v1 + '" id="acf_checkboxes1_' + k1 + '"> ' + v1 + '</label> ';
						$('#acf_checkboxes1').append(tempCheck);
					});
					var tempCheckAny = '<label for="acf_checkboxes1_any" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup1" value="' + settings.catAllText + '" id="acf_checkboxes1_any"> ' + settings.catAllText + '</label> ';
					$('#acf_checkboxes1').append(tempCheckAny);
				}
				else if(settings.cat1FormTyp == false) {
				//nothing
				}
				else {
					showErrors(settings.catErrorNoType);
				}
			}
			
			if(cat2Array.length > 0){
				if(settings.cat2FormTyp == "select") {
					var acfSel2 = $('<div class="acf_formitem acf_select"><label for="acf_Select2">' + settings.cat2FormLabel + ': </label><select id="acf_Select2" name="acf_Select2">').appendTo("#acfFilterbar");
					$('#acf_Select2').append($("<option>").attr('value', settings.catAllText).text(settings.catAllText));
					$(cat2Array).each(function(k1,v1) {
					 $('#acf_Select2').append($("<option>").attr('value',v1).text(v1));
					});
				}
				else if(settings.cat2FormTyp == "checkbox") {
					var acfSel2 = $('<div id="acf_checkboxes2" class="acf_formitem"><strong>' + settings.cat2FormLabel + ': </strong>').appendTo("#acfFilterbar");
					$(cat2Array).each(function(k1,v1) {
						var tempCheck = '<label for="acf_checkboxes2_' + k1 + '" class="acf_checkbox"><input type="checkbox" name="acf_checkboxgroup2" value="' + v1 + '" id="acf_checkboxes2_' + k1 + '"> ' + v1 + '</label> ';
						$('#acf_checkboxes2').append(tempCheck);
					});
					var tempCheckAny = '<label for="acf_checkboxes2_any" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup2" value="' + settings.catAllText + '" id="acf_checkboxes2_any"> ' + settings.catAllText + '</label> ';
					$('#acf_checkboxes2').append(tempCheckAny);
				}
				else if(settings.cat2FormTyp == false) {
				//nothing
				}
				else {
					showErrors(settings.catErrorNoType);
				}
			}
			
			if(cat3Array.length > 0){
				if(settings.cat3FormTyp == "select") {
					var acfSel3 = $('<div class="acf_formitem acf_select"><label for="acf_Select3">' + settings.cat3FormLabel + ': </label><select id="acf_Select3" name="acf_Select3">').appendTo("#acfFilterbar");
					$('#acf_Select3').append($("<option>").attr('value', settings.catAllText).text(settings.catAllText));
					$(cat3Array).each(function(k1,v1) {
					 $('#acf_Select3').append($("<option>").attr('value',v1).text(v1));
					});
				}
				else if(settings.cat3FormTyp == "checkbox") {
					var acfSel3 = $('<div id="acf_checkboxes3" class="acf_formitem"><strong>' + settings.cat3FormLabel + ': </strong>').appendTo("#acfFilterbar");
					$(cat3Array).each(function(k1,v1) {
						var tempCheck = '<label for="acf_checkboxes3_' + k1 + '" class="acf_checkbox"><input type="checkbox" name="acf_checkboxgroup3" value="' + v1 + '" id="acf_checkboxes3_' + k1 + '"> ' + v1 + '</label> ';
						$('#acf_checkboxes3').append(tempCheck);
					});
					var tempCheckAny = '<label for="acf_checkboxes3_any" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup3" value="' + settings.catAllText + '" id="acf_checkboxes3_any"> ' + settings.catAllText + '</label> ';
					$('#acf_checkboxes3').append(tempCheckAny);
				}
				else if(settings.cat3FormTyp == false) {
				//nothing
				}
				else {
					showErrors(settings.catErrorNoType);
				}
			}
			var tempButt = $('<div id="acf_buttons"><input id="acf_submit" type="submit" value="' + settings.catSubmitText + '"><input id="acf_reset" type="reset" value="' + settings.catResetText + '"></div>').appendTo("#acfFilterbar");
			$(settings.listClass).wrapAll( "<div id='acf_mainEntries' aria-live='polite'  />");
			$("#acf_mainForm fieldset").prepend('<legend id="acf_mainFormLegend">' + settings.catFilterLegend + "</legend>");
			var tempH2 = $('<h2 id="acf_resultcnt">').prependTo("#acf_mainEntries");
			var itemAnz = $(settings.listClass).length;
			if(itemAnz == 0) {
				$("#acf_resultcnt").html(itemAnz + " " + settings.catNoResult);
			}
			else if(itemAnz == 1) {
				$("#acf_resultcnt").html(itemAnz + " " + settings.catYesSingleResult);
			}
			else {
				$("#acf_resultcnt").html(itemAnz + ' ' + settings.catYesResult);
			}
			
				
		}
		
		function doFilter() {
			$("#acf_mainForm").on( "submit", function(event) {

				//get selected values
				var selectedReturnArray = [];
				var selectedValArrayAll = [];
				var selectedValArray1 = [];
				var selectedValArray2 = [];
				var selectedValArray3 = [];
				var runVal1 = false;
				var runVal2 = false;
				var runVal3 = false;
				selectedReturnArray = checkSelectedValues();
				selectedValArrayAll = selectedReturnArray[0];
				selectedValArray1 = selectedReturnArray[1];
				selectedValArray2 = selectedReturnArray[2];
				selectedValArray3 = selectedReturnArray[3];
				
				//if any is selected in select or chackboxes -> value check is always true
				if ((selectedValArray1.length == cat1Array.length) && settings.cat1FormTyp == "select") {
					//console.log("cat 1 any select");
					runVal1 = true;
				}
				if ((selectedValArray2.length == cat2Array.length) && settings.cat2FormTyp == "select") {
					//console.log("cat 2 any select");
					runVal2 = true;
				}
				if ((selectedValArray3.length == cat3Array.length) && settings.cat3FormTyp == "select") {
					//console.log("cat 3 any select");
					runVal3 = true;
				}		
				
				if (($.inArray(settings.catAllText, selectedValArray1) > -1) && settings.cat1FormTyp == "checkbox") {
					//console.log("cat 1 any checkbox");
					runVal1 = true;
				}
				if (($.inArray(settings.catAllText, selectedValArray2) > -1) && settings.cat2FormTyp == "checkbox") {
					//console.log("cat 2 any checkbox");
					runVal2 = true;
				}
				if (($.inArray(settings.catAllText, selectedValArray3) > -1) && settings.cat2FormTyp == "checkbox") {
					//console.log("cat 3 any checkbox");
					runVal3 = true;
				}	
				
				// ### AND ###
				var visCnt = 0;
				$(settings.listClass).each(function (k1,v1) {
					//console.log("ITEM ### " + k1 + " ###");
					var showItem1 = false;
					var showItem2 = false;
					var showItem3 = false;
					var stopVal1 = false;
					var stopVal2 = false;
					var stopVal3 = false;
					if ($(this).attr("data-cat1") && settings.cat1FormTyp != false) {
						var tempArray = [];
						var tempPArray = [];
						tempArray = $(this).attr("data-cat1").trim().split(',');
						$(tempArray).each(function (k0,v0) {
							var tempV0 = $.trim(v0)
							tempPArray.push(tempV0);
						});
						$(selectedValArray1).each(function (k2,v2) {
							if(stopVal1 == false) {
								if ($.inArray($.trim(v2), tempPArray) > -1) {
									//selected value is in data-cat1 attribute
									//console.log(v2 + " is in data-cat1 - show entry nr.: " + k1);
									showItem1 = true;
								}
								else {
									//selected value is in data-cat1 attribute
									//console.log(v2 + " is NOT in data-cat1 - hide entry nr.: " + k1);
									showItem1 = false;
									//if one item fails -> all fails
									stopVal1 = true;
								}
							}
						});
					}
					if ($(this).attr("data-cat2") && settings.cat2FormTyp != false) {
						var tempArray = []; 
						tempArray = $(this).attr("data-cat2").trim().split(',');
						$(tempArray).each(function (k0,v0) {
							var tempV0 = $.trim(v0)
							tempPArray.push(tempV0);
						});
						$(selectedValArray2).each(function (k2,v2) {
							if(stopVal2 == false) {
								if ($.inArray($.trim(v2), tempPArray) > -1) {
									//selected value is in data-cat1 attribute
									//console.log(v2 + " is in data-cat2 - show entry nr.: " + k1);
									showItem2 = true;
								}
								else {
									//selected value is in data-cat1 attribute
									//console.log(v2 + " is NOT in data-cat2 - hide entry nr.: " + k1);
									showItem2 = false;
									//if one item fails -> all fails
									stopVal2 = true;
								}
							}	
						});
					}
					if ($(this).attr("data-cat3") && settings.cat3FormTyp != false) {
						var tempArray = []; 
						tempArray = $(this).attr("data-cat3").trim().split(',');
						$(tempArray).each(function (k0,v0) {
							var tempV0 = $.trim(v0)
							tempPArray.push(tempV0);
						});
						$(selectedValArray3).each(function (k2,v2) {
							if(stopVal3 == false) {
								if ($.inArray($.trim(v2), tempPArray) > -1) {
									//selected value is in data-cat1 attribute
									//console.log(v2 + " is in data-cat3 - show entry nr.: " + k1);
									showItem3 = true;
								}
								else {
									//selected value is in data-cat1 attribute
									//console.log(v2 + " is NOT in data-cat3 - hide entry nr.: " + k1);
									showItem3 = false;
									//if one item fails -> all fails
									stopVal3 = true;
								}
							}	
						});
					}
					
					if(runVal1 == true || settings.cat1FormTyp == false || cat1Array.length == 0) {
						showItem1 = true;
					}
					if(runVal2 == true || settings.cat2FormTyp == false || cat2Array.length == 0) {
						showItem2 = true;
					}
					if(runVal3 == true || settings.cat3FormTyp == false || cat3Array.length == 0) {
						showItem3 = true;
					}
					
					if(settings.catHideModus == "test") {
						if (showItem1 == true && showItem2 == true && showItem3 == true) {
							$(this).css("background-color", "transparent");
							//$(this).removeClass("passive");
							visCnt++;
						} else {
							$(this).css("background-color", "red");
							//$(this).addClass("passive");
						}
					}	
					if(settings.catHideModus == "fade") {
						if (showItem1 == true && showItem2 == true && showItem3 == true) {
							$(this).fadeIn('3000');
							visCnt++;
						} else {
							$(this).fadeOut('500');
						}
					}							
				});
				if (visCnt == 0) {
					$("#acf_resultcnt").html(settings.catNoResult);
					$("#acf_resultcnt").attr("aria-relevant", "all");
				}
				else if (visCnt == 1) {
					$("#acf_resultcnt").html(visCnt + " " + settings.catYesSingleResult);
					$("#acf_resultcnt").attr("aria-relevant", "all");
				}
				else {
					$("#acf_resultcnt").html(visCnt + " " + settings.catYesResult);
					$("#acf_resultcnt").attr("aria-relevant", "all");
				}
				
				
				
				// ### OR ###
				//hide all - find any matching items and show entry	
				/*
				$(settings.listClass).each(function(k1,v1) {
					$(this).addClass("passive");
				});
				$(selectedValArray1).each(function(k1,v1) {
					//console.log("show cat1:" + v1);
					$( "div" + settings.listClass + "[data-cat1*='" + v1 + "']").removeClass("passive");
					//$( "div" + settings.listClass + ":not([data-cat3*='" + v1 + "'])").addClass("passive");
				});
				$(selectedValArray2).each(function(k1,v1) {
					//console.log("show cat2:" + v1);
					$( "div" + settings.listClass + "[data-cat2*='" + v1 + "']").removeClass("passive");
				});
				$(selectedValArray3).each(function(k1,v1) {
					//console.log("show cat3:" + v1);
					$( "div" + settings.listClass + "[data-cat3*='" + v1 + "']").removeClass("passive");
				});
				*/


				event.preventDefault();
			});
			
			$("#acf_reset").on( "click", function(event) {
			  	
				//summary
				var itemAnz = $(settings.listClass).length;
				if(itemAnz == 0) {
					$("#acf_resultcnt").html(itemAnz + " " + settings.catNoResult);
					$("#acf_resultcnt").attr("aria-relevant", "all");
				}
				else if(itemAnz == 1) {
					$("#acf_resultcnt").html(itemAnz + " " + settings.catYesSingleResult);
					$("#acf_resultcnt").attr("aria-relevant", "all");
				}
				else {
					$("#acf_resultcnt").html(itemAnz + ' ' + settings.catYesResult);
					$("#acf_resultcnt").attr("aria-relevant", "all");
				}
				
				//uncheck	filtera
				if(settings.cat1FormTyp == "select") {
					$("select#acf_Select1").val(settings.catAllText);
				}
				else if (settings.cat1FormTyp == "checkbox"){
					$( "#acf_checkboxes1 input").prop('checked', false);	
					$( "#acf_checkboxes1 input#acf_checkboxes1_any").prop('checked', true);	
				}
				if(settings.cat2FormTyp == "select") {
					$("select#acf_Select2").val(settings.catAllText);
				}
				else if (settings.cat2FormTyp == "checkbox"){
					$( "#acf_checkboxes2 input").prop('checked', false);	
					$( "#acf_checkboxes2 input#acf_checkboxes2_any").prop('checked', true);	
				}
				if(settings.cat3FormTyp == "select") {
					$("select#acf_Select3").val(settings.catAllText);
				}
				else if (settings.cat3FormTyp == "checkbox"){
					$( "#acf_checkboxes3 input").prop('checked', false);	
					$( "#acf_checkboxes3 input#acf_checkboxes3_any").prop('checked', true);	
				}
				
				//show all	
				$(settings.listClass).each(function(k1,v1) {
					$(this).fadeIn('50');
				});		

			  event.preventDefault();
			});
		}
		
		function checkSelectedValues() {
			var returnArray = [];
			var tempArray = [];
			var temp1Array = [];
			var temp2Array = [];
			var temp3Array = [];
			
			
			if (settings.cat1FormTyp == "select") {
				if ($.trim($("#acf_Select1 option:selected").val()) == settings.catAllText) {
					$('#acf_Select1 option').each(function() {
						if (this.value != settings.catAllText) {
							tempArray.push($.trim(this.value));
							temp1Array.push($.trim(this.value));
						}
					});
				}
				else {
					tempArray.push($.trim($("#acf_Select1 option:selected").val()));
					temp1Array.push($.trim($("#acf_Select1 option:selected").val()));
				}
			}
			else if (settings.cat1FormTyp == "checkbox") {
				$('input[name="acf_checkboxgroup1"]:checked').each(function() {
				   tempArray.push($.trim(this.value));
				   temp1Array.push($.trim(this.value));
				});
			}
		
			if (settings.cat2FormTyp == "select") {
				if ($.trim($("#acf_Select2 option:selected").val()) == settings.catAllText) {
					$('#acf_Select2 option').each(function() {
						if (this.value != settings.catAllText) {
							tempArray.push($.trim(this.value));
							temp2Array.push($.trim(this.value));
						}
					});
				}
				else {
					tempArray.push($.trim($("#acf_Select2 option:selected").val()));
					temp2Array.push($.trim($("#acf_Select2 option:selected").val()));
				}
			}
			else if (settings.cat2FormTyp == "checkbox") {
				$('input[name="acf_checkboxgroup2"]:checked').each(function() {
				   tempArray.push($.trim(this.value));
				   temp2Array.push($.trim(this.value));
				});
			}
			
			if (settings.cat3FormTyp == "select") {
				if ($.trim($("#acf_Select3 option:selected").val()) == settings.catAllText) {
					$('#acf_Select3 option').each(function() {	
					  if (this.value != settings.catAllText) {
							tempArray.push($.trim(this.value));
							temp3Array.push($.trim(this.value));
						}
					});
				}
				else {
					tempArray.push($.trim($("#acf_Select3 option:selected").val()));
					temp3Array.push($.trim($("#acf_Select3 option:selected").val()));
				}
			}
			else if (settings.cat3FormTyp == "checkbox") {
				$('input[name="acf_checkboxgroup3"]:checked').each(function() {
				   tempArray.push($.trim(this.value));
				   temp3Array.push($.trim(this.value));
				});
			}
			returnArray[0] = tempArray;
			returnArray[1] = temp1Array;
			returnArray[2] = temp2Array;
			returnArray[3] = temp3Array;
			//console.log(temp1Array);
			return(returnArray);
			event.preventDefault();
		}	
		
		function showErrors(err) {
			//error meldungen
			var message = $('<div id="acfMessage">' + err + '</div>').prependTo("#" + acfContainer);
		}

	};

}(jQuery));	
							