import axios from 'axios'

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
	
    console.log(error.msg)
    return Promise.reject(error);
});

const axiosInstance = axios.create({
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("Authorization") || ''
	},
	baseURL: 'http://43.202.250.219:8080',
});

export default axiosInstance;