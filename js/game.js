const DB_USERS = 'users';

const USERUID = localStorage.getItem('USERUID');
const USERNAME = localStorage.getItem('USERNAME');
const USEREMAIL = localStorage.getItem('USEREMAIL');
const USEREMAILVERIFY = localStorage.getItem('USEREMAILVERIFY');
const USERLVL = localStorage.getItem('USERLVL');
// const USERPOINTS = parseInt(localStorage.getItem('USERPOINTS'));
// console.log(USERPOINTS);

// value to progressbar
// var have = 5;
var iEvolve = localStorage.getItem('USEREVOLVE');

var FPS = 1;
// var Puntos = 0;
Puntos = parseInt(localStorage.getItem('USERPOINTS'));
var iVidas = 2;
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
// const USERPOINTS = localStorage.getItem('USERPOINTS');

// const html elements
const _PBELEMENT = $("#lvlpb");

$(document).ready(function () {
    // console.log(localStorage.getItem('USERUID'));
    // console.log(localStorage.getItem('USEREMAIL'));
    // console.log(localStorage.getItem('USEREMAILVERIFY'));
    // console.log(localStorage.getItem('USERNAME'));
    $("#vidas").append(iVidas);
    $("#spinner").hide();
    $("#correoUsuario").html(localStorage.getItem('USEREMAIL'));
    $("#nombreUsuario").val(localStorage.getItem('USERNAME'));
    $("#plevel").html(USERLVL);
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
}

function selectFrase(value) {
    if (value.id == sDivFrease[0].id) {
        notiEX();
        $("#points").val(Puntos += 1);
        // console.log("PUNTOS: ", Puntos);
        render(Puntos, iEvolve);
        $("#contadorDos").html(Puntos);
        clearInterval(bl);
        iPBar.style.width = 100 + '%';
        secs = 5;
        mins = 0;
        accum = 100;
        contaTime.textContent = '00:05';

        const found = sFrases.find(element => element.idf === value.id);
        const index = sFrases.findIndex(element => element === found);

        sNOFrases.push(found);

        sFrases.splice(index, 1);
        iNumFra -= 1;

        asignarFrase();
    } else {
        notiERR();
        $("#points").val(Puntos -= 1);
        $("#contadorDos").html(Puntos);
        iVidas -= 1;
        if (iVidas <= 0) {
            document.getElementById("vidas").innerHTML = iVidas;
            $(".btn0,.btn1").attr("disabled", true).addClass("btn-lock");
            clearInterval(bl);
            // $(".btn1").attr("disabled", true);
        } else {
            document.getElementById("vidas").innerHTML = iVidas;
            clearInterval(bl);
            iPBar.style.width = 100 + '%';
            secs = 5;
            mins = 0;
            accum = 100;
            contaTime.textContent = '00:05';
            asignarFrase();
        }

    }

}

//funcion incrementar porcentaje
function increaseSeconds() {
    bl = setInterval(() => {
        if (secs < 59) {
            secs--;
        } else {
            secs = 0;
            mins++;
        }

        if (mins >= 59) {
            mins = 0;
            hours++;
        }

        currentTime = checkZero(mins) + ":" + checkZero(secs);

        function checkZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        // accum += Math.round(PERCENT);
        accum -= PERCENT;

        contaTime.textContent = currentTime;
        iPBar.style.width = accum + '%';

        if (accum <= TOTAL_PERCENT) {
            clearInterval(bl);
            iPBar.style.width = 100 + '%';
            secs = 5;
            mins = 0;
            accum = 100;
            contaTime.textContent = '00:05';

            $("#points").val(Puntos -= 1);
            $("#contadorDos").html(Puntos);
            asignarFrase();
        }
    }, TIME);
}

$("#turno").click(function () {
    $("#spinner").show();

    var x = rrandom();
    switch (x) {
        case 1:
            $("#uno").attr("disabled", false);
            // $("#turno").addClass('class-animated');
            break;
        case 2:
            $("#r-turno").html("En Espera").addClass('sinTurno');
            break;
    }
    setTimeout(function () {
        $("#seleccion").fadeOut("slow");

        //iniciar timer
        increaseSeconds();
    }, 1500);
});

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
}

function saveDataProfile() {
    // console.log(USERUID);
    db.collection(DB_USERS).doc(USERUID).set({
            nombre: $("#nombreUsuario").val(),
            email: USEREMAIL,
            emailVerificado: USEREMAILVERIFY,
            ids: USERUID,
            puntos: Puntos,
            lvl: parseInt(iUserLvl),
            evolve: parseInt(iEvolve)
        })
        .then(() => {
            // console.log("Document written with ID: ", user.user.uid);
            localStorage.setItem('USERNAME', $("#nombreUsuario").val());
            localStorage.setItem('USERPOINTS', Puntos);
            localStorage.setItem('USERLVL', parseInt(iUserLvl));
            localStorage.setItem('USEREVOLVE', parseInt(iEvolve));
            console.log("usuario actualizado");
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
        location.assign('./login.html');
    }, function (error) {
        alert("Error al intentar desconectarse.");
    });
}

// Functions to management the progressBar.
function render(p, e) {
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
        Puntos = Puntos - iEvolve;
        iEvolve = iEvolve * 2;
        iUserLvl = iUserLvl + 1;
        $("#plevel").html(iUserLvl);
        // Render pbar to lvl up
        render(Puntos, iEvolve);
    }
}

// 319 lines