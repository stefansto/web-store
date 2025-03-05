$(document).ready(function(){
	ispisHedera();
	ispisFutera();
	generisanjeReg();
	generisanjeLog();
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

function generisanjeReg(){
	$.ajax({
		url: "data/formaReg.json",
		method: "GET",
		datatype: "JSON",
		success: function(polja){
			let ispis = "";
			
			for(let polje of polja){
				
				if(polje.tip!="radio" && polje.tip!="checkb" && polje.tip!="dropdown"){
					ispis+=`<tr><td class="${polje.klasa}">${polje.ime}</td><td><input type="${polje.tip}" id="${polje.id}" \></td></tr>`;
				}
		
				if(polje.tip=="dropdown")ispis+=unosDatuma();
	
				if(polje.tip=="radio"){
						ispis+=`<tr><td class="${polje.klasa}">${polje.ime}</td>`+generisanjeRadia();
				}
	
				if(polje.tip=="checkb"){
					ispis+=`<tr><td class="${polje.klasa}">${polje.ime}</td>`+unosCheckb();
				}
			}
			ispis+=`<tr><td></td><td><input id="dugmeReg" type="button" value="Register"</td></tr>`;
			document.querySelector("#regTabela").innerHTML=ispis;
			
			dugmeReg();
			blurReg();
			
			korekcijaDatuma();
			}
	});
}

function generisanjeLog(){
	$.ajax({
		url: "data/formaLog.json",
		method: "GET",
		datatype: "JSON",
		success: function(polja){
			let ispis = "";
			
			for(let polje of polja){
				ispis+= `<tr><td class="${polje.klasa}">${polje.ime}</td><td><input type="${polje.tip}" id="${polje.id}" /></td></tr>`;
			}
			ispis+=`<tr><td></td><td><input id="dugmeLog" type="button" value="Log In"</td></tr>`;
			document.querySelector("#logTabela").innerHTML=ispis;
			obavezno = document.querySelectorAll(".vazno");
			dugmeLog();
			blurLog();
			}
	});
	
}

//Generisanje select options tagova zajedno sa godinama
function unosDatuma(){

		var nizDana=[];

		for(var i=1;i<32;i++){
			nizDana.push(i);
		}

		var nizMeseci=["January","February","March","April","May","June","July","August","September","October","November","December"];

		var nizGodina=[];

		for(var i=1940;i<2025;i++){
			nizGodina.push(i);
		}

		var sadrzaj="<tr><td class=\"vazno\">Date of birth*</td><td><select id=\"opDay\">";
		sadrzaj+="<option>Day</option>";

		for(var i=0; i<nizDana.length; i++){
			sadrzaj+="<option>"+nizDana[i]+"</option>";
		}

		sadrzaj+="</select>";
		sadrzaj+="<select id=\"opMesec\">";
		sadrzaj+="<option>Month</option>";

		for(var i=0; i<nizMeseci.length; i++){
			sadrzaj+="<option>"+nizMeseci[i]+"</option>";
		}
		sadrzaj+="</select>";
		sadrzaj+="<select id=\"opGod\">";
		sadrzaj+="<option>Year</option>";

		for(var i=0; i<nizGodina.length; i++){
			sadrzaj+="<option>"+nizGodina[i]+"</option>";
			
		}

		sadrzaj+="</select></td></tr>";
		return sadrzaj;
}

function generisanjeRadia(){
	var sadrzaj="<td>";
	var listaRadia=["Male","Female","Other"];
	var imeGrupeRadio="gender";
	for(var i=0; i<listaRadia.length; i++){
		sadrzaj+="<input type=\"radio\" name=\""+imeGrupeRadio+"\" class=\""+imeGrupeRadio+"\" value=\""+listaRadia[i]+"\"/>   "+listaRadia[i]+"</br>";
	}
	sadrzaj+="</td>";

	return sadrzaj;
}

function unosCheckb(){
	var sadrzaj="<td>";
	var listaCheckb=["I would like to recieve your e-mails!","Sign me for newsletter!","Remember my credidentials!"];
	for(var i=0; i<listaCheckb.length; i++){
		sadrzaj+="<input type=\"checkbox\" class=\"dodatniCheckbox\" value=\""+listaCheckb[i]+"\"/>   "+listaCheckb[i]+"</br>";
	}
	sadrzaj+="</td>";

	return sadrzaj;
}

//Patterni
var patternIme = /^[A-Z][a-z]{2,14}$/;
var patternPrez = /^[A-Z][a-z]{2,20}$/;
var patternPass = /^\S{8,16}$/;
var patternMail = /^\S{1,16}@\S{1,16}\.[A-z]{1,3}$/;

//Selektori za menjanje cssa
var obavezno = document.querySelectorAll(".vazno");
var tabela = document.querySelectorAll("table");

//Dugme za register
function dugmeReg(){
	document.querySelector("#dugmeReg").addEventListener("click",function(){
		
		var imeSend="";
		var prezSend="";
		var passSend="";
		var genderSend="";
		var extraSend=[];
		var mailSend="";
		var datumSend=[];
		
		var greskaUnosa=false;
		
		if(patternIme.test(document.querySelector("#formIme").value)){
			imeSend=document.querySelector("#formIme").value;
			obavezno[0].style.color= "black";
		}
		else {
			greskaUnosa=true;
			obavezno[0].style.color= "#c80200";
		}
		
		if(document.querySelector("#formPass").value==document.querySelector("#formPass2").value){
			if(patternPass.test(document.querySelector("#formPass2").value)){
				obavezno[3].style.color= "black";
				obavezno[2].style.color= "black";
				passSend=document.querySelector("#formPass").value;
			}
			else {
				greskaUnosa=true;
				obavezno[3].style.color= "#c80200";
			}
			
			if(patternPass.test(document.querySelector("#formPass").value)){obavezno[2].style.color= "black";obavezno[3].style.color= "black";}
			else {
				greskaUnosa=true;
				obavezno[2].style.color= "#c80200";
		}}else {
			obavezno[2].style.color= "#c80200";
			obavezno[3].style.color= "#c80200";
			greskaUnosa=true;
		}
			
		if(patternPrez.test(document.querySelector("#formPrez").value)){
				obavezno[1].style.color= "black";
				prezSend=document.querySelector("#formPrez").value;
			}
		else {
			greskaUnosa=true;
			obavezno[1].style.color= "#c80200";
		}
		if(patternMail.test(document.querySelector("#formMail").value)){
			mailSend=document.querySelector("#formMail").value;
			obavezno[4].style.color= "black";
		}
		else {
			greskaUnosa=true;
			obavezno[4].style.color= "#c80200";
		}
		
		//Dropdown uzimanje podataka i error
		var brojIndexa= document.querySelector("#opDay").selectedIndex;
		if(brojIndexa!=0){
			datumSend.push(document.querySelector("#opDay").options[brojIndexa].text);
		}
		else {
			greskaUnosa=true;
			obavezno[5].style.color= "#c80200";
		}
		brojIndexa= document.querySelector("#opMesec").selectedIndex;
		if(brojIndexa!=0){
			datumSend.push(document.querySelector("#opMesec").options[brojIndexa].text);
		}
		else {
			greskaUnosa=true;
			obavezno[5].style.color= "#c80200";
		}
		brojIndexa= document.querySelector("#opGod").selectedIndex;
		if(brojIndexa!=0){
			datumSend.push(document.querySelector("#opGod").options[brojIndexa].text);
		}
		else {
			greskaUnosa=true;
			obavezno[5].style.color= "#c80200";
		}
		
		if(datumSend.length==3)obavezno[5].style.color= "black";
		
		//radio uzimanje podataka
		for(var i=0; i<document.querySelectorAll(".gender").length;i++)if(document.querySelectorAll(".gender")[i].checked)genderSend=document.querySelectorAll(".gender")[i].value;
		
		//checkbox uzimanje podataka
		for(var i=0; i<document.querySelectorAll(".dodatniCheckbox").length;i++)if(document.querySelectorAll(".dodatniCheckbox")[i].checked)extraSend.push(document.querySelectorAll(".dodatniCheckbox")[i].value);
		
		if(greskaUnosa==true)alert("Podaci nisu dobro uneti!");
		else{
			//uzeti podaci
			console.log(imeSend);
			console.log(prezSend);
			console.log(passSend);
			console.log(genderSend);
			console.log(extraSend);
			console.log(mailSend);
			console.log(datumSend);
		}
	});
}

//Dugme za logovanje
function dugmeLog(){
	document.querySelector("#dugmeLog").addEventListener("click",function(){	
		
		var greskaUnosa=false;
		var mailSendLog="";
		var passSendLog="";

		if(patternMail.test(document.querySelector("#formMailLog").value)){
			obavezno[6].style.color= "black";
			mailSendLog=document.querySelector("#formMailLog").value;
		}
		else {
			obavezno[6].style.color= "#c80200";
			greskaUnosa=true;
		}
		
		if(patternPass.test(document.querySelector("#formPassLog").value)){
			obavezno[7].style.color= "black";
			passSendLog=document.querySelector("#formPassLog").value;
		}
		else {
			obavezno[7].style.color= "#c80200";
			greskaUnosa=true;
		}
		if(greskaUnosa==true)alert("Podaci nisu lepo uneti!");
		else{
			console.log(mailSendLog);
			console.log(passSendLog);
		}
	});
}

//Dodavanje blur na stvari
function blurReg(){
	document.querySelector("#formIme").addEventListener("blur",function(){
		if(patternIme.test(document.querySelector("#formIme").value)){
			obavezno[0].style.color= "black";
		}
		else obavezno[0].style.color= "#c80200";
	});
	document.querySelector("#formPrez").addEventListener("blur",function(){
		if(patternIme.test(document.querySelector("#formPrez").value)){
			obavezno[1].style.color= "black";
		}
		else obavezno[1].style.color= "#c80200";
	});
	document.querySelector("#formPass").addEventListener("blur",function(){
		if(patternPass.test(document.querySelector("#formPass").value)){
			obavezno[2].style.color= "black";
		}
		else obavezno[2].style.color= "#c80200";
	});
	document.querySelector("#formPass2").addEventListener("blur",function(){
		if(patternPass.test(document.querySelector("#formPass2").value) && document.querySelector("#formPass2").value==document.querySelector("#formPass").value){
			obavezno[3].style.color= "black";
		}
		else obavezno[3].style.color= "#c80200";
	});
	document.querySelector("#formMail").addEventListener("blur",function(){
		if(patternMail.test(document.querySelector("#formMail").value)){
			obavezno[4].style.color= "black";
		}
		else obavezno[4].style.color= "#c80200";
	});
}

function blurLog(){
	document.querySelector("#formMailLog").addEventListener("blur",function(){
		if(patternMail.test(document.querySelector("#formMailLog").value)){
			obavezno[6].style.color= "black";
		}
		else obavezno[6].style.color= "#c80200";
	});
	document.querySelector("#formPassLog").addEventListener("blur",function(){
		if(patternPass.test(document.querySelector("#formPassLog").value)){
			obavezno[7].style.color= "black";
		}
		else obavezno[7].style.color= "#c80200";
	});
}

//true - reg ; false - log
var prikazan=true;
document.querySelector("#formaLog").setAttribute("class","sakrivenBlok");

document.querySelector("#prikaziLog").addEventListener("click",function(){
	document.querySelector("#formaReg").setAttribute("class","sakrivenBlok");
	document.querySelector("#formaLog").removeAttribute("class");	
});

document.querySelector("#prikaziReg").addEventListener("click",function(){
	document.querySelector("#formaLog").setAttribute("class","sakrivenBlok");
	document.querySelector("#formaReg").removeAttribute("class");	
});

var meseci30=["2","4","6","9","11"];
var manjiBrojDanaUMesecu = false;

function korekcijaDatuma(){
	document.querySelector("#opMesec").addEventListener("change",function(){
		for(var i=0;i<meseci30.length;i++){
			if(meseci30[i]==document.querySelector("#opMesec").selectedIndex){
				manjiBrojDanaUMesecu=true;break;}
			else manjiBrojDanaUMesecu=false;
		}
		if(manjiBrojDanaUMesecu==true && document.querySelector("#opDay").selectedIndex==31)document.querySelector("#opDay").selectedIndex=30;
		console.log(document.querySelector("#opDay").selectedIndex);
		if(document.querySelector("#opDay").selectedIndex>28 && document.querySelector("#opMesec").selectedIndex==2)document.querySelector("#opDay").selectedIndex=28;
	});
	document.querySelector("#opDay").addEventListener("change",function(){
		if(manjiBrojDanaUMesecu==true && document.querySelector("#opDay").selectedIndex==31)document.querySelector("#opDay").selectedIndex=30;
		if(document.querySelector("#opDay").selectedIndex>28 && document.querySelector("#opMesec").selectedIndex==2)document.querySelector("#opDay").selectedIndex=28;
	});
}

function dodajHoverNaLinkove(){
		$('a').hover(
		function(){$(this).animate({'font-size': '25px'},100);},
		function(){$(this).animate({'font-size': '22px'},100);}
	);
}
