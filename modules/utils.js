export default class Utilities {
    static baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

    static showBaseUrl ='https://api.tvmaze.com/shows/'

    static exception = (message) => message

    static getHeader() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return headers;
    }

     static getParams = (id, username, comment) => {
       const urlencoded = new URLSearchParams();
       urlencoded.append('item_id', `${id}`);
       urlencoded.append('username', `${username}`);
       urlencoded.append('comment', `${comment}`);
       return urlencoded;
     }

      static cleanFormInput = () => {
        document.getElementById('name').value = '';
        document.getElementById('insights').value = '';
      }
}