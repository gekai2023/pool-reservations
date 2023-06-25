export const globals = {
    httpConfig: (params) =>  {
        let webappUrl = "https://script.google.com/macros/s/AKfycbyyjalbg6_h6L9-fT1CIknozcF5sCIuEI3PPAtw7Iq-QPHOECpTLDvYAVEBh00-t368/exec";
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