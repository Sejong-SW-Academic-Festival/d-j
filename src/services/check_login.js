import Cookies from 'js-cookie';

const isLogin = () =>  !!Cookies.get('Authorization')
export default isLogin;