## Introduction

Welcome to the Product Management API project! This repository demonstrates the seamless integration of open-source Node.js frameworks with the powerful SAP technology stack.

Learn how to:
1. Develop and build Node.js applications in the SAP Business Application Studio.
2. Effortlessly integrate your application with cloud services available on SAP BTP.
3. Secure your APIs using XSUAA, SAP's advanced authentication and trust management service.
4. Efficiently use application router and destination service on BTP.

This project is your gateway to mastering the creation of secure, scalable, and enterprise-grade API solutions in the SAP ecosystem.

Whether you're an open-source enthusiast or a seasoned SAP developer, this project will inspire you to start your journey enterprise-grade solutions with flair.

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
    - To install @sap/xssec lib
    ```
    npm install @sap/xssec --save
    ```
    - Similarly install @sap/xsenv and passport

8. Create app router by adding folder named - **approuter**

9. You can manually install all the libraries as listed in package.json OR create package.json and copy the contents from **productmgmtapp/package.json**

10. Create **xs-app.json**. This file contains the routes. Refer the link - https://help.sap.com/docs/btp/sap-business-technology-platform/routing-configuration-file to understand app router configuration in detail.


11. Create mta.yaml file at the root of the project. What is mta.yaml. Best resources are given below
    - https://www.sap.com/documents/2016/06/e2f618e4-757c-0010-82c7-eda71af511fa.html
    - https://sap.github.io/cloud-mta-build-tool/

12. Copy the contents from mta.yaml file to yours. To help you understand the mta.yaml file, I have added comments. Just go through it. This will surely help you understand MTA structure quickly.

13. Along with mta.yaml, I have also tried to use mta extensions as this will be required in actual scenarios where you have to deploy in multiple environments and transport your code from **dev - to - stage - to prod**.
You can add properties and parameters using mta extensions. In this project I have tried to use **region** parameters and then use it in mta.yaml

**NOTE: I have done lot of steps, manually to understand the configurations.**

## Starting Server Locally

1. Ensure you add vcap services in your local environment variables using below command. I have not checked in the vcap.json as it contains credentials.
```
export VCAP_SERVICES=$(cat path/to/vcap.json)
```

2. Ensure to add NODE_ENV variable in your local environment. This is a workaround to skip authentication in the local environment.
```
export NODE_ENV=local
```

3. Start the application locally. Go to the productmgmtapp folder and run following command.
```
npm start
```

## Project Deployment To BTP Cloud Foundry

1. Build the application using mta build tool.
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

1. Go to the product-management-xsuaa service instance and create a service key. This will contain the credentials which you will use in the below steps.

2. Import the collection which I have provided in the resources folder. 

3. Get your own base urls and client id and client secret. I have externalized the urls and credentials as it is not safe to check it in the repo.

4. Get the access token.

5. Execute the request to the app router and/or to direct api. IMPORTANT:
    - When calling the API through app router, ensure you put the bearer token in "x-approuter-authorization" header.
    - When calling the API directly, ensure you put the bearer token in the "Authorization" header.

## Testing application through browser

1. I have enabled both authorization_code and client_credentials authentication strategy as part of this project. This API can be accessed thourgh browser thourgh user authentication and through postman using client authentication.

2. This way the API can be integrated to a UI and can be called from backend system. Both ways it is secured access.

## GREAT - You have successfully created a secured Node.js application completely developed and deployed leveraging SAP BTP cloud services!

## References:
- https://help.sap.com/docs/btp/sap-business-technology-platform/routing-configuration-file
- https://developers.sap.com/tutorials/cp-cf-security-xsuaa-create.html#a3c31c15-a6c9-40d6-a56b-52c316aa0f13
- https://www.sap.com/documents/2016/06/e2f618e4-757c-0010-82c7-eda71af511fa.html
- https://sap.github.io/cloud-mta-build-tool/
