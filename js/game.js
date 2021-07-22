const DB_USERS = 'users';

const USERUID = localStorage.getItem('USERUID');
const USERNAME = localStorage.getItem('USERNAME');
const USEREMAIL = localStorage.getItem('USEREMAIL');
const USEREMAILVERIFY = localStorage.getItem('USEREMAILVERIFY');
const USERLVL = localStorage.getItem('USERLVL');
var USERMONEY = parseInt(localStorage.getItem('USERMONEY'));
var USERCOSTEVIDA = parseInt(localStorage.getItem('USERCOSTEVIDA'));
var USERLIFES = parseInt(localStorage.getItem('USERLIFES'));
// var USERLIFES = 5;
// const USERPOINTS = parseInt(localStorage.getItem('USERPOINTS'));
// console.log(USERPOINTS);

// value to progressbar
// var have = 5;
var iEvolve = localStorage.getItem('USEREVOLVE');

var FPS = 1;
// var Puntos = 0;
Puntos = parseInt(localStorage.getItem('USERPOINTS'));
var iNumFra = 8;
var iPBar;
var bl;
var mins = 0;
var secs = 5;
var iSeconds = 5; //tiempo del contador
const PERCENT = 100 / iSeconds; // Percent for progress bar
var accum = 100; // Accum
const TIME = 1000; // Time for interval
const TOTAL_PERCENT = 0; // 100%
var currentTime;
var iCont = 0;
var fSInterval;
var iPBar = $("#pb")[0];
var sDivFrease = $(".frase");
var btn0 = $(".btn0");
var btn1 = $(".btn1");
var contaTime = document.getElementById("timer");
var aButtons = [btn0, btn1];
var iUserLvl = parseInt(localStorage.getItem('USERLVL'));

// var iContRestantes = sFrases.length;
var iContRestantes = 1;


let iCostefinal =  5 + USERCOSTEVIDA;
// const USERPOINTS = localStorage.getItem('USERPOINTS');

// const html elements
const _PBELEMENT = $("#lvlpb");

$(document).ready(function () {
    $("#spinner").hide();
    $("#correoUsuario").html(localStorage.getItem('USEREMAIL'));
    $("#nombreUsuario").val(localStorage.getItem('USERNAME'));
    $("#plevel").html(USERLVL);
    $("#pmoney").html(USERMONEY);
    $("#plife").html(USERLIFES);
    $("#restantes").html(iContRestantes + "/9");
    $("#costo-vida").html(iCostefinal + '$');
    // console.log(songs)
});

//random frses
asignarFrase();

function asignarFrase() {
    if (iNumFra == 0) {
        iNumFra = 1;
    }
    var irndmNumber = Math.round(Math.random() * iNumFra);
    var irndmNumber2 = Math.round(Math.random() * iNumFra);
    var irndmNumberButon = Math.round(Math.random() * 1);
    var irndmNumberButon2 = Math.round(Math.random() * 1);
    while (irndmNumber2 == irndmNumber) {
        irndmNumber2 = Math.round(Math.random() * iNumFra)
    }
    while (irndmNumberButon2 == irndmNumberButon) {
        irndmNumberButon2 = Math.round(Math.random() * 1)
    }
    sDivFrease.empty();
    btn1.empty();
    btn0.empty();
    if (sFrases.length >= 2) {
        sDivFrease.append(sFrases[irndmNumber2].f);
        sDivFrease.fadeIn(10000);
        sDivFrease.attr("id", sFrases[irndmNumber2].idf).fadeIn(10000);
        aButtons[irndmNumberButon].attr("id", sFrases[irndmNumber].idB);
        aButtons[irndmNumberButon].append(sFrases[irndmNumber].buttonName).fadeIn(10000);
        aButtons[irndmNumberButon2].attr("id", sFrases[irndmNumber2].idB);
        aButtons[irndmNumberButon2].append(sFrases[irndmNumber2].buttonName).fadeIn(10000);

        // increaseSeconds();
    } else {
        $("#sinFrease").show();
        $("#conFrase,.btn0,.btn1").hide();
    }

    // console.log("sFrases: ", sFrases.length);
    // console.log("sNOFrases: ", sNOFrases.length);
}


