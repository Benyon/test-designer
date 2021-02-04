export const API = {

    library: { 
        "tests" : [
            {
                "id": 1231,
                "title": "Buy new item as customer"
            },
            {
                "id": 2,
                "title": "full payment"
            },            
            {
                "id": 3,
                "title": "checkout by paypal"
            }

        ]
    },

    account : {
        preferences: {
            "api-key": {
                type: "text",
                settingName: "API-Key",
                current: "87b6a43b07tavby0y8p9fdshlahn8970fs78y213"
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