$(document).ready(function(){
	ispisHedera();
	ispisFutera();
	ispisProizvoda();

	var ulazBlokova = $('#gal');
	ulazBlokova.hide();
	ulazBlokova.fadeIn();
	$('.sortiranje').click(sortiranjeProizvoda);
	$('.filtriranje').click(filtriranjeProizvoda);
	$('#trazi').click(searchProizvoda);
	$('#resetovanje').click(function(){
		ispisProizvoda();
		localStorage.removeItem('lastsearch');
		localStorage.removeItem('nacin');
		localStorage.removeItem('niz');
		localStorage.removeItem('filt');
	});
	
	var nacinLocal = localStorage.getItem('nacin');
	var nizLocal = localStorage.getItem('niz');
	var filterLocal = localStorage.getItem('filt');
	var searchLocal = localStorage.getItem('lastsearch');
	
	if(nacinLocal && nizLocal)ispisIzLocalSort(nacinLocal,nizLocal);
	else if (filterLocal)ispisIzLocalFilt(filterLocal);
	else if (searchLocal)ispisizLocalSearch(searchLocal);
	
	var prikaz1 = false;
	$('#sortPrikaz').click(
		function(event){
				if(prikaz1){
					$('.sortiranje').hide();event.preventDefault();
					document.querySelector("#sortPrikaz").innerHTML=`<b>Sort V</b>`;
					prikaz1 = false;
				}
				else {
					$('.sortiranje').show();event.preventDefault();
					document.querySelector("#sortPrikaz").innerHTML=`<b>Sort ^</b>`;
					prikaz1 = true;
				}
			}
	);
	var prikaz2 = true;
	$('#filtPrikaz').click(
		function(event){
				if(prikaz2){
					$('.filtriranje').hide();event.preventDefault();
					document.querySelector("#filtPrikaz").innerHTML=`<b>Choose a category V</b>`;
					prikaz2 = false;
				}
				else {
					$('.filtriranje').show();event.preventDefault();
					document.querySelector("#filtPrikaz").innerHTML=`<b>Choose a category ^</b>`;
					prikaz2 = true;
				}
			}
	);
});

