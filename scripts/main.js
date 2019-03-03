'use strict'
function datumgeneralo() {
    var szept1 = new Date(2018, 8, 1);
    var delta = 1000 * 60 * 60 * 24 * Math.floor(153 * Math.random());
    var randomDate = new Date(szept1.getTime() + delta);
    return randomDate;
}

function adatbazisGeneralo() {
    for (var i = 0; i < 100; i++) {
        eredmenyek.push(new Eredmeny(
            nevek[Math.floor(nevek.length * Math.random())],
            tantargyak[Math.floor(tantargyak.length * Math.random())],
            erdemjegyek[Math.floor(erdemjegyek.length * Math.random())],
            datumgeneralo().toString().substr(4, 11)
        )
        )
    }
    console.log(JSON.stringify(eredmenyek));
}
//adatbazisGeneralo()

function AnonymousEredmenyToEredmeny(item, index, originalArray) {
    return new Eredmeny(
        item.tanulo,
        item.tantargy,
        item.erdemjegy,
        item.datum
    );
}

function loadEredmenyekFromAdatbazis() {
    var temp = [];
    temp = JSON.parse(adatbazis);
    eredmenyek = temp.map(AnonymousEredmenyToEredmeny);

}

function tanulokAtlagaTantargyakSzerint() {
    var result = [];
    for (var i = 0; i < nevek.length; i++) {
        for (var j = 0; j < tantargyak.length; j++) {
            var temp = eredmenyek.filter((item) => { return item.tanulo === nevek[i] && item.tantargy === tantargyak[j] });
            var sum = 0;
            for (var k = 0; k < temp.length; k++) {
                sum += temp[k].erdemjegy;
            }
            var atlag = sum / temp.length;
            result.push({ tanulo: nevek[i], tantargy: tantargyak[j], atlag: atlag });
        }
    }
    return result;
}

function osztalyAtlagTantargyakSzerint() {
    var result = [];

    for (var i = 0; i < tantargyak.length; i++) {
        var temp = eredmenyek.filter((item) => { return item.tantargy === tantargyak[i] });
        var osszeg = 0;

        for (var j = 0; j < temp.length; j++) {
            osszeg += temp[j].erdemjegy;
        }
        var atlag = osszeg / temp.length;
        result.push(atlag.toFixed(2));
    }
    return result;
}


