## Introduction

This project showcases how to create REST apis using Node.js and authenticate using XSUAA service. All on BTP.

## Initial Set up

1. If you are creating from scratch.
    - Create a dev space in Business Application Studio (BAS)
    - Create a multi target applicaton using basic MTA template (Give project name)
    - This will generate 2 files - .gitignore, mta.yaml.

2. Or you can clone this REPO.

## Project Set up [if you are doing from scratch]

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

8. Start the application locally
```
npm start
```

9. Build the application
```
mbt build
```

10. Deploy the application on BTP cloud foundry environment
```
cf deploy cf deploy mta_archives/product-management-apis-mta_1.0.0.mtar
```

11. Ensure you add vcap services in your local environment variables using below command
```
export VCAP_SERVICES = $(cat path/to/vcap.json)
```
12. Update the mta.yaml file with xsuaa service and destination service with the destination content

13. To deploy your application using mta_extensions. This will be helpful to make your mta.yaml region agnostic. If you are in eu region, create another mta extension.
```
cf deploy <mtar> -e ./mta_extensions/<ext>

EXAMPLE:

cf deploy mta_archives/product-management-apis_1.0.0.mtar -e mta_extensions/us10_development.mtaext
```
