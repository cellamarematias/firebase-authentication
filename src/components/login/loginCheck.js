//busco todos los links que quiero ocultar de la navbar
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

export const loginCheck = user => {
    console.log('ejecutando el check')
    if (user) {
        loggedOutLinks.forEach(link => link.style.display = 'none')
        loggedInLinks.forEach(link => link.style.display = 'flex')
    } else {
        loggedOutLinks.forEach(link => link.style.display = 'flex')
        loggedInLinks.forEach(link => link.style.display = 'none')
    }
}