function selectFrase2(value){
    clearInterval(startGameInterval);
    let found;
    let index;

    $('#restantes').html();

    //Respuesta Correcta
    if (value.id == sDivFrease[0].id) {
        notiEX();
        
        $("#pmoney").html(USERMONEY += 1);
        $("#points").val(Puntos += 1);
        new Audio('../src/acept.mp3').play();
        // console.log("PUNTOS: ", Puntos);
        render(Puntos, iEvolve);
        $("#contadorDos").html(Puntos);
        
        secs = 5;
        contaTime.textContent = '00:05';

        found = sFrases.find(element => element.idf === value.id);
        index = sFrases.findIndex(element => element === found);

        sNOFrases.push(found);
        sFrases.splice(index, 1);

        iNumFra -= 1;

        asignarFrase();
        increaseSeconds2(sFrases);

    } else {
        //Respuesta Incorrecto
        notiERR();
        // $("#points").val(Puntos -= 1);
        new Audio('../src/error.mp3').play();
        $("#contadorDos").html(Puntos);
        USERLIFES -= 1;

        found = sFrases.find(element => element.idf === value.id);
        index = sFrases.findIndex(element => element === found);

        sNOFrases.push(found);
        sFrases.splice(index, 1);

        iNumFra -= 1;

        if (USERLIFES <= 0 || sFrases.length <= 0) {
            
            $(".btn0,.btn1").attr("disabled", true).addClass("btn-lock");
            console.log("SE ACABO!");
            updateUserLifes(USERLIFES);
            updateUserPoints(Puntos);
            updateUserMoney(USERMONEY);
        } else {
            secs = 5;
            asignarFrase();
            increaseSeconds2(sFrases);
        }
        $("#plife").html(USERLIFES);
    }
    iContRestantes++;
    $("#restantes").html(iContRestantes + "/9");


    console.log("sFrases: ", sFrases.length);
    console.log("sNOFrases: ", sNOFrases.length);

}

function increaseSeconds2(value) {
    console.log("VALUES: ", value);
    startGameInterval = setInterval(() => {
        
        secs < 59 ? secs-- : secs = 0
        let currentTime ="00:" + checkZero(secs);

        function checkZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        contaTime.textContent = currentTime;
        console.log("sFrases.length: ", sFrases.length);
        // console.log("SEGUNDOS: ", secs);
        if(secs <= 0){
            
            console.log("SIN TIEMPO!");
            $("#plife").html(USERLIFES -= 1);
            asignarFrase();
            secs = 5;
        }

        if(USERLIFES <= 0 || sFrases.length <= 1){
            $(".btn0,.btn1").attr("disabled", true).addClass("btn-lock");
            clearInterval(startGameInterval);
            updateUserLifes(USERLIFES);
            updateUserPoints(Puntos);
            updateUserMoney(USERMONEY);

        }
    }, TIME);
}

function rrandom() {
    ronda = Math.floor(Math.random() * (3 - 1)) + 1;
    return ronda;
}

//Notificaciones
function notiERR() {
    Toastify({
        text: "<i class='fas fa-times'></i>",
        gravity: "bottom",
        position: 'left',
        // top: "85px",
        // duration: 100000,
        backgroundColor: '#EA2027',
    }).showToast();
}

function notiEX() {
    Toastify({
        text: "<i class='fas fa-check'></i>",
        gravity: "bottom",
        position: 'left',
        backgroundColor: '#5fca63',
    }).showToast();
}
//209 lines

function showAreaGameAdivina() {
    document.getElementById("options").classList.add('dnone');
    document.getElementById("options").classList.remove('options');
    document.getElementById("content-slider-game").classList.remove('dnone');
    document.getElementById("options2").classList.remove('dnone');
}

