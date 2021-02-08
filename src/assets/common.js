export const CommonUtility = {
    
    urlTrim: (str) => {
        return str.toLowerCase().split(/(\/[0-9])/)[0];
    },
    
    config: {
        api: { // Localhost NEEDS to be HTTP not HTTPs or you'll get issues.
            BASE_URL: "http://localhost:3000"
            // "https://test-designer-backend.herokuapp.com"
            // "localhost:3000"
        }
    }

}