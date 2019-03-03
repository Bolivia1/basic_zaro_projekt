'use strict'
window.addEventListener('load', Window_Load_Handler, false);
var ertesitokTabla = (document.querySelector('#ertesitokTabla'));

function Window_Load_Handler() {
	loadEredmenyekFromAdatbazis();
	tablazatRajzolo();
	opciokStatisztikahoz();
	tanulokAtlagaTantargyakSzerint();
	var selectNode = document.querySelector('select');
	selectNode.addEventListener('click', OptionsClickHandler, false);

	var btnGeneralas = document.querySelector('#generalas');
	btnGeneralas.addEventListener('click', GeneralasClickHandler, false);

	var btnNyomtatas = document.querySelector('#nyomtatas');
	btnNyomtatas.addEventListener('click', NyomtatasClickHandler, false);

}

function tablazatRajzolo() {
	var nodeTBody = document.querySelector('#osztalyzatokTabla tbody');

	nodeTBody.innerText = '';
	for (var i = 0; i < eredmenyek.length; i++) {
		var nodeTD1 = document.createElement('td');
		var nodeTD2 = document.createElement('td');
		var nodeTD3 = document.createElement('td');
		var nodeTD4 = document.createElement('td');
		var nodeTR = document.createElement('tr');

		nodeTD1.innerText = eredmenyek[i].tanulo;
		nodeTD2.innerText = eredmenyek[i].tantargy;
		nodeTD3.innerText = eredmenyek[i].erdemjegy;
		nodeTD4.innerText = eredmenyek[i].datum;

		nodeTR.appendChild(nodeTD1);
		nodeTR.appendChild(nodeTD2);
		nodeTR.appendChild(nodeTD3);
		nodeTR.appendChild(nodeTD4);

		nodeTBody.appendChild(nodeTR);
	}
}

function tablazatRajzoloStatisztikaNev(objektumTomb) {

	var nodeTBody = document.querySelector('#statisztikaTabla tbody');
			nodeTBody.innerText = '';
			for (var k = 0; k < objektumTomb.length; k++) {
				var nodeTD1 = document.createElement('td');
				var nodeTD2 = document.createElement('td');
				var nodeTR = document.createElement('tr');

				nodeTD1.innerText = objektumTomb[k].tantargy;
				nodeTD2.innerText = Math.round(objektumTomb[k].atlag);

				nodeTR.appendChild(nodeTD1);
				nodeTR.appendChild(nodeTD2);

				nodeTBody.appendChild(nodeTR);
			}
}

function tablazatRajzoloStatisztika() {
	var statisztikaTomb = osztalyAtlagTantargyakSzerint();
	var nodeTBody = document.querySelector('#statisztikaTabla tbody');

	nodeTBody.innerText = '';
	for (var i = 0; i < tantargyak.length; i++) {
		var nodeTD1 = document.createElement('td');
		var nodeTD2 = document.createElement('td');
		var nodeTR = document.createElement('tr');

		nodeTD1.innerText = tantargyak[i];
		nodeTD2.innerText = statisztikaTomb[i];

		nodeTR.appendChild(nodeTD1);
		nodeTR.appendChild(nodeTD2);

		nodeTBody.appendChild(nodeTR);
	}
}

function tablazatRajzoloErtesito(objektumTomb) {
	var ertesitokTabla = document.querySelector('#ertesitokTabla');
	var nodeTable = document.createElement('table');
	nodeTable.setAttribute('cellspacing', '0');
	nodeTable.setAttribute('border', '1');

	var nodeTHead = document.createElement('thead');
	var nodeTBody = document.createElement('tbody');
	nodeTBody.setAttribute('padding-bottom', '10px');
	var nodeTRHead = document.createElement('tr');
	var nodeTH = document.createElement('th');
	nodeTH.setAttribute('colspan', '2');

	for (var k = 0; k < objektumTomb.length; k++) {
		var nodeTD1 = document.createElement('td');
		var nodeTD2 = document.createElement('td');
		var nodeTR = document.createElement('tr');

		nodeTD1.innerText = objektumTomb[k].tantargy;
		nodeTD1.setAttribute('width', '125px');
		nodeTD1.setAttribute('style', 'border: solid black 1px');
		nodeTD2.innerText = Math.round(objektumTomb[k].atlag);
		nodeTD2.setAttribute('width', '125px');
		nodeTD2.setAttribute('style', 'border: solid black 1px');
		nodeTH.innerText = objektumTomb[k].tanulo;
		nodeTH.setAttribute('margin-top', '10px');

		nodeTR.appendChild(nodeTD1);
		nodeTR.appendChild(nodeTD2);
		nodeTBody.appendChild(nodeTR);
	}
	nodeTRHead.appendChild(nodeTH);
	nodeTHead.appendChild(nodeTH);
	nodeTable.appendChild(nodeTBody);
	nodeTable.appendChild(nodeTHead);
	ertesitokTabla.appendChild(nodeTable);
}

function opciokStatisztikahoz() {
	var selectMezo = document.querySelector('select optgroup');
	var optionNodes = [];
	
	for(var i=0; i<nevek.length; i++) {
		var optionNode = document.createElement('option');		
		optionNode.addEventListener('click', OptionsClickHandler, false);
		optionNodes.push(optionNode);
	}
	for (var i = 0; i < nevek.length; i++) {
		optionNodes[i].innerHTML = nevek[i];
		selectMezo.appendChild(optionNodes[i]);
	}
}

function OptionsClickHandler() {

	var optionSelected = event.target.value;
	var tablazatStatisztikaNev = tanulokAtlagaTantargyakSzerint();
	var tablazatStatisztikaNevSzurt = [];

	for (var i = 0; i < tablazatStatisztikaNev.length; i++) {
		if (optionSelected == tablazatStatisztikaNev[i].tanulo) {
			tablazatStatisztikaNevSzurt.push(tablazatStatisztikaNev[i]);
			tablazatRajzoloStatisztikaNev(tablazatStatisztikaNevSzurt);
		}
		if (optionSelected == 'osztály') {
			tablazatRajzoloStatisztika();
		}
	}
}

function GeneralasClickHandler() {

	var tablazatStatisztikaNev = tanulokAtlagaTantargyakSzerint();
	var belsoTablazat = [];
	for (var i = 0; i < nevek.length; i++) {
		for (var j = 0; j < tantargyak.length; j++) {
			belsoTablazat.push(tablazatStatisztikaNev.shift());
		}
		tablazatRajzoloErtesito(belsoTablazat);
		belsoTablazat = [];
	}
}

function NyomtatasClickHandler() {
	window.print();
}




