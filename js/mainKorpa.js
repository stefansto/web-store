$(document).ready(function(){
	ispisHedera();
	ispisFutera();
	
	var izabraniProizvodi = localStorage.getItem('korp');
	if(izabraniProizvodi){
		izabraniProizvodi="["+ izabraniProizvodi +"]";
		izabraniProizvodi= JSON.parse(izabraniProizvodi);
		ispisZaKart(izabraniProizvodi);
	}
	else{
		ispisNema();
	}
});

function ispisNema(){
	let ispis="<p class='nemaP'>No items in your cart</p><p class='nemaP'>To buy stuff visit our <a href='prodavnica.html'>STORE</a></p>"
	document.querySelector("#korpa").innerHTML=ispis;
}

function ispisZaKart(z){
	$.ajax({
		url: "data/prodavnica.json",
		method: "GET",
		datatype: "JSON",
		success: function(proizvodi){
			let ispis = "";
			let uk = 0;
			for(let proiz of proizvodi)
				for(let i=0; i<z.length;i++){
					if(proiz.id==z[i].id){
						ispis+=ispisReda(proiz);
						uk+= proiz.cena.nova;
					}
				}
			ispis= "<table id=\"tabelaKorpa\"><tr><th>Item:</th><th>Price:</th></tr>" + ispis + "<tr><td>Total Cost :</td><td class='tableDataCena'>"+uk+"</td></tr></table>";
			ispis+="<div id='izbrisiProizvodeDiv'><a href='#' id='izbrisiProizvode'>Clear your cart!</a></div>";
			document.querySelector("#korpa").innerHTML=ispis;
			$('#izbrisiProizvodeDiv').click(function(){
				localStorage.removeItem('korp');
				ispisNema();
			});
		}
	});
}

function ispisReda(xid){
	let isReda = "";
	isReda += `<tr><td>${xid.ime}</td><td class="tableDataCena">${xid.cena.nova}</td></tr>`;
	return isReda;
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
