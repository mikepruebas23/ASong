const DB_USERS = 'users';
var emailREG, passwordREG, passwordConfirmREG;

function sendToIndex() {
    $("#spinner").html("");
    location.assign('../index.html');
}

// Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
function verifyUSer(user){
    let loginUser = getUser(user.user.uid);
    // console.log("loginUser: ", loginUser);
    if(loginUser){
        // console.log(loginUser);
        // console.log("usuario existe");
        // console.log(user);
        console.log("Login");
        setInterval(function(){ sendToIndex(); }, 2000);
    }
    else {
        db.collection(DB_USERS).doc(user.user.uid).set({
            nombre: user.user.displayName,
            email: user.user.email,
            emailVerificado: user.user.emailVerified,
            ids: user.user.uid,
            puntos: 0,
            lvl: 0,
            evolve: 5
        })
        .then(() => {
            // console.log("Document written with ID: ", user.user.uid);
            console.log("usuario creado");
            // sendToIndex();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        }); 
    }
}

function getUser(id){
   let user = db.collection(DB_USERS).get(id).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let user = doc.data();
            console.log("user: ", user);
            console.log(user.ids);
            console.log(user.email);
            console.log(user.nombre);
            console.log(user.puntos);
            console.log(user.lvl);
            console.log(user.evolve);
            localStorage.setItem('USERUID', user.ids);
            localStorage.setItem('USEREMAIL', user.email);
            localStorage.setItem('USEREMAILVERIFY', user.emailVerificado);
            localStorage.setItem('USERNAME', user.nombre);
            localStorage.setItem('USERPOINTS', user.puntos);
            localStorage.setItem('USERLVL', user.lvl);
            localStorage.setItem('USEREVOLVE', user.evolve);
            return user;
        });
    });

    // return getUSer;
    return user;
}

function alFinalizar(error) {
    // console.log(error);

    if (error !== 'undefined') {
        // Códigos de error:
        // auth/invalid-email
        // auth/weak-password
        // auth/email-already-in-use
        switch (error.code) {
            case 'auth/email-already-in-use':
                // alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
                notiERR("ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !.");
                break;
            case 'auth/invalid-email':
                // alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
                notiERR("ERROR: El e-mail facilitado no es un e-mail correcto.");
                break;
            default:
                // alert('Se ha producido un error al crear el usuario.\n\n' + error + '\n');
                notiERR("Se ha producido un error al crear el usuario.\n\n' + error + '\n'");
                break;
        }
    }
}

$(function() {
    $("#botonLogin").click(function() {
        $("#botonLogin").attr("disabled", true).addClass('bnt-disabled');

        $("#spinner").html("<img src='img/spinner.gif' style='width:25px; height:25px;'/>");
        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                verifyUSer(user);
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                console.log(errorCode, errorMessage)

                $("#spinner").html("");
                $("#botonLogin").attr("disabled", false).removeClass('bnt-disabled');
                notiERR("Error al iniciar Session.");
            });
                    // else {
                    //     $("#spinner").html("");
                    //     $("#botonLogin").attr("disabled", false).removeClass('bnt-disabled');
                    //     notiERR("Error al iniciar Session.");
                    // }
    });

    $("#botonRegistro2").click(function() {
        emailREG = $("#emailR").val();
        passwordREG = $("#passwordR").val();
        passwordConfirmREG = $("#passwordR2").val();

        if (passwordREG != passwordConfirmREG) {
            // alert("Error: Las contraseñas son distintas!");
            notiERR("Error: Las contraseñas son distintas!");
            
        } else
            firebase.auth().createUserWithEmailAndPassword(emailREG, passwordREG).then(exito).catch(alFinalizar);
    });
    // $("#botonRegistro").click(function() {
    //     location.assign('registro.html');
    // });


    // $("#botonCancelar").click(function() {
    //     location.assign('login.html');
    // });

    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
});
function notiERR(string) 
{
    Toastify({
        text: string,
        gravity: "bottom",
        position: 'left',
        // top: "85px",
        // duration: 100000,
        backgroundColor: '#EA2027',
    }).showToast();
}