export const API = {
    library: {
        tests: {
            catagories: [

                // What the data looks like for one catagory
                {
                    catName: "Sign up",
                    catId: 1,
                    tests: [ 
                        {
                            id: 1,
                            name: "I sign up as a premium member."
                        },
                        {
                            id: 2,
                            name: "I sign up a standard member."
                        }
                    ]
                },
                
                // What the data looks like for one catagory (big catagory)
                {
                    catName: "Log In",
                    catId: 2,
                    tests: [ 
                        {
                            id: 3,
                            name: "I log in as a premium member."
                        },
                        {
                            id: 4,
                            name: "I log in as a standard member."
                        },
                        {
                            id: 5,
                            name: "I log in as a guest."
                        },
                        {
                            id: 6,
                            name: "I log in an admin."
                        },
                        {
                            id: 7,
                            name: "I log in a developer."
                        }
                    ]
                },


                // What an empty catagory looks like, this should not be rendered
                {
                    catName: "Purchases",
                    catId: 3,
                    tests: []
                }
            ]
        }
    },

    account: {
        preferences: {
            "api-key": {
                type: "text",
                settingName: "API-Key",
                current: "87b6a43b07ta3AEy0y8p9fd546ldffeaf8970fs78y213"
            },
            "save-options": {
                type: "checkbox",
                settingName: "Auto-Save",
                current: true
            }
        },
        personalDetails: {
            "first-name": {
                type: "text",
                settingName: "First Name",
                current: "John"
            },
            "last-name": {
                type: "text",
                settingName: "Last Name",
                current: "Doe"
            },
            "email": {
                type: "text",
                settingName: "Email Address",
                current: "john.doe@infotek.com"
            },
            "address": {
                type: "text",
                settingName: "Address",
                current: "100 Greengate, Salford, M3 7NG"
            },
            "company": {
                type: "text",
                settingName: "Company Name",
                current: "InfoTechnika Ltd"
            },
        },
        adminControls: {
            "enable-dev": {
                type: "checkbox",
                settingName: "Enable Development Mode",
                current: true
            }
        }
    }
}

export const returnAsCallback = (str, func, time = 2500) => {
    let query = str.split('.');
    let obj = API;
    query.forEach(qi => {
        if (obj[qi] !=null) {
            obj = obj[qi];
        } else {
            obj = `error finding ${qi} in ${obj}`;
        }
    });
    setTimeout(() => {
        func(obj)
    }, time);
}