import axios from "axios"
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate()

export async function fetchDataFromAPI(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
}

const getDataFromApi = async(url, params, query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storedToken = localStorage.getItem('jwtToken');
            console.log(storedToken, 'stored token')
            if (!storedToken) {
                // If token is missing, log out the user
                navigate('/');
                return;
            }
            const authHeaders = {
                Authorization: `Bearer ${storedToken}`
            };
            const res = await axios.get(url + params, { headers:authHeaders })
            resolve(res)
        } catch (error) {
            console.log('error fetching api: ', url)
            console.log('error: ', error)
            reject(error.data)
        }
    })
}


exports.default ={
    getDataFromApi
}