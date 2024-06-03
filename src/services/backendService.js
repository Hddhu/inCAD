import axios from 'axios';

export function fetchData() {
  return axios.get('http://backend-url/api/resource');
}
