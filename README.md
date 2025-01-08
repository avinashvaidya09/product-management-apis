## Introduction

This project showcases how to create OData apis using Node.js.

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

4. Add repository.json - which holds methods to access products data from the json.

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

    - To install odata lib
    ```
    npm install @odata/server --save
    ```

    - To install request lib
    ```
    npm install request --save-dev
    ```

