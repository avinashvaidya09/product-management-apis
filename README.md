## Introduction

This project showcases how to create REST apis using Node.js and authenticate using XSUAA service. All on BTP.

## Initial Set Up

1. If you are creating from scratch.
    - Create a dev space in Business Application Studio (BAS)
    - Create a multi target applicaton using basic MTA template (Give project name)
    - This will generate 2 files - .gitignore, mta.yaml.

2. Or you can clone this REPO.

## Project Set Up [if you are doing from scratch]

1. Create application folder - productmgmtapp

2. Create src folder inside application folder.

3. Add products.json - which holds the sample products data.

4. Add repository.js - which holds methods to access products data from the json.

5. Now you need to add package.json to your project.

6. Start with the command. When you run this command, you will be asked questions to create a skeleton of package.json.
```
npm init
```
7. Once step 6 is done, run the following commands

    - To install express lib
    ```
    npm install express --save 
    ```
    - To install request lib
    ```
    npm install request --save-dev
    ```
    - Similarly install @sap/xssec, @sap/xsenv and passport

## Starting Server Locally

1. Ensure you add vcap services in your local environment variables using below command.
```
export VCAP_SERVICES=$(cat path/to/vcap.json)
```

2. Ensure to add NODE_ENV variable in your local environment
```
export NODE_ENV=local
```

3. Start the application locally. Go to the productmgmtapp folder and run following command.
```
npm start
```

## Project Deployment To BTP Cloud Foundry

1. Build the application
```
mbt build
```

2. Deploy the application on BTP cloud foundry environment. Use mta_extensions to make the mta.yaml file 
region agnostic.If your subaccount is in eu region, create another mta extension.
```
cf deploy <mtar> -e ./mta_extensions/<ext>

EXAMPLE:

cf deploy mta_archives/product-management-apis_1.0.0.mtar -e mta_extensions/us10_development.mtaext
```

## XSUAA Role Collection

1. When you deploy the application in your cloud foundary environment using the mta.yaml and xs-security.json, it will automatically create the role collection mentioned in the xs-security.json.

2. Go to BTP Cockpit - Security - Role Collection.

3. Find out the role collection which you have mentioned in the xs-security.json.

4. Add your user to it.

## Destination Configuration

1. As part of deployment orchestration, mta.yaml should also create destination mentioned in the configuration.

2. This destination is important as app router will use this destination to forward the request to the
application.

3. Ensure, the destination is created as part of deployment.

## Testing API through postman or insomnia

1. Import the collection which I have provided in the resources folder. 

2. Get your own base urls and client id and client secret. I have externalized the urls and credentials as it is not safe to check it in the repo.

3. Get the token.

4. Execute the request to the app router and/or to direct api. IMPORTANT:
    - When calling the API through app router, ensure you put the bearer token in "x-approuter-authorization" header.
    - When calling the API directly, ensure you put the bearer token in the "Authorization" header.

## Testing application through browser

1. I have enabled both authorization_code and client_credentials authentication strategy as part of this project. This API can be accessed thourgh browser thourgh user authentication and through postman using client authentication.

2. This way the API can be integrated to a UI and can be called from backend system. Both ways it is secured access.

## GREAT - You have successfully created a secured secured REST API on SAP BTP using NodeJS!

## References:
- https://developers.sap.com/tutorials/cp-cf-security-xsuaa-create.html#a3c31c15-a6c9-40d6-a56b-52c316aa0f13