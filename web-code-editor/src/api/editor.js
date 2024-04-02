import axios from 'axios';

const PREFIX_URL = '/api';

/**
 * C/CPP 코드 컴파일 요청을 보낸다.
 * post : code(string), input(string)
 */
export function postCppCompile(post) {
	return axios.post(`${PREFIX_URL}/cpp`, post);
}

/**
 * Java 코드 컴파일 요청을 보낸다.
 * post : code(string), input(string)
 */
export function postJavaCompile(post) {
	return axios.post(`${PREFIX_URL}/java`, post);
}

/**
 * Python 코드 컴파일 요청을 보낸다.
 * post : code(string), input(string)
 */
export function postPythonCompile(post) {
	return axios.post(`${PREFIX_URL}/python`, post);
}

