/*

 * Name: jquery.accesibleContentFilter.js
 * Version: 0.9.1
 * Date: 2015-03-29
 * Autor: wh

*/

$(function () {
	
	$.fn.acf = function(settings) {
		
		/* globals  */
		var cat1Array = [];
		var cat2Array = [];
		var cat3Array = [];
		var catEntryArray = [];
		var preCat1 = "";
		var preCat2 = "";
		var preCat3 = "";
		var preCat1Array = [];
		var preCat2Array = [];
		var preCat3Array = [];
		/* / globals  */
		
		var acfContainer = this.attr("id");

		var settings = $.extend({
			listClass: ".wat-cf-entry",
			cat1FormLabel: "Category1",
			cat2FormLabel: "Category2",
			cat3FormLabel: "Category3",
			cat1FormTyp: "select",
			cat2FormTyp: "select",
			cat3FormTyp: "select",
			catCheckBoxRel: "and",
			catErrorNoType: "No form element type for this category defined",
			catSubmitText: "apply",
			catResetText: "reset",
			catHideModus: "fade",
			catNoResult: "Sorry, no matching items for this filter found.",
			catNoResultHTML: "h2",
			catYesResult: "matches found.",
			catYesSingleResult: "match found.",
			catFilterLegend: "Choose filter categories",
			catAllText: "all",
			catAnyText: "any"
			
		}, settings );

		init = function() {
			if($(settings.listClass).length > 0 ) {
				getPreFilter();
				buildFilter(); 	
				doFilter(); 
			}
		}
		init();
		
		
		function getPreFilter() {
			/* querystring prefill filter */
			
			preCat1 = getParameterByName("cat1");
			preCat2 = getParameterByName("cat2");
			preCat3 = getParameterByName("cat3");
			if (preCat1 && preCat1 != "") {
				preCat1Array = preCat1.trim().split(',');
			}
			if (preCat2 && preCat2 != "") {
				preCat2Array = preCat2.trim().split(',');
			}
			if (preCat3 && preCat3 != "") {
				preCat3Array = preCat3.trim().split(',');
			}
			//console.log("preCat1Array=" + preCat1Array + " preCat2Array=" + preCat2Array + " preCat3Array=" + preCat3Array); 
		}
		
		
		function buildFilter() {
			var tempV2 = "";
			var entryId = 0;
			$(settings.listClass).each(function (k1,v1) {

				if ($(this).attr("data-cat1") && settings.cat1FormTyp != false) {
					var tempArray = $(this).attr("data-cat1").trim().split(',');
					$(tempArray).each(function (k2,v2) {
						tempV2 = $.trim(v2)
						tempV2 = decodeURIComponent(escape(tempV2));
						
						if ($.inArray($.trim(tempV2), cat1Array) == -1) {
						   cat1Array.push($.trim(tempV2));
						}
					});
				}

				if ($(this).attr("data-cat2") && settings.cat2FormTyp != false) {
					var tempArray = $(this).attr("data-cat2").trim().split(',');
					$(tempArray).each(function (k2,v2) {
						tempV2 = $.trim(v2)
						tempV2 = decodeURIComponent(escape(tempV2));
						
						if ($.inArray($.trim(tempV2), cat2Array) == -1) {
						   cat2Array.push($.trim(tempV2));
						}
					});

				}
				if ($(this).attr("data-cat3") && settings.cat3FormTyp != false) {
					var tempArray = $(this).attr("data-cat3").trim().split(',');
					$(tempArray).each(function (k2,v2) {
						tempV2 = $.trim(v2)
						tempV2 = decodeURIComponent(escape(tempV2));
						
						if ($.inArray($.trim(tempV2), cat3Array) == -1) { 
						   cat3Array.push($.trim(tempV2));
						}
					});
				}	
				
				if (entryId % 2 == 0){
				  $(this).removeClass('even');
				}
				else{
				  $(this).addClass('even');
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
						if ($.inArray(v1, preCat1Array) != -1) {
							$('#acf_Select1').append($("<option selected>").attr('value',v1).text(v1));
						}
						else {
							$('#acf_Select1').append($("<option>").attr('value',v1).text(v1));
						}
					});
				}
				else if(settings.cat1FormTyp == "checkbox") {
					var acfSel1 = $('<div id="acf_checkboxes1" class="acf_formitem"><strong>' + settings.cat1FormLabel + ': </strong>').appendTo("#acfFilterbar");
					$(cat1Array).each(function(k1,v1) {
						if ($.inArray(v1, preCat1Array) != -1) {
							var tempCheck = '<label for="acf_checkboxes1_' + k1 + '" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup1" value="' + v1 + '" id="acf_checkboxes1_' + k1 + '"> ' + v1 + '</label> ';
						}
						else {
							var tempCheck = '<label for="acf_checkboxes1_' + k1 + '" class="acf_checkbox"><input type="checkbox" name="acf_checkboxgroup1" value="' + v1 + '" id="acf_checkboxes1_' + k1 + '"> ' + v1 + '</label> ';
						}
						$('#acf_checkboxes1').append(tempCheck);
					});
					if (settings.catCheckBoxRel == 'and') {
						var tempCBDef = settings.catAnyText;
						var tempCheckAny = '<label for="acf_checkboxes1_any" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup1" value="' + tempCBDef + '" id="acf_checkboxes1_any"> ' + tempCBDef + '</label> ';
						$('#acf_checkboxes1').append(tempCheckAny);
					}
					
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
						if ($.inArray(v1, preCat2Array) != -1) {
							$('#acf_Select2').append($("<option selected>").attr('value',v1).text(v1));
						}
						else {
							$('#acf_Select2').append($("<option>").attr('value',v1).text(v1));
						}			
					});
				}
				else if(settings.cat2FormTyp == "checkbox") {
					var acfSel2 = $('<div id="acf_checkboxes2" class="acf_formitem"><strong>' + settings.cat2FormLabel + ': </strong>').appendTo("#acfFilterbar");
					$(cat2Array).each(function(k1,v1) {
						if ($.inArray(v1, preCat2Array) != -1) {
							var tempCheck = '<label for="acf_checkboxes2_' + k1 + '" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup2" value="' + v1 + '" id="acf_checkboxes2_' + k1 + '"> ' + v1 + '</label> ';
						}
						else {
							var tempCheck = '<label for="acf_checkboxes2_' + k1 + '" class="acf_checkbox"><input type="checkbox" name="acf_checkboxgroup2" value="' + v1 + '" id="acf_checkboxes2_' + k1 + '"> ' + v1 + '</label> ';
						}
						$('#acf_checkboxes2').append(tempCheck);
					});
						
					if (settings.catCheckBoxRel == 'and') {
						var tempCBDef = settings.catAnyText;
						var tempCheckAny = '<label for="acf_checkboxes2_any" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup2" value="' + tempCBDef + '" id="acf_checkboxes2_any"> ' + tempCBDef + '</label> ';
						$('#acf_checkboxes2').append(tempCheckAny);
					}			
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
						if ($.inArray(v1, preCat3Array) != -1) {
							$('#acf_Select3').append($("<option selected>").attr('value',v1).text(v1));
						}
						else {
							$('#acf_Select3').append($("<option>").attr('value',v1).text(v1));
						}	
					});
				}
				else if(settings.cat3FormTyp == "checkbox") {
					var acfSel3 = $('<div id="acf_checkboxes3" class="acf_formitem"><strong>' + settings.cat3FormLabel + ': </strong>').appendTo("#acfFilterbar");
					$(cat3Array).each(function(k1,v1) {
						
						if ($.inArray(v1, preCat3Array) != -1) {
							var tempCheck = '<label for="acf_checkboxes3_' + k1 + '" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup3" value="' + v1 + '" id="acf_checkboxes3_' + k1 + '"> ' + v1 + '</label> ';
						}
						else {
							var tempCheck = '<label for="acf_checkboxes3_' + k1 + '" class="acf_checkbox"><input type="checkbox" name="acf_checkboxgroup3" value="' + v1 + '" id="acf_checkboxes3_' + k1 + '"> ' + v1 + '</label> ';
						}

						$('#acf_checkboxes3').append(tempCheck);
					});
					
					if (settings.catCheckBoxRel == 'and') {
						var tempCBDef = settings.catAnyText;
						var tempCheckAny = '<label for="acf_checkboxes3_any" class="acf_checkbox"><input checked type="checkbox" name="acf_checkboxgroup3" value="' + tempCBDef + '" id="acf_checkboxes3_any"> ' + tempCBDef + '</label> ';
						$('#acf_checkboxes3').append(tempCheckAny);
					}
					
					
				}
				else if(settings.cat3FormTyp == false) {
				//nothing
				}
				else {
					showErrors(settings.catErrorNoType);
				}
			}
			var tempButt = $('<div id="acf_buttons"><input id="acf_submit" type="submit" value="' + settings.catSubmitText + '"><input id="acf_reset" type="reset" value="' + settings.catResetText + '"></div>').appendTo("#acfFilterbar");
			//$(settings.listClass).wrapAll( "<div id='acf_mainEntries' aria-live='polite'  />");
			$( "<div id='acf_mainEntries' aria-live='polite'  />" ).insertAfter( "#acf_mainForm" );
			$("#acf_mainForm fieldset").prepend('<legend id="acf_mainFormLegend">' + settings.catFilterLegend + "</legend>");
			
			var tempH2 = $('<' + settings.catNoResultHTML + ' id="acf_resultcnt">').prependTo("#acf_mainEntries");
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
			
			if (preCat1Array.length > 0 ||  preCat2Array.length > 0 || preCat3Array.length > 0) {
			
				//console.log("AUTOSUBMIT");
				doAutoSubmit();
			}
			
			$("#acf_mainForm").on( "submit", function(event) {
				doAutoSubmit();
				event.preventDefault();
			});
			
			function doAutoSubmit() {
					
				//get selected values
				var tempV2 = "";
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
				
				var hashParam = "";
				hashParam = "cat1=" + selectedValArray1 + "&cat2=" + selectedValArray2 + "&cat3=" + selectedValArray3;
				console.log("hashParam=" + hashParam);
				location.hash = hashParam;
				
				//if any is selected in select or checkboxes -> value check is always true
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
				
					
				if (settings.catCheckBoxRel == 'and') {
					var tempCBDef2 = settings.catAnyText;
					//only if catCheckBoxRel condition is "and" the "any" checkbox shows all results for this checkboxfieldgroup
					if (($.inArray(tempCBDef2, selectedValArray1) > -1) && settings.cat1FormTyp == "checkbox") {
						//console.log("cat 1 any checkbox");
						runVal1 = true;
					}
					if (($.inArray(tempCBDef2, selectedValArray2) > -1) && settings.cat2FormTyp == "checkbox") {
						//console.log("cat 2 any checkbox");
						runVal2 = true;
					}
					if (($.inArray(tempCBDef2, selectedValArray3) > -1) && settings.cat2FormTyp == "checkbox") {
						//console.log("cat 3 any checkbox");
						runVal3 = true;
					}	
				}
				else {
					var tempCBDef2 = settings.catAllText;
					//only if catCheckBoxRel condition is "or" the "all" checkbox shows all results for this checkboxfieldgroup
					if (($.inArray(tempCBDef2, selectedValArray1) > -1 || selectedValArray1.length == 0) && settings.cat1FormTyp == "checkbox") {
						//console.log("cat 1 any checkbox");
						runVal1 = true;
					}
					if (($.inArray(tempCBDef2, selectedValArray2) > -1 || selectedValArray2.length == 0) && settings.cat2FormTyp == "checkbox") {
						//console.log("cat 2 any checkbox");
						runVal2 = true;
					}
					if (($.inArray(tempCBDef2, selectedValArray3) > -1 || selectedValArray3.length == 0) && settings.cat2FormTyp == "checkbox") {
						//console.log("cat 3 any checkbox");
						runVal3 = true;
					}	
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
							var tempV0 = $.trim(v0);
							tempV2 = decodeURIComponent(escape(tempV0));
							tempPArray.push(tempV2);
						});
						$(selectedValArray1).each(function (k2,v2) {
							
							if(settings.catCheckBoxRel == "or" && settings.cat1FormTyp == "checkbox") {
								// OR Condition in Checkbox
								if ($.inArray($.trim(v2), tempPArray) > -1) {
									showItem1 = true;
								}
							}
							else {
								// Select / AND Condition in checkbox
								if(stopVal1 == false) {
									if ($.inArray($.trim(v2), tempPArray) > -1) {
										showItem1 = true;
									}
									else {
										showItem1 = false;
										//if one item fails -> all fails
										stopVal1 = true;
									}
								}	
							}
						});
					}
					
					if ($(this).attr("data-cat2") && settings.cat2FormTyp != false) {
						var tempArray = []; 
						tempArray = $(this).attr("data-cat2").trim().split(',');
						$(tempArray).each(function (k0,v0) {
							var tempV0 = $.trim(v0);
							tempV2 = decodeURIComponent(escape(tempV0));
							tempPArray.push(tempV2);
						});
						$(selectedValArray2).each(function (k2,v2) {
							
							if(settings.catCheckBoxRel == "or" && settings.cat2FormTyp == "checkbox") {
								// OR Condition in Checkbox
								if ($.inArray($.trim(v2), tempPArray) > -1) {
									showItem2 = true;
								}
							}
							else {
								// Select / AND Condition in checkbox
								if(stopVal2 == false) {
									if ($.inArray($.trim(v2), tempPArray) > -1) {
										showItem2 = true;
									}
									else {
										showItem2 = false;
										//if one item fails -> all fails
										stopVal2 = true;
									}
								}	
							}
						});
					}
					
					if ($(this).attr("data-cat3") && settings.cat3FormTyp != false) {
						var tempArray = []; 
						tempArray = $(this).attr("data-cat3").trim().split(',');
						$(tempArray).each(function (k0,v0) {
							var tempV0 = $.trim(v0);
							tempV2 = decodeURIComponent(escape(tempV0));
							tempPArray.push(tempV2);
						});
						$(selectedValArray3).each(function (k2,v2) {
							if(settings.catCheckBoxRel == "or" && settings.cat1FormTyp == "checkbox") {
								// OR Condition in Checkbox
								if ($.inArray($.trim(v2), tempPArray) > -1) {
									showItem1 = true;
								}
							}
							else {
								// Select / AND Condition in checkbox
								if(stopVal3 == false) {
									if ($.inArray($.trim(v2), tempPArray) > -1) {
										showItem3 = true;
									}
									else {
										showItem3 = false;
										//if one item fails -> all fails
										stopVal3 = true;
									}
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
							if (visCnt % 2 == 0){
							  $(this).removeClass('even');
							}
							else{
							  $(this).addClass('even');
							}
							visCnt++;
						} else {
							$(this).fadeOut('500');	
							$(this).removeClass('even');
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
				


			} // / submit
			
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
				var resCnt = 0;
				$(settings.listClass).each(function(k1,v1) {
					
					if (resCnt % 2 == 0){
					  $(this).removeClass('even');
					}
					else{
					  $(this).addClass('even');
					}	
					resCnt++;
					
					$(this).fadeIn('50');
				});		

			  event.preventDefault();
			});
		}
		
		function checkSelectedValues() {
			
			var tempV2 = "";
			var returnArray = [];
			var tempArray = [];
			var temp1Array = [];
			var temp2Array = [];
			var temp3Array = [];
			
			
			if (settings.cat1FormTyp == "select") {
				if ($.trim($("#acf_Select1 option:selected").val()) == settings.catAllText) {
					$('#acf_Select1 option').each(function() {
						tempV2 = this.value;
						tempV2 = decodeURIComponent(tempV2);
						if (tempV2 != settings.catAllText) {
							tempArray.push($.trim(tempV2));
							temp1Array.push($.trim(tempV2));
						}
					});
				}
				else {
					tempV2 = $("#acf_Select1 option:selected").val();
					tempV2 = decodeURIComponent(tempV2);
					
					tempArray.push($.trim(tempV2));
					temp1Array.push($.trim(tempV2));
				}
			}
			else if (settings.cat1FormTyp == "checkbox") {
				$('input[name="acf_checkboxgroup1"]:checked').each(function() {
					 tempV2 = this.value;
					 tempV2 = decodeURIComponent(tempV2);
				   tempArray.push($.trim(tempV2));
				   temp1Array.push($.trim(tempV2));
				});
			}
		
			if (settings.cat2FormTyp == "select") {
				if ($.trim($("#acf_Select2 option:selected").val()) == settings.catAllText) {
					$('#acf_Select2 option').each(function() {
						tempV2 = this.value;
						tempV2 = decodeURIComponent(tempV2);
						if (tempV2 != settings.catAllText) {
							tempArray.push($.trim(tempV2));
							temp2Array.push($.trim(tempV2));
						}
					});
				}
				else {
					tempV2 = $("#acf_Select2 option:selected").val();
					tempV2 = decodeURIComponent(tempV2);
					
					tempArray.push($.trim(tempV2));
					temp2Array.push($.trim(tempV2));
				}
			}
			else if (settings.cat2FormTyp == "checkbox") {
				$('input[name="acf_checkboxgroup2"]:checked').each(function() {
					 tempV2 = this.value;
					 tempV2 = decodeURIComponent(tempV2);
					 
				   tempArray.push($.trim(tempV2));
				   temp2Array.push($.trim(tempV2));
				});
			}
			
			if (settings.cat3FormTyp == "select") {
				if ($.trim($("#acf_Select3 option:selected").val()) == settings.catAllText) {
					$('#acf_Select3 option').each(function() {	
						tempV2 = this.value;
						tempV2 = decodeURIComponent(tempV2);
					  if (tempV2 != settings.catAllText) {
							tempArray.push($.trim(tempV2));
							temp3Array.push($.trim(tempV2));
						}
					});
				}
				else {
					tempV2 = $("#acf_Select3 option:selected").val();
					tempV2 = decodeURIComponent(tempV2);
					tempArray.push($.trim(tempV2));
					temp3Array.push($.trim(tempV2));
				}
			}
			else if (settings.cat3FormTyp == "checkbox") {
				$('input[name="acf_checkboxgroup3"]:checked').each(function() {
					 tempV2 = this.value;
					 tempV2 = decodeURIComponent(tempV2);
				   tempArray.push($.trim(tempV2));
				   temp3Array.push($.trim(tempV2));
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
	
	function getParameterByName(name) {
		var match = RegExp('[#&]' + name + '=([^&]*)').exec(document.URL);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	//function getHashParameterByName(name) {
	//	var hash = decodeURIComponent(document.URL.substr(document.URL.indexOf('#')+1).replace(/\+/g, ' '));
	//	return hash; 
	//}
	

}(jQuery));	
							