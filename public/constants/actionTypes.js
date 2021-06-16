 // export const API_ROOT = 'http://localhost:8080';
  export const API_ROOT = 'https://sankirtan.dikonia.in'
  export const numberWithCommas = (x) => {
    if(x !== undefined)
    {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else {
      return null
    }
};