function ispisIzLocalFilt(z){
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			let noviProizvodi = "";
			
			noviProizvodi = proizvodi.filter(x => x.tip == z);
			
			ispis=uzimanjeProizvoda(noviProizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}

function ispisIzLocalSort(x,y){
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			
			proizvodi.sort(function(a,b){
				let vrednostA = "";
				let vrednostB = "";
				
				if(x=="naziv"){
					vrednostA=a.ime;
					vrednostB=b.ime;
				}
				else {
					vrednostA=a.cena.nova;
					vrednostB=b.cena.nova;
				}
				
				if(vrednostA==vrednostB){
					return 0;
				}
				else if(vrednostA<vrednostB){
					return y == "asc" ? -1 : 1;
				}
				else return y == "asc" ? 1 : -1;
			});
			
			ispis=uzimanjeProizvoda(proizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}

function ispisizLocalSearch(z){
	document.querySelector('#potraziProizvod').value=z;
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			let pronadjeniProizvodi = "";
			console.log(z);
			pronadjeniProizvodi = proizvodi.filter(x => {
				let pronadjen = false;
				if(x.ime.indexOf(z)!=-1 || x.tip.indexOf(z)!=-1 || x.cena.nova==z)pronadjen = true;
				return pronadjen;
			});
			
			ispis=uzimanjeProizvoda(pronadjeniProizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}

function uzimanjeProizvoda(pr){
	let ispis="";
	for(let proiz of pr){if(proiz.dostupno){
				ispis+=`<div class="proizvod">
							<p class="nazivProiz">${proiz.ime}</p>
							<img src="${proiz.slika.src}" alt="${proiz.slika.alt}" /><hr/>
							<p class="cena">Price: ${proiz.cena.nova} $`;
				if(proiz.cena.snizenje){ispis+=`<del>${proiz.cena.stara} $</del>`}			
				
				ispis+=`</p><a href="" class="kupi" data-id="${proiz.id}"><b>Buy now!</b></a></div>`;
				}
			}
	return ispis;
}

function kupiDugme(event){
	event.preventDefault();
	let idProizvoda = $(this).data('id');
	let objProiz = { 'id': idProizvoda};
	if(localStorage.getItem('korp')){
		let tester;
		let stop = false;
		let brStop = 0;
		let stariLokal = localStorage.getItem('korp');
		tester="["+ stariLokal+"]";
		tester = JSON.parse(tester);
		for(let i=0; i<tester.length;i++){
			if(tester[i].id==objProiz.id)brStop++;
		}
		if(brStop>=3){
			stop=true;
			brStop=0;
		}
		if(stop){
			alert('Only maximum of three products per person!');
			stop=false;
		}else{
			stariLokal += "," + JSON.stringify(objProiz);
			localStorage.setItem('korp', stariLokal);
			alert("Product is successfully added to your cart!");
		}
	}
	else{
		localStorage.setItem('korp', JSON.stringify(objProiz));
		alert("Product is successfully added to your cart!");
	}
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

function ispisProizvoda(){
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			ispis=uzimanjeProizvoda(proizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}

function sortiranjeProizvoda(event){
	event.preventDefault();
	let nacin = $(this).data('nacin');
	let niz = $(this).data('niz');
	localStorage.setItem('nacin', nacin);
	localStorage.setItem('niz', niz);
	localStorage.removeItem('filt');
	localStorage.removeItem('lastsearch');
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			
			proizvodi.sort(function(a,b){
				let vrednostA = "";
				let vrednostB = "";
				
				if(nacin=="naziv"){
					vrednostA=a.ime;
					vrednostB=b.ime;
				}
				else {
					vrednostA=a.cena.nova;
					vrednostB=b.cena.nova;
				}
				
				if(vrednostA==vrednostB){
					return 0;
				}
				else if(vrednostA<vrednostB){
					return niz == "asc" ? -1 : 1;
				}
				else return niz == "asc" ? 1 : -1;
			});
			
			ispis=uzimanjeProizvoda(proizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}

function filtriranjeProizvoda(event){
	event.preventDefault();
	let tip = $(this).data('tip');
	localStorage.setItem('filt',tip);
	localStorage.removeItem('nacin');
	localStorage.removeItem('niz');
	localStorage.removeItem('lastsearch');
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			let noviProizvodi = "";
			
			noviProizvodi = proizvodi.filter(x => x.tip == tip);
			
			ispis=uzimanjeProizvoda(noviProizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}					

function searchProizvoda(){
	let searchUpis = $('#potraziProizvod').val();
	localStorage.setItem('lastsearch', searchUpis);
	localStorage.removeItem('nacin');
	localStorage.removeItem('niz');
	localStorage.removeItem('filt');
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			let pronadjeniProizvodi = "";
			pronadjeniProizvodi = proizvodi.filter(x => {
				let pronadjen = false;
				if(x.ime.indexOf(searchUpis)!=-1 || x.tip.indexOf(searchUpis)!=-1 || x.cena.nova==searchUpis)pronadjen = true;
				return pronadjen;
			});
			
			ispis=uzimanjeProizvoda(pronadjeniProizvodi);
			document.querySelector("#proizvodi").innerHTML=ispis;
			$('.kupi').click(kupiDugme);
		}
	});
}

function dodajHoverNaLinkove(){
		$('li a').hover(
		function(){$(this).animate({'font-size': '25px'},100);},
		function(){$(this).animate({'font-size': '22px'},100);}
	);
		$('footer a').hover(
		function(){$(this).animate({'font-size': '25px'},100);},
		function(){$(this).animate({'font-size': '22px'},100);}
	);
}