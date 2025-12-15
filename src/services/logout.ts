import Cookies from 'js-cookie'

export function logout() {
    if (confirm('Deseja seguir com o logout?') === true ) {
        Cookies.remove('jwt_token')
        window.location.href = '/'
    }
}