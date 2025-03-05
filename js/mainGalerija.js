$(document).ready(function(){
	ispisHedera();
	ispisFutera();
	ispisSlika();
	
	var ulazBlokova = $('#gal');
	ulazBlokova.hide();
	ulazBlokova.fadeIn();
});

function ispisHedera(){
	$.ajax({
		url: "data/meni.json",
		method: "GET",
		datatype: "JSON",
		success: function(linkovi){
			let ispis = "<div class=\"sredina\"><div id=\"logo\"><img src=\"slike/logo.png\" alt=\"logo\"/></div><div id=\"nav-meni\"><ul>";
			for(let link of linkovi){
				ispis+=`<li><a href="${link.link}" target="_self">${link.naziv}</a></li>`;
			}
			ispis+="</ul></div><div class=\"cistac\"></div></div><div class=\"cistac\"></div>";
			document.querySelector("#pocetna").innerHTML=ispis;
			dodajHoverNaLinkove();
		}
	});
}

function ispisFutera(){
	$.ajax({
		url: "data/meniFooter.json",
		method: "GET",
		datatype: "JSON",
		success: function(linkovi){
			let ispis = "<p>This is a quick personal project I made for learning.</p>";
			for(let link of linkovi){
				ispis+=`<a href="${link.link}"><p>${link.naziv}</p></a>`;
			}
			document.querySelector("footer").innerHTML=ispis;
			dodajHoverNaLinkove();
		}
	});
}

function ispisSlika(){
	$.ajax({
		url: "data/slike.json",
		method: "GET",
		datatype: "JSON",
		success: function(slike){
			let unosSlika="";
			let brojBlokova=0;
			let i=0;
			let noviElement = document.createElement("div");
			noviElement.setAttribute("class","razmak");
			let deoStrane = document.querySelector("#gal");
			for(let slika of slike){
					if(i%4==3){
						unosSlika+=`<div class="blokSlika"><a href="${slika.src}"><img src="${slika.src}" alt="${slika.alt}" class="slikeZaGaleriju"/></a></div>`;
						noviElement.innerHTML=unosSlika;
						document.querySelector("#gal").insertBefore(noviElement, null);
						noviElement = document.createElement("div");
						noviElement.setAttribute("class","razmak");
						unosSlika="";
						i++;
					}
					else{
						unosSlika+=`<div class="blokSlika"><a href="${slika.src}"><img src="${slika.src}" alt="${slika.alt}" class="slikeZaGaleriju"/></a></div>`;
						i++;
					}
			}
			dodajHoverNaSlike();
			
		}
	});
}

function dodajHoverNaSlike(){
		$('#gal img').hover(
		function(){$(this).animate({'height':'156px','width':'277px'},50);},
		function(){$(this).animate({'height':'150px','width':'270px'},50);}
	);
}

function dodajHoverNaLinkove(){
		$('a').hover(
		function(){$(this).animate({'font-size': '25px'},100);},
		function(){$(this).animate({'font-size': '22px'},100);}
	);
}