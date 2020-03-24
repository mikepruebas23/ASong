var FPS = 1;
var Puntos = 0;
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
var aButtons = [btn0,btn1];

$(document).ready(function () {$("#spinner").hide();});

//random frses
asignarFrase();

function asignarFrase()
{
    var irndmNumber = Math.round(Math.random() * iNumFra);
    var irndmNumber2 = Math.round(Math.random() * iNumFra);
    var irndmNumberButon = Math.round(Math.random() * 1);
    var irndmNumberButon2 = Math.round(Math.random() * 1);
    
    while(irndmNumber2 == irndmNumber)
    {
        irndmNumber2 = Math.round(Math.random() * iNumFra)
    }

    while(irndmNumberButon2 == irndmNumberButon)
    {
        irndmNumberButon2 = Math.round(Math.random() * 1)
    }
    sDivFrease.empty();
    btn1.empty();
    btn0.empty();
    sDivFrease.append(sFrases[irndmNumber2].f);
    sDivFrease.fadeIn(10000);
    sDivFrease.attr("id",sFrases[irndmNumber2].idf).fadeIn( 10000 );
    aButtons[irndmNumberButon].attr("id",sFrases[irndmNumber].idB);
    aButtons[irndmNumberButon].append(sFrases[irndmNumber].buttonName).fadeIn( 10000 );
    aButtons[irndmNumberButon2].attr("id",sFrases[irndmNumber2].idB);
    aButtons[irndmNumberButon2].append(sFrases[irndmNumber2].buttonName).fadeIn( 10000 );;
}

function selectFrase(value)
{
    // $('#card-f').addClass('card-f');
    
    if(value.id == sDivFrease[0].id )
    {
        // console.log("si",value.id,sDivFrease[0].id);
        notiEX();
    
        $("#points").val(Puntos+=1);
        clearInterval(bl);
        iPBar.style.width = 100 + '%';
        secs = 5;
        mins = 0;
        accum = 100;
        contaTime.textContent = '00:05';
        asignarFrase();
    }
    else
    {
        notiERR();
        
        $("#points").val(Puntos-=1);
        clearInterval(bl);
        iPBar.style.width = 100 + '%';
        secs = 5;
        mins = 0;
        accum = 100;
        contaTime.textContent = '00:05';
        asignarFrase();
    }
}

//funcion incrementar porcentaje
function increaseSeconds() 
{
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
            
            $("#points").val(Puntos-=1);
            asignarFrase();
        }
    }, TIME);
}

$("#turno").click(function () 
{
    $("#spinner").show();

    var x = rrandom();
    switch (x) 
    {
        case 1:
            $("#uno").attr("disabled", false);
            // $("#turno").addClass('class-animated');
            break;
        case 2:
            $("#r-turno").html("En Espera").addClass('sinTurno');
            break;
    }
    setTimeout(function () 
    {
        $("#seleccion").fadeOut( "slow" );

        //iniciar timer
        increaseSeconds();
    }, 1500);
});

function rrandom() 
{
    ronda = Math.floor(Math.random() * (3 - 1)) + 1;
    return ronda;
}

//Notificaciones
function notiERR() 
{
    Toastify({
        text: "<i class='fas fa-times'></i>",
        gravity: "bottom",
        position: 'left',
        // duration: 100000,
        backgroundColor: '#EA2027',
    }).showToast();
}
function notiEX() 
{
    Toastify({
        text: "<i class='fas fa-check'></i>",
        gravity: "bottom",
        position: 'left',
        backgroundColor: '#5fca63',
    }).showToast();
}
//209 lines