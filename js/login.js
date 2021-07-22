const DB_USERS = 'users';
var emailREG, passwordREG, passwordConfirmREG;

function sendToIndex() {
    $("#spinner").html("");

    //local path
    // location.assign('../index.html');

    //Server
    location.assign('https://mikepruebas23.github.io/ASong/');
}

// Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
var userTest = 0;
async function verifyUSer(user){
    let resp = await getUser(user.user.uid);
    if(resp){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio de Sesión con exito!',
            showConfirmButton: false,
            timer: 2000
        });
        setInterval(function(){ sendToIndex(); }, 2000);
    }
    else {
        //change data || set
        db.collection(DB_USERS).doc(user.user.uid).set({
            nombre: 'TuNombre',
            email: user.user.email,
            emailVerificado: user.user.emailVerified,
            ids: user.user.uid,
            puntos: 0,
            lvl: 0,
            evolve: 5,
            dinero: 0,
            costeVida: 1,
            vidas: 10
        })
        .then(() => {

            localStorage.setItem('USERNAME','TuNombre');
            localStorage.setItem('USEREMAIL', user.user.email);
            localStorage.setItem('USEREMAILVERIFY', user.user.emailVerified);
            localStorage.setItem('USERUID', user.user.uid);
            localStorage.setItem('USERPOINTS', 0);
            localStorage.setItem('USERLVL', 0);
            localStorage.setItem('USEREVOLVE', 5);
            localStorage.setItem('USERMONEY', 0);
            localStorage.setItem('USERCOSTEVIDA', 1);
            localStorage.setItem('USERLIFES', 10);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Inicio de Sesión con exito!',
                showConfirmButton: false,
                timer: 2000
            });
            setInterval(function(){ sendToIndex(); }, 2000);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        }); 
    }
}

function getUser(id){

    let docRef = db.collection("users").doc(id);
    return docRef.get().then((doc) => { 
        if (doc.exists) {
                let user = doc.data();
                if (id == user.ids){
                    localStorage.setItem('USERUID', user.ids);
                    localStorage.setItem('USEREMAIL', user.email);
                    localStorage.setItem('USEREMAILVERIFY', user.emailVerificado);
                    localStorage.setItem('USERNAME', user.nombre);
                    localStorage.setItem('USERPOINTS', user.puntos);
                    localStorage.setItem('USERLVL', user.lvl);
                    localStorage.setItem('USEREVOLVE', user.evolve);
                    localStorage.setItem('USERMONEY', user.dinero);
                    localStorage.setItem('USERLIFES', user.vidas);
                    localStorage.setItem('USERCOSTEVIDA', user.costeVida);
                    return true;
                }
            } else {
                return false;
            }
        }).catch(error => {
            console.log("Error getting document:", error);
        });

}

function alFinalizar(error) {

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
    });

    $("#botonRegistro2").click(function() {
        emailREG = $("#emailR").val();
        passwordREG = $("#passwordR").val();
        passwordConfirmREG = $("#passwordR2").val();

        if (passwordREG != passwordConfirmREG) {
            notiERR("Error: Las contraseñas son distintas!");
            
        } else{

            firebase.auth().createUserWithEmailAndPassword(emailREG, passwordREG).then(
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tu cuenta ha sido creada con exito!',
                    showConfirmButton: false,
                    timer: 2000
                }),
                setTimeout(function(){ location.reload(); }, 3000)
            ).catch(alFinalizar);

            
              
        }
    });

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