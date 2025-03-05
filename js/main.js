$(document).ready(function(){
	var araki={
		"slika":{
			"src":"slike/araki.jpg",
			"alt":"placeholder_image"
		},
		"manje":{
			"tekst": ["Some placeholder text."],
			"dugme": {
				"id": "prikaziVise",
				"naziv": "Show more!"
			}
		},
		"vise":{
			"id": "prikazanoVise",
			"tekst":"Expanded placeholder text."
		}
	}
	document.querySelector('#arakiBlok').innerHTML=ispisCetvrtogBloka(araki);
	ispisHedera();
	ispisFutera();
	ispisTrecegBloka();
	ispisDrugogBloka();
	ispisPrvogBloka();
});

function ispisCetvrtogBloka(x){
	let ispis = "";
	ispis+=`<img src="${x.slika.src}" alt="${x.slika.alt}"/><p>`;
	for(let i=0; i<x.manje.tekst.length; i++){
		ispis+=`${x.manje.tekst[i]} </br>`;
	}
	ispis+=`</p><a href="#${x.vise.id}" id="${x.manje.dugme.id}">${x.manje.dugme.naziv}</a><p id="${x.vise.id}">${x.vise.tekst}</p>`;
	return ispis;
}

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

function ispisTrecegBloka(){
	$.ajax({
		url: "data/blokComparison.json",
		method: "GET",
		datatype: "JSON",
		success: function(slike){
			let ispis = "";
			let i=false;
			for(let slika of slike){
				if(i==false){
					ispis+=`<div class="ekranBlok aktivna first">`;
					i=true;
				}
				else ispis+=`<div class="ekranBlok">`;
				ispis+=`<img src="${slika.slika1.src}" alt="${slika.slika1.alt}"/>`;
				ispis+=`<img src="${slika.slika2.src}" alt="${slika.slika2.alt}"/>`;
				ispis+=`<p>"${slika.text}"</p>`;
				ispis+=`</div>`;
			}
			document.querySelector("#ekran").innerHTML=ispis;			
			$('#ekran .ekranBlok').hide();	
			slajder();
			$('.stop').click(function(){
				if(testerSlajder==false)testerSlajder=true;
				else {
					testerSlajder=false;
					slajder();
				}
			});			
		}
	});
}

function ispisDrugogBloka(){
	$.ajax({
		url: "data/blokOpis.json",
		method: "GET",
		datatype: "JSON",
		success: function(opisi){
			let ispis1 = "";
			let ispis2 = "";
			for(let opis of opisi){
				ispis1+=`<img src="${opis.dugme.dugmeSrc}" class="slika2" alt="${opis.dugme.dugmeAlt}" id="${opis.dugme.dugmeId}" data-id="#${opis.textId}"/>`;
				ispis2+=`<div id="${opis.textId}"><p>${opis.text}</p></div>`;
			}
			document.querySelector("#partSelect").innerHTML=ispis1;
			document.querySelector("#blok2").innerHTML+=ispis2;
			dodajLinkNaSlike();
			prikazPrvog();
		}
	});
}

function ispisPrvogBloka(){
	$.ajax({
		url: "data/blokIntro.json",
		method: "GET",
		datatype: "JSON",
		success: function(intro){
			let ispis = "";
			for(let introDeo of intro){
				ispis+=`<div id="${introDeo.id}"><h3>${introDeo.naslov}</h3><img src="${introDeo.slika.src}" alt="j${introDeo.slika.alt}" class="slika1"/><p>${introDeo.text}</p><img src="${introDeo.dugme.src}" alt="${introDeo.dugme.alt}" class="${introDeo.dugme.class}"/></div>`;
			}
			document.querySelector("#prviblok").innerHTML=ispis;
			sredjivanjePrvogBloka();
		}
	});
}

function sredjivanjePrvogBloka(){
	$('#prvi2').hide();
	
	$('.slikaNext').click(function(){
		$('.slikaNext').parent().fadeOut(200);
		setTimeout(function(){$('#prvi2').fadeIn(200);},200);
		
	});
	
	$('.slikaBack').click(function(){
		$('.slikaBack').parent().fadeOut(200);
		setTimeout(function(){$('#prvi1').fadeIn(200);},200);	
	});
}

function dodajHoverNaLinkove(){
		$('a').hover(
		function(){$(this).animate({'font-size': '25px'},100);},
		function(){$(this).animate({'font-size': '22px'},100);}
	);
}


$(document).ready(function(){
	
	var ulazBlokova = $('.blokovi');
	ulazBlokova.hide();
	ulazBlokova.fadeIn();

});

function slajder(){
	if(testerSlajder==false){
		var trenutni= $('#ekran .aktivna');
		var sledeca= trenutni.next().length?trenutni.next():trenutni.parent().children('.first');
	
		$('.aktivna').hide();
		trenutni.removeClass('aktivna');
		sledeca.addClass('aktivna');
		$('.aktivna').show();
		setTimeout(slajder,2500);
	}
}
		
var testerSlajder=false;

$(document).ready(function(){	
	$('#prikazanoVise').hide();	
	$('#prikaziVise').click(function(){
		$('#prikaziVise').fadeOut('fast');
		$('#prikazanoVise').slideDown();
	});
});

var klikni=true;
var slikaTester=0;

function dodajLinkNaSlike(){
	$('.slika2').click(function(){
		if(klikni==true && $(this).data("id")!=slikaTester){
				let id = $(this).data("id");
				$('#partTekst1, #partTekst2, #partTekst3, #partTekst4, #partTekst5, #partTekst6, #partTekst7, #partTekst8').fadeOut(250);
				$('.selektovan').removeClass('selektovan');
				$(this).addClass('selektovan');
				slikaTester=id;
				klikni=false;
				setTimeout(function(){$(id).fadeIn(500);},250);	
				setTimeout(function(){klikni=true;},750);
			}
	});
}

function prikazPrvog(){
	$('#partTekst2, #partTekst3, #partTekst4, #partTekst5, #partTekst6, #partTekst7, #partTekst8').hide();
	slikaTester="#partTekst1";
	$('#slika21').addClass('selektovan');
}