function saveDataProfile() {
    db.collection(DB_USERS).doc(USERUID).update({
            nombre: $("#nombreUsuario").val(),
            ids: USERUID,
            puntos: parseInt(Puntos),
            lvl: parseInt(iUserLvl),
            evolve: parseInt(iEvolve),
            vidas: parseInt(USERLIFES),
            dinero: parseInt(USERMONEY),
            costeVida: parseInt(USERCOSTEVIDA)
        })
        .then(() => {
            // console.log("Document written with ID: ", user.user.uid);
            localStorage.setItem('USERNAME', $("#nombreUsuario").val());
            localStorage.setItem('USERPOINTS', parseInt(Puntos));
            localStorage.setItem('USERLVL', parseInt(iUserLvl));
            localStorage.setItem('USEREVOLVE', parseInt(iEvolve));
            localStorage.setItem('USERLIFES', parseInt(USERLIFES));
            localStorage.setItem('USERMONEY', parseInt(USERMONEY));
            localStorage.setItem('USERCOSTEVIDA',parseInt(USERCOSTEVIDA));

            mostrarNotificacion('Usuario Actualizado!');
            
            getPlayersRangking();
            // sendToIndex();
        })
        .catch((error) => {
            console.error("Error updated document: ", error);
        });
}

function logOut() {
    firebase.auth().signOut().then(function () {
        localStorage.removeItem('USERUID');
        localStorage.removeItem('USEREMAIL');
        localStorage.removeItem('USEREMAILVERIFY');
        localStorage.removeItem('USERNAME');
        localStorage.removeItem('USERPOINTS');
        localStorage.removeItem('USERLVL');
        localStorage.removeItem('USEREVOLVE');
        localStorage.removeItem('USERMONEY');
        localStorage.removeItem('USERLIFES');
        localStorage.removeItem('USERCOSTEVIDA');
        location.assign('./login.html');
    }, function (error) {
        alert("Error al intentar desconectarse.");
    });
}

// Functions to management the progressBar.
function render(p, e) {
    !p ? p = 0 : p=p;
    !e ? e= 5 : e = e;
    e = parseInt(e);
    $('#have').html(p + "/");
    $('#evolve').html(e);
    if (p <= e) {
        fillProgressBar(p);
    }
    
}

// Render the ProgressBar
render(Puntos, iEvolve);


// Fill de ProgressBar
function fillProgressBar(iPoints) {
    let increment = iPoints / iEvolve * 100;
    if (increment >= 100) {
        _PBELEMENT.width('100%');
        lvlup();
        console.log("iUserLvl: ", iUserLvl);
    } else {
        _PBELEMENT.width(increment + '%');
    }
}

// lvl up progress
function lvlup() {
    if (Puntos >= iEvolve) {
        console.log("AQUI!: ",Puntos);
        Puntos = Puntos - iEvolve;
        iEvolve = iEvolve * 2;
        iUserLvl = iUserLvl + 1;
        $("#plevel").html(iUserLvl);
        // Render pbar to lvl up
        render(Puntos, iEvolve);
        updateUserLvl(iUserLvl,iEvolve);
    }
}

function startGame(){
    increaseSeconds(sFrases);
    document.getElementById("options2").classList.add('dnone');
}

function startGame2(){
    $('#wall').hide();
    $('#conFrase').removeClass('d-none');
    $('#btnGame').removeClass('d-none');
    
    if(USERLIFES > 0 ) {
        document.getElementById("options2").classList.add('dnone');
        increaseSeconds2(sFrases);
    }
    else {
        // poner alerta de no tienes vidas, no puedes jugar
        console.log("No tienes vidad, no puedes jugar.")
    }
}

// GET SHOP LIFES
async function shopBuyLifes(){
    let iStock;
    document.getElementById("btn-shop-lifes").disabled = true;
    $("#btn-shop-lifes").addClass("el-blocked");
    
    const snapshot = await  db.collection("shop").get("vidas");
    let retriveData = snapshot.docs.map(doc => doc.data());

    console.log(retriveData[1]);

    // iCantidad = retriveData[1].cantidad;
    iStock = retriveData[1].stock - 1;


    await db.collection("shop").doc("vidas").update({
        stock: iStock
    })
    .then(() => {

        //Money
        USERMONEY = USERMONEY - iCostefinal;
        console.log("iCostefinal: ", iCostefinal, "USERMONEY: ", USERMONEY);
        USERCOSTEVIDA = USERCOSTEVIDA + 1;
        updateUserMoney(USERMONEY);
        localStorage.setItem('USERCOSTEVIDA', USERCOSTEVIDA);
        iCostefinal = 5 + USERCOSTEVIDA;

        

        //Life
        USERLIFES = USERLIFES + 1;
        $("#plife").html(USERLIFES);
        updateUserLifes(USERLIFES);

        $("#extra-lifre").html("VIDA EXTRA: " + iStock);
        $("#costo-vida").html(iCostefinal + "$");
        $("#pmoney").html(USERMONEY);
        
        console.log("Store actualizado");
    })
    .catch((error) => {
        console.error("Error updated document: ", error);
    });

    setInterval(function(){
        document.getElementById("btn-shop-lifes").disabled = false;
        $("#btn-shop-lifes").removeClass("el-blocked");
        }, 8000);
    

    // const snapshot = await firebase.firestore().collection('shop').get();
    // console.log(snapshot.docs.map(doc => doc.data()));
}

function renderValueToView(concepto, cantidad){
    switch (concepto) {
        case "money":
            $("#pmoney").html(cantidad);
            break;
        case "lifes":
            $("#plife").html(cantidad);
            break;
        case "points":
            $("#points").html(cantidad);
            break;
        case "iUserLvl":
            $("#plevel").html(cantidad);
            break;
        default:
            break;
    }
}

//Save ONLY money user
async function updateUserMoney(iMoney){
    await db.collection(DB_USERS).doc(USERUID).update({
        dinero: iMoney,
        costeVida: USERCOSTEVIDA
    })
    .then(() => {
        localStorage.setItem('USERMONEY', iMoney);
        renderValueToView("money",iMoney);
        console.log("money actualizado");
        // sendToIndex();
    })
    .catch((error) => {
        console.error("Error updated document: ", error);
    });
}

async function updateUserLifes(iLifes){
    await db.collection(DB_USERS).doc(USERUID).update({
        vidas: iLifes
    })
    .then(() => {
        localStorage.setItem('USERLIFES', iLifes);
        renderValueToView("lifes", iLifes);
        console.log("iLifes actualizado");
        // sendToIndex();
    })
    .catch((error) => {
        console.error("Error updated document: ", error);
    });
}

async function updateUserPoints(Puntos){
    console.log("Puntos: ", Puntos);
    await db.collection(DB_USERS).doc(USERUID).update({
        puntos: Puntos
    })
    .then(() => {
        localStorage.setItem('USERPOINTS', Puntos);
        renderValueToView("points", Puntos);
        console.log("Puntos actualizados");
        // sendToIndex();
    })
    .catch((error) => {
        console.error("Error updated document: ", error);
    });
}

async function updateUserLvl(iUserLvl,e){
    console.log("iUserLvl: ", iUserLvl);
    await db.collection(DB_USERS).doc(USERUID).update({
        lvl: parseInt(iUserLvl),
        evolve: parseInt(e),
        puntos: parseInt(Puntos),
        vidas: parseInt(USERLIFES)
    })
    .then(() => {
        localStorage.setItem('USERLVL', iUserLvl);
        localStorage.setItem('USEREVOLVE', e);
        renderValueToView("iUserLvl", iUserLvl);
        console.log("updateUserLvl actualizados");
        // sendToIndex();
    })
    .catch((error) => {
        console.error("Error updated document: ", error);
    });
}


async function getPlayersRangking(){

    let tablaNombres = document.getElementById('tablaNombres');
    let tablaPuntos = document.getElementById('tablaPuntos');

    while ( tablaNombres.firstChild ) tablaNombres.removeChild( tablaNombres.firstChild );
    while ( tablaPuntos.firstChild ) tablaPuntos.removeChild( tablaPuntos.firstChild );

    const snapshot = await firebase.firestore().collection('users').orderBy('lvl','desc').get()
    return snapshot.docs.map((doc) =>{

        var newDiv = document.createElement("div");
        var newDivLVL = document.createElement("div");

        newDiv.innerHTML = doc.data().nombre;
        newDivLVL.innerHTML = doc.data().lvl;

        var ElmRow = document.createElement('div');
        var ElmRow2 = document.createElement('div');

        ElmRow.appendChild(newDiv);
        ElmRow2.appendChild(newDivLVL);

        

        tablaNombres.appendChild(ElmRow);
        tablaPuntos.appendChild(ElmRow2);

    });
        // return response;
}

function mostrarNotificacion(mensaje){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 2000
    });
}

getPlayersRangking();
// console.log("xt: ",xt)};

// 319 lines
// 523 lines 11/07/2021
// 548 lines 22/07/2021