
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

    //scoreBoard
    var refPuntos = database.ref('puntuacionesASong');
    refPuntos.on('value', goData);

     // Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // console.log("user",user);
            // console.log(user);
            // console.log('Usuario: ' + user.uid + ' está logueado con ' + user.providerData[0].providerId);
            // var logueado = '<li><p class="navbar-text navbar-center">' + user.email + '</p></li>';
            // logueado += '<li><button type="button" class="btn btn-warning navbar-btn" id="botonLogout">Salir</button></li>';
            var logaut = '<button type="button" class="btn-logout" id="botonLogout">Salir</button>';

            $(logaut).appendTo('.swiper-pagination');
            $("#botonLogout").click(desconectar);

            nombreUsuario = user.displayName;
            emailUsuario = user.email;
            usuarioID = user.uid;
            ID_USER = user.uid;
           
            document.getElementById('correoUsuario').innerHTML = emailUsuario;
            document.getElementById('nombreUsuario').value = nombreUsuario;

        } else {
            console.log('Usuario no logueado');
            location.assign('login.html');
        }
    });

    //traer la data de el ranking
    function goData(data) 
    {
        // console.log("Data:", data);
        var scoreBoard = document.getElementById('scoreBoard');
        for (var i = 0; i < scoreBoard.length; i++)
        {
            scoreBoard[i].remove();
        }
        
        
        var datosUsuario = data.val();
        
        var keys = Object.keys(datosUsuario);
        
        if(datosUsuario[ID_USER])
        {
            //esconder div de no tienes puntos
            $("#noPoints").hide();
            //puntos del usuario
            points = datosUsuario[ID_USER].puntos;
            // console.log(points);
            points = parseInt(points);
    
            Puntos += points;
            $("#points").val(points);
            $("#contadorDos").html(points);

            var mmidinero = [];
            var JSONObjectNames = [{}];
            // console.log(keys);

            for (var i = 0; i < keys.length; i++) {
                
                var k = keys[i];
               
                
            
                NombreCompletoUsuario = datosUsuario[k].nombreUsuarioLogeado;
                CorreoCompetoUsuario = datosUsuario[k].correoUsuario;
                PuntosCompletosUsuario = datosUsuario[k].puntos;
               
                
                JSONObjectNames.push({oName:NombreCompletoUsuario,oPuntos:PuntosCompletosUsuario});            
            }
            
            // mmidinero =  mmidinero.sort((a,b)=>b-a);

            var JSONUsers = JSONObjectNames.slice(0);
            JSONUsers.sort(function(a,b) {
                return b.oPuntos - a.oPuntos;
            });
          
            for(var j = 0; j < JSONUsers.length; j++)
            {
                if(JSONUsers[j].oPuntos != undefined)
                {
                    var DivNombre = document.createElement("div");
                    DivNombre.innerHTML=JSONUsers[j].oName;
                    var TNombres = document.getElementById('tablaNombres');
                    TNombres.appendChild(DivNombre);

                    var DivPuntos = document.createElement("div");
                    DivPuntos.innerHTML=JSONUsers[j].oPuntos;
                    var TPuntos = document.getElementById('tablaPuntos');
                    TPuntos.appendChild(DivPuntos);
                }
            } 
        }
        else
        {
            console.log("No tienes puntos");
        }
    }

    function desconectar() {
        firebase.auth().signOut().then(function() {
            location.assign('index.html');
        }, function(error) {
            alert("Error al intentar desconectarse.");
        });
    }

    //botonRegistrar puntos
    $('#btn-incremento').click(function() {
        
        if($("#nombreUsuario").val() == "")
        {
            //agregar una clase css para que el input sobresalga
            //mandar un mensaje para el usuario , ya sea en noti o alert
            $("#noNameDiv").show();
            return;
        }
        $("#noNameDiv").hide();
        var refPuntuaciones = database.ref("puntuacionesASong");
        var iMyPoints  = $("#points").val();
    
        refPuntuaciones.child(usuarioID).set({
            idUsuario: usuarioID,
            nombreUsuarioLogeado: nombreUsuario ,
            correoUsuario: emailUsuario,
            puntos: iMyPoints

        }, function() {
            //actualizar usuario profile
            var user = firebase.auth().currentUser; 

            user.updateProfile({
                displayName: document.getElementById('nombreUsuario').value,
            }).then(function() {
            // Update successful.
            }).catch(function(error) {
                alert("Error al capturar nombre.");
                return;
            });
            $("#btn-incremento").attr("disabled", true).addClass("btn-lock");
            
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

    $( "#nombreUsuario" ).change(function() {
        if($( "#nombreUsuario" ).val() != "")
        {
            $("#noNameDiv").hide();
        }
      });
});