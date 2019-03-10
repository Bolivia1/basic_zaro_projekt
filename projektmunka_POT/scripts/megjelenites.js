'use strict';
window.addEventListener('load', Window_Load_Handler, false);

//window eseménykezelője
function Window_Load_Handler() {
    adatokJSONbolObjektumba();
    szerzodesekTablazatRajzolo(szerzodesek, szerzodesekTbody);
    opciokStatisztikahoz();
    ugynokokAtlagaTipusSzerint();
    ertekesitesekGeneralasa();

    var selectNode = document.querySelector('select');
    selectNode.addEventListener('click', OptionsClickHandler, false);
    
    var btnNyomtatas = document.querySelector('#nyomtatas');
	btnNyomtatas.addEventListener('click', NyomtatasClickHandler, false);
}

//fv a szerződések táblázat kirajzolására
function szerzodesekTablazatRajzolo(tomb, tbody) {
    for(var i=0; i<tomb.length; i++) {
        var TR = document.createElement('tr');
        var TD1 = document.createElement('td');
        var TD2 = document.createElement('td');
        var TD3 = document.createElement('td');
        var TD4 = document.createElement('td');
        var TD5 = document.createElement('td');

        TD1.innerText = szerzodesek[i].tipusID;
        TD2.innerText = szerzodesek[i].ugynokID;
        TD3.innerText = szerzodesek[i].osszeg;
        TD4.innerText = szerzodesek[i].tartam;
        TD5.innerText = szerzodesek[i].datum;

        TR.appendChild(TD1);
        TR.appendChild(TD2);
        TR.appendChild(TD3);
        TR.appendChild(TD4);
        TR.appendChild(TD5);

        tbody.appendChild(TR);
    }
}

//fv a 2. táblázatok (értékesítések) kirajzoltatására
function tablazatRajzoloErtekesites(objektumTomb, tablazatokDivje) {
	
	var nodeTable = document.createElement('table');
	nodeTable.setAttribute('cellspacing', '0');
	nodeTable.setAttribute('border', '1');

	var nodeTHead = document.createElement('thead');
	var nodeTBody = document.createElement('tbody');
	var nodeTRHead = document.createElement('tr');
	var nodeTH = document.createElement('th');
	nodeTH.setAttribute('colspan', '2');

	for (var k = 0; k < objektumTomb.length; k++) {
		var nodeTD1 = document.createElement('td');
		var nodeTD2 = document.createElement('td');
		var nodeTR = document.createElement('tr');

		nodeTD1.innerText = objektumTomb[k].tipusID;
		nodeTD1.setAttribute('width', '100px');
		nodeTD1.setAttribute('style', 'border: solid black 1px');
		nodeTD2.innerText = objektumTomb[k].atlag.toFixed(2);
		nodeTD2.setAttribute('width', '100px');
		nodeTD2.setAttribute('style', 'border: solid black 1px');
		nodeTH.innerText = objektumTomb[k].ugynokID;

		nodeTR.appendChild(nodeTD1);
		nodeTR.appendChild(nodeTD2);
		nodeTBody.appendChild(nodeTR);			
	}
	nodeTRHead.appendChild(nodeTH);
	nodeTHead.appendChild(nodeTRHead);
	nodeTable.appendChild(nodeTBody);
	nodeTable.appendChild(nodeTHead);
	tablazatokDivje.appendChild(nodeTable);
}

//a 2. táblázatokat (értékesítések) rajzolja ki, a Window_Load_Handler fv hívja meg
function ertekesitesekGeneralasa() {

	var tablazatStatisztikaNev = ugynokokAtlagaTipusSzerint();
	var belsoTablazat = [];
	for (var i = 0; i < ugynokok.length; i++) {
		for (var j = 0; j < biztositasTipusok.length; j++) {
			belsoTablazat.push(tablazatStatisztikaNev.shift());
		}
		tablazatRajzoloErtekesites(belsoTablazat, ertekesitesekTablakDivje);
		belsoTablazat = [];
	}	
}

//fv a 3. táblázat (statisztika) kirajzolására - név szerinti lekérés - az OptionsClickHandler eseménykezelő fv hívja meg
function tablazatRajzoloStatisztikaNev(objektumTomb, tbody) {
	
			tbody.innerText = '';
			for (var k = 0; k < objektumTomb.length; k++) {
				var nodeTD1 = document.createElement('td');
				var nodeTD2 = document.createElement('td');
				var nodeTR = document.createElement('tr');

				nodeTD1.innerText = objektumTomb[k].tipusID;
				nodeTD2.innerText = objektumTomb[k].atlag.toFixed(2);

				nodeTR.appendChild(nodeTD1);
				nodeTR.appendChild(nodeTD2);

				tbody.appendChild(nodeTR);
			}
}

//fv az options elemek létrehozásához a 3. táblázatnál (statisztika) - Window_Load_Handler hívja meg
function opciokStatisztikahoz() { 
	var selectMezo = document.querySelector('select optgroup');
	var optionNodes = [];
	
	for(var i=0; i<ugynokok.length; i++) {
		var optionNode = document.createElement('option');		
		optionNodes.push(optionNode);
	}
	for (var i = 0; i < ugynokok.length; i++) {
		optionNodes[i].innerHTML = ugynokok[i].Nev;
		selectMezo.appendChild(optionNodes[i]);
	}
}

//eseménykezelő az options elemekhez - 3. táblázat (statisztika) legördülő lista
function OptionsClickHandler() {

	var optionSelected = event.target.value;
	var tablazatStatisztikaNev = ugynokokAtlagaTipusSzerint(); //main.js
	var tablazatStatisztikaNevSzurt = [];

	for (var i = 0; i < tablazatStatisztikaNev.length; i++) {
		if (optionSelected == tablazatStatisztikaNev[i].ugynokID) {
			tablazatStatisztikaNevSzurt.push(tablazatStatisztikaNev[i]);
			tablazatRajzoloStatisztikaNev(tablazatStatisztikaNevSzurt, statisztikaTbody);
		}		
	}
}

//nyomtatás - nyomtatás gomb függvénye
function NyomtatasClickHandler() {
	window.print();
}

