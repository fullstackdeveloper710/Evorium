import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a variable to store the access token
let accessToken = null;
// Retrieve the access token from AsyncStorage
AsyncStorage.getItem('AccessToken')
  .then(token => {
    if (token) {
      // Token exists in AsyncStorage
      accessToken = token; // Assign the token value to the variable
    } else {
      // Token doesn’t exist in AsyncStorage or is null
      console.log('Access token not found.');
    }
  })
  .catch(error => {
    // Handle errors, if any
    console.error('Error retrieving access token:', error);
  });

class APIClient {
  /*--------- Methode for API calling use this methods as per your requirement just need to call this methods---------*/
  /*---Don't change this methods--*/

  async httpRequest(method, url, data, auth) {
  
    var headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth?.facebookToken}`,
    };

    try {
      if (method === 'get') {
        return await axios.get(url, {headers: headers});
      } else if (method === 'put') {
        return await axios.put(
          url,
          data,
          {headers: headers},
          {
            validateStatus: function (status) {
              return (
                status < 500
              ); /* this is resolve if status code is less than 500 */
            },
          },
        );
      } else if (method === 'patch') {
        return await axios.patch(
          url,
          data,
          {headers: headers},
          {
            validateStatus: function (status) {
              return (
                status < 500
              ); /* this is resolve if status code is less than 500 */
            },
          },
        );
      } else if (method === 'post') {
        return await axios.post(
          url,
          data,
          {headers: headers},
          {
            validateStatus: function (status) {
              return (
                status < 500
              ); /* this is resolve if status code is less than 500 */
            },
          },
        );
      } else if (method === 'delete') {
   
        return await axios.delete(url, {headers: headers}, data, {
          validateStatus: function (status) {
            return (
              status < 500
            ); /* this is resolve if status code is less than 500 */
          },
        });
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500 &&
        err.response.data
      ) {
        return err.response;
      } else {
        if (err == 'Error: Network Error') {
          console.log('Error >>>>>>>>>', err);
          return {
            data: {
              response_code: 400,
              message: 'Please check your internet connection.',
            },
          };
        }
        return err.response;
      }
    }
  }

  async multipartRequest(method, url, data, auth) {
   
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth?.facebookToken}`
    
    };

    try {
      if (method === 'post') {
        return await axios.post(
          url,
          data,
          {headers: headers},
          {
            validateStatus: function (status) {
              return (
                status < 500
              ); /* this is resolve if status code is less than 500 */
            },
          },
        );
      } else if (method === 'put') {
        return await axios.put(
          url,
          data,
          {headers: headers},
          {
            validateStatus: function (status) {
              return (
                status < 500
              ); /* this is resolve if status code is less than 500 */
            },
          },
        );
      } else if (method === 'patch') {
        return await axios.patch(
          url,
          data,
          {headers: headers},
          {
            validateStatus: function (status) {
              return status < 500;
            },
          },
        );
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500 &&
        err.response.data
      ) {
        return err.response;
      } else {
        console.log('Error >>>>>>>>>', err);
        return err.response;
        //throw err;
      }
    }
  }

  async get(url, data, auth) {
    return this.httpRequest('get', url, data, auth);
  }

  async post(url, data, auth) {
    return this.httpRequest('post', url, data, auth);
  }

  async put(url, data, auth) {
    return this.httpRequest('put', url, data, auth);
  }

  async patch(url, data, auth) {
    return this.httpRequest('patch', url, data, auth);
  }

  async delete(url, data, auth) {
    return this.httpRequest('delete', url, data, auth);
  }

  async multipart(url, data, auth) {
    return this.multipartRequest('post', url, data, auth);
  }

  async multipartpatch(url, data, auth) {
    return this.multipartRequest('patch', url, data, auth);
  }

  async multipartput(url, data, auth) {
    return this.multipartRequest('put', url, data, auth);
  }
}
const ApiClient = new APIClient();
export default ApiClient;
