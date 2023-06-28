export const globals = {
    httpConfig: (params) =>  {
        let webappUrl = "https://script.google.com/macros/s/AKfycbxtzLPcFkzNghpC5SY8_t6DgNRovNeKlsM8OaSxUfONF2JV3A-iT2fcoLw2RNEqreMZLw/exec";
        let settings = {
            method: 'GET',
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            
        }
        let url = webappUrl + "?" + new URLSearchParams(params);
        return {url: url, settings: settings};
    }
}