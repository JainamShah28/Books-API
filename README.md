
# Books API

A RESTful CRUD api made using Node.js, Express.js and MySQL. This api supports four basic HTTP request method, GET, POST, PUT and DELETE for manipulating books data. 


## Features⚡

- Get the data of all books
- Can search book by ID (search book by ID)
- Can Upload and modify the images of books
- Add data of new books and can modify it later 
- Delete existing book from the database 


## Installation ⬇️

In order to run this project, you will need current LTS version of [node.js](https://nodejs.org/en/download/) and [MySQL](https://www.mysql.com/downloads/). You may refer any online sources which help you to install required things into your local machine. You may also use [XAMPP](https://www.apachefriends.org/) to create database. 


    
## Environment Variables ⚙️

To run this project, you will need to add the following environment variables to a .env file at the root of the project :

- `HOST` : Hostname of server (localhost)

- `PORT` : The port number on which you want to start the server 

- `DB_HOST` : Your MySQL hostname (to avoid errors, set it localhost)

- `DB_USER` : Username of MySQL 

- `DB_PASSWORD` : Your MySQL password 

- `DB` : The name of database 


## Run Locally 🚀

Clone the project

```bash
  git clone https://github.com/JainamShah28/Books-API
```

Go to the project directory

```bash
  cd Books-API
```

Install dependencies

```bash
  npm install
```
Don't forget to create .env file and put required environment variables into it. 

Open MySQL workbench, create new connection, set the required details and copy the code from **tables.sql** into query tab. Then run it. 

Create a folder named **public** inside the root of project folder and make subfolder named **uploads** inside it. Now you are all set!

Start the server

```bash
  node app.js
```

Now you can test the API by sending requests using [Postman](https://www.postman.com/).


## Lessons Learned 🎓

By making this project I have learnt, how to create REST APIs using Express.js and MySQL. And also how to upload files (specifically images) using a express middleware called multer. I would like to thanks [Academind](https://academind.com/) for the wonderful REST APIs tutorial. 

