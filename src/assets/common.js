export const CommonUtility = {
    urlTrim: (str) => {
        return str.toLowerCase().split(/(\/[0-9])/)[0];
    },
    config: {
        api: {
            BASE_URL: "http://localhost:3000"
        }
    }
}