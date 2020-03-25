
$(document).ready(function() {
    // Inicializar la base de datos
    var config = {
        apiKey: "AIzaSyDy60mMMiFgtrIizIqmDzd8R4dJ7Sgzxg8",
        authDomain: "clicker-mikerm24.firebaseapp.com",
        databaseURL: "https://clicker-mikerm24.firebaseio.com",
        projectId: "clicker-mikerm24",
        storageBucket: "clicker-mikerm24.appspot.com",
        messagingSenderId: "483328941100"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

     // Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // console.log(user);
            // console.log('Usuario: ' + user.uid + ' está logueado con ' + user.providerData[0].providerId);
            // var logueado = '<li><p class="navbar-text navbar-center">' + user.email + '</p></li>';
            // logueado += '<li><button type="button" class="btn btn-warning navbar-btn" id="botonLogout">Salir</button></li>';
            var logaut = '<button type="button" class="btn btn-warning navbar-btn" id="botonLogout">Salir</button>';

            $(logaut).appendTo('.swiper-pagination');
            $("#botonLogout").click(desconectar);


            nombreUsuario = user.displayName;
            emailUsuario = user.email;
            usuarioID = user.uid;
            ID_USER = user.uid;
            // console.log('ID_USER',ID_USER); si llega hasta aca

            document.getElementById('correoUsuario').innerHTML = emailUsuario;
            document.getElementById('nombreUsuario').innerHTML = nombreUsuario;
            // document.getElementById('nombreUsuario').innerHTML = nombreUsuario;


        } else {
            console.log('Usuario no logueado');
            location.assign('login.html');
        }
    });

    function desconectar() {
        firebase.auth().signOut().then(function() {
            location.assign('index.html');
        }, function(error) {
            alert("Error al intentar desconectarse.");
        });
    }

    //botonRegistrar puntos
    $('#btn-incremento').click(function() {
        
        console.log(usuarioID);
        var refPuntuaciones = database.ref("puntuacionesASong");
    
        refPuntuaciones.child(usuarioID).set({
            nombreUsuarioLogeado: nombreUsuario,
            correoUsuario: emailUsuario,
            puntos: 10

        }, function() {
            
            Toastify({
                text: "Datos dados de alta",
                gravity: "bottom",
                position: 'left',
                close: true,
                backgroundColor: '#2ed573',
            }).showToast();
            setTimeout(() => {
                location.reload();
            }, 2000);
        });
    });

});