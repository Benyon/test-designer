export const CommonUtility = {
    
    urlTrim: (str) => {
        return str.toLowerCase().split(/(\/[0-9])/)[0];
    },
    
    config: {
        api: { // Localhost NEEDS to be HTTP not HTTPs or you'll get issues.
            //BASE_URL: "http://192.168.1.103:3000" // Don't have / at the end.
            BASE_URL: "https://test-designer-api.herokuapp.com" // Don't have / at the end.
        }
    }

}