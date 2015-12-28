# Accessible Content Filter 

**By**: [wozo](https://github.com/wozo)  
**When**: December 2015

-----

## description

Experimental "in page" accesible content filter with jquery, 
the values are stored by up to 3 (!) data attributes (data-cat1, data-cat2, data-cat3) e.g.:

```html
<div class="wat-cf-entry" data-cat1="American Express, JCB, Diners Club, Mastercard, Visa" data-cat2="Catering, Family, Wifi, Garden" data-cat3="1010"> 
	entry text 
</div>
```

### init

init the plugin (jquery required)

```html
<script type="text/javascript"> 
$(document).ready(function(){
	$(selector).acf({});   
});
</script>
```

### config
```html
$(selector).acf({							
	listClass: ".wat-cf-entry", //class of the filterable item
	cat1FormLabel: "Category1", //category label
	cat2FormLabel: "Category2", //category label
	cat3FormLabel: "Category3", //category label
	cat1FormTyp: "select", //"select", "checkbox", false
	cat2FormTyp: "select", //"select", "checkbox", false
	cat3FormTyp: "select", //"select", "checkbox", false
	catErrorNoType: "No form element type for this category defined",  //possible error message
	catSubmitText: "apply", //submit text
	catResetText: "reset", //reset text
	catHideModus: "fade", //"fade" or "test" (red background)
	catNoResult: "Sorry, no matching items for this filter found.", //no item found text
	catYesResult: "matches found.", // matches text
	catYesSingleResult: "match found.", // match text
	catFilterLegend: "Choose filter categories", //legend text
	catAllText: "any" //any text
});
```

### testpage

[Test Filter](http://web-tech.at/woz/acf/)  

### todo

testing, performance improvement
