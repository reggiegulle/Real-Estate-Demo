
$(document).ready(function(){

	$("#video-player-container").css({
		"height":($("#video-player-container").width() * 0.5625) + "px"
	});
	
	$(window).resize(function(){
			$("#video-player-container").css({
			"height":($("#video-player-container").width() * 0.5625) + "px"
		});
	});
	
	$("#customSearch").val("");
	
	

	var realEstateTable = $("#realEstateTable").DataTable({
		"ajax": "flats.json",
		"scrollY":"55rem",
		"scrollCollapse": true,
		"paging": false,
		"info": false,
		"dom": "lrt",
		"autoWidth":false,
		"order":[0, "asc"],
		"columnDefs":[
			{"orderable":false,"targets": [0, 2, 3, 8]},
			{"type":"html-num-fmt","targets":[4,5,7]},
			{"className": "none", "targets":[0, 8, 9, 10]},
			{"className": "all", "targets":[2, 3]},
			{"className": "min-tablet", "targets":[1, 4, 7]},
			{"className": "desktop", "targets":[5, 6]}
		],
		"drawCallback": function(settings){
			populateowlRealEstate();
		}
	});
	
	yadcf.init(realEstateTable, [{
		column_number: 9,
		filter_type: "select",
		data: [{value: "01.", label: "$300,000 - $400,000"},{value: "02.", label: "$400,000 - $600,000"},{value: "03.", label: "$600,000 - $1,000,000"},{value: "04.", label: "$1,000,000+"}],
		filter_container_id: "pricefilter",
		filter_default_label: "Show All"
	},
	{
		column_number: 10,
		filter_type: "select",
		data: [{value: "Tier One", label: "200 - 500"},{value: "Tier Two", label: "600 - 1000"},{value: "Tier Three", label: "1000 - 1500"},{value: "Tier Four", label: "3000+"}],
		filter_container_id: "sqmtrfilter",
		filter_default_label: "Show All"
	},
	{
		column_number: 5,
		filter_type: "select",
		data: [{value: "2", label: "2"}, {value: "3", label: "3"},{value: "4", label: "4"},{value: "5", label: "5"},{value: "6", label: "6"},{value: "12", label: "12"}],
		filter_container_id: "bdrmfilter",
		filter_default_label: "Show All",
		sort_as:"num",
		sort_order: "asc"
	},
	{
		column_number: 6,
		filter_type: "select",
		data: ["1","2","3","4","10"],
		filter_container_id: "carfilter",
		filter_default_label: "Show All",
		sort_as:"num",
		sort_order: "asc"
	}]);
	
	
	function populateowlRealEstate(){
		var realEstateTable = $("#realEstateTable").DataTable();

		var owlRealEstate = $("#owlRealEstate").addClass("owl-carousel");
		var owlRealEstate = $("#owlRealEstate").addClass("owl-theme");
		
		var realestatepos = $("#realestatepos").addClass("owl-carousel");
		var realestatepos = $("#realestatepos").addClass("owl-theme");
		
		owlRealEstate.owlCarousel();
		
		realestatepos.owlCarousel();
		
		owlRealEstate.data("owlCarousel").destroy();
		$("#owlRealEstate").removeClass("owl-carousel");
		$("#owlRealEstate").removeClass("owl-theme");
		$("#owlRealEstate").empty();
		
		realestatepos.data("owlCarousel").destroy();
		$("#realestatepos").removeClass("owl-carousel");
		$("#realestatepos").removeClass("owl-theme");
		$("#realestatepos").empty();
		
		$("#descList").empty();
		

		$("#realEstateTable tbody tr td img").each(function(){
			var videoid = $(this).data("videoid");
			$(this).closest("tr").attr({
				"data-videoid":videoid
			});
		});
		

		$("#realEstateTable tbody tr").each(function(){
		
			var realEstateTable = $("#realEstateTable").DataTable();

			var trindex = $(this).index();
			var trvideoid = $(this).data("videoid");
			var trposindex = realEstateTable.row(this).index();
			
			//adopt the trindex into this tr html attr
			$(this).attr({
				"data-index":trindex
			});
			
			
			//get the "Image" column data
			var trimgdat = realEstateTable.cell(this,3).data();
			
			//get the "Date" column data
			var trdatedat = realEstateTable.cell(this,1).data();
			
			//get the "Price" column data
			var trpricedat = realEstateTable.cell(this,7).data();
			
			//get the "Address" column data
			var tradddat = realEstateTable.cell(this,2).data();
			
			//get the "sqM" column data
			var trsqmdat = realEstateTable.cell(this,4).data();
			
			//get the "bdrm" column data
			var trbdrmdat = realEstateTable.cell(this,5).data();
			
			//get the "carpark" column data
			var trcardat = realEstateTable.cell(this,6).data();
			
			//get the "desc" column data
			var trdescdat = realEstateTable.cell(this,8).data();
			
			var owlRealEstateLiItem = $("<li>");
			owlRealEstateLiItem.attr({
				"data-index":trindex,
				"data-videoid":trvideoid,
				"data-pos":trposindex
			});
			
			//function for adding content to the owlhotel li item
			function addowllitext(){
				
				//create a string variable
				var owllitext = "";
				
				//add elements to the variable
				//add the image data to the li item
				owllitext += trimgdat;
				
				//add the date data to the li item
				owllitext += "<h4>" + trdatedat + "</h4>";
				
				//add the price data to the li item
				owllitext += "<p>" + trpricedat + "</p>";
				
				//output the string
				return owllitext;
			}
			
			//create the var associated with value
			//returned by function addowllitext
			var owlhotelliitemtext = addowllitext();
			
			//append the variable to the owlhotel li item
			owlRealEstateLiItem.append(owlhotelliitemtext);
			
			$("#owlRealEstate").append(owlRealEstateLiItem);

			var descListLiItem = $("<li>").attr("class","desclistitem");
			descListLiItem.attr({
				"data-index":trindex,
				"data-pos":trposindex
			});
			
			//function for adding content to the valentinodesclist li item
			function adddesclitext(){
			
				//create a string variable
				var desclitext = "";
				
				//add elements to the variable
				
				//add elements to the variable
				//add the image data to the li item
				desclitext += trimgdat;
				
				//add the date data to the li item
				desclitext += "<p>" + trdatedat + "</p>";
				
				//add the address data to the li item
				desclitext += "<h4>" + tradddat + "</h4>";
				
				//add the price data to the li item
				desclitext += "<h4>" + trpricedat + "</h4>";
				
				//add the sqMtr data to the li item
				desclitext += "<span class=\"inlineblock\"><p>" + trsqmdat + " SqMtrs</p></span>";
				
				//add the bedroom data to the li item
				desclitext += "<span class=\"inlineblock\"><p>" + trbdrmdat + "-bdrm</p></span>";
				
				//add the carpark data to the li item
				desclitext += "<span class=\"inlineblock\"><p>" + trcardat + "-car space/s</p></span><br />";
				
				//add the desc data to the li item
				desclitext += "<p class=\"desclidesc\">" + trdescdat + "<button class=\"inquirenow\">INQUIRE NOW</button></p>";
				
				//output the string
				return desclitext;
			}
			
			//returned by function adddesclitext
			var descListLiItemtext = adddesclitext();
			
			//append the variable to the owlhotel li item
			descListLiItem.append(descListLiItemtext);

			$("#descList").append(descListLiItem);
		});

		
		var owlRealEstate = $("#owlRealEstate").addClass("owl-carousel");
		var owlRealEstate = $("#owlRealEstate").addClass("owl-theme");
		
		owlRealEstate.owlCarousel({
			items: 6,
			itemsDesktop: [1199,6],
			itemsDesktopSmall: [979,4],
			itemsTablet: [768,3],
			itemsMobile: [479,2],
			pagination: true,
			navigation: true,
			afterInit: owllivideoindex
		});
		
		function owllivideoindex(){
			$("#owlRealEstate li").each(function(){
				$(this).addClass("normalowlli");
				var livideoindex = $(this).data("index");
				
				$(this).click(function(){
					player.playVideoAt(livideoindex);
					$("html, body").animate({
						scrollTop: $("#video-player-container").offset().top 
					},500);
				});
			});
			
			/*$("#owlRealEstate li img").css({
				"height":($("#owlRealEstate li img").width() * 0.5625) + "px"
			});
	
			$(window).resize(function(){
				$("#owlRealEstate li img").css({
					"height":($("#owlRealEstate li img").width() * 0.5625) + "px"
				});
			});*/
			$("#owlRealEstate li img").css({
				"height": 90 + "px",
				"width": 120 + 'px'
			});
		}
		
		var realestatepos = $("#realestatepos").addClass("owl-carousel");
		var realestatepos = $("#realestatepos").addClass("owl-theme");

		realestatepos.owlCarousel({
			jsonPath:"realestatedata.json",
			items: 1,
			itemsDesktop: [1199,1],
			itemsDesktopSmall: [979,1],
			itemsTablet: [768,1],
			itemsMobile: [479,1],
			pagination: false,
			navigation: false,
			mouseDrag: false,
			touchDrag: false,
			afterInit: realestateposbehavior
		});
		
		function realestateposbehavior(){
			$("#realestatebanner").css({
				"height":($("#video-player-container").height()) + "px",
				"min-height":"180px"
			});
			
			$(window).resize(function(){
				$("#realestatebanner").css({
					"height":($("#video-player-container").height()) + "px",
					"min-height":"180px"
				});
			});
			
			$("#realestatepos .owl-wrapper .owl-item li.item").css({
				"height":($("#video-player-container").height()) + "px"
			});
			
			$(window).resize(function(){
				$("#realestatepos .owl-wrapper .owl-item li.item").css({
					"height":($("#video-player-container").height()) + "px"
				});
			});
			
		}

		var searchForm = document.getElementById("customSearch");
		if(searchForm.value.length == 0){
			$("html, body").animate({
				scrollTop: $("#cssmenu").offset().top 
			},0);
		}
		if(searchForm.value.length !== 0){
			$("html, body").animate({
				scrollTop: $("#tableCustomControls").offset().top 
			},0);
		}
		
		

		
	}

	$("#oldestnewestDate,#highestLowestPrice,#lowestHighestSqMtrs,#lowestHighestBdrm,#lowestHighestParking").css({
			"display":"none"
	});
	
	$("#datefilter, #pricefilter, #sqmtrfilter, #bdrmfilter, #carfilter").hide();
	
	$("#datebutton").click(function(){
		$("#datefilter").show();
	});
	
	$("#pricebutton").click(function(){
		$("#pricefilter").show();
	});
	
	$("#sqmbutton").click(function(){
		$("#sqmtrfilter").show();
	});
	
	$("#bedbutton").click(function(){
		$("#bdrmfilter").show();
	});
	
	$("#carbutton").click(function(){
		$("#carfilter").show();
	});
	
	$("#resetfilterbutton").click(function(){
		$("#datefilter, #pricefilter, #sqmtrfilter, #bdrmfilter, #carfilter").hide();
	});
	
	$("select").on("change", function(){
		$("html, body").animate({
			scrollTop: $("#filters-container").offset().top 
		},0);
	});
	
	$(".yadcf-filter-reset-button").click(function(){
		$("html, body").animate({
			scrollTop: $("#filters-container").offset().top 
		},0);
	});
	
	$("#sortRelevance").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.order([0,"asc"]).draw();
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});

	$("#newestOldestDate").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.order([1,"des"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#oldestnewestDate").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});
	
	$("#oldestnewestDate").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.order([1,"asc"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#newestOldestDate").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});
	
	$("#lowestHighestPrice").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.order([7,"asc"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#highestLowestPrice").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});
	
	$("#highestLowestPrice").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.order([7,"des"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#lowestHighestPrice").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});	

	$("#lowestHighestSqMtrs").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.column(4).order("asc").draw();
		$(this).css({
			"display":"none"
		});
		$("#highestLowestSqMtrs").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});
	
	$("#highestLowestSqMtrs").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.column(4).order("des").draw();
		$(this).css({
			"display":"none"
		});
		$("#lowestHighestSqMtrs").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});	

	$("#lowestHighestBdrm").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.column(5).order("asc").draw();
		$(this).css({
			"display":"none"
		});
		$("#highestLowestBdrm").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});
	
	$("#highestLowestBdrm").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.column(5).order("des").draw();
		$(this).css({
			"display":"none"
		});
		$("#lowestHighestBdrm").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});	

	$("#lowestHighestParking").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.column(6).order("asc").draw();
		$(this).css({
			"display":"none"
		});
		$("#highestLowestParking").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});
	
	$("#highestLowestParking").click(function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		realEstateTable.column(6).order("des").draw();
		$(this).css({
			"display":"none"
		});
		$("#lowestHighestParking").css({
			"display":"inline-block"
		});
		$("html, body").animate({
			scrollTop: $("#dataTables-container").offset().top 
		},500);
	});	

	$("#customSearch").keydown(function (event) {
	
		if(event.which == 13){
			var realEstateTable = $("#realEstateTable").DataTable();
	 
			realEstateTable.search( this.value ).draw();
		}	
	});

	$("#searchicon").click(function (){

			var realEstateTable = $("#realEstateTable").DataTable();
			var searchvalue = $("#customSearch").val();
			
			realEstateTable.search( searchvalue ).draw();
	});
	
	$("#searchreset").on("click", function(){
		var realEstateTable = $("#realEstateTable").DataTable();
		$("#customSearch").val("");
		realEstateTable.search( $("#customSearch").val() ).draw();
	});
	
});