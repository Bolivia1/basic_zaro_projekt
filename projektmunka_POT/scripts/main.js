//Adatbázisból JSON adatok objektumba töltése, majd tömbbe másolása
function adatokJSONbolObjektumba() {
    var temp = [];
    temp = JSON.parse(jsonDataStore);
    var ujTomb = [];
    for(k in temp) {
        ujTomb.push(temp[k]);
    }
    return ujTomb;
}

/*Statisztika*/
//Átlagszámítás - ügynökökre biztosítástípus szerint
function ugynokokAtlagaTipusSzerint() {
    var result = [];
    for (var i = 0; i < ugynokok.length; i++) {
        for (var j = 0; j < biztositasTipusok.length; j++) {
            var temp = szerzodesek.filter((item) => {return item.ugynokID === ugynokok[i].Nev && item.tipusID === biztositasTipusok[j].Megnevezes});
            var sum = 0;
            for (var k = 0; k < temp.length; k++) {
                sum += temp[k].osszeg;
            } 
            var atlag = sum / temp.length;
            result.push({ugynokID: ugynokok[i].Nev, tipusID: biztositasTipusok[j].Megnevezes, atlag: atlag});            
        }       
    }
    console.log(result);    
    return result;
}
