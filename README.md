# User Management API

This project is a simple **Spring Boot application** that manages users in a database. It allows you to **create**, **retrieve**, **update**, and **delete** users using **RESTful APIs**. The users are stored in a MySQL database.

## Features

- **Create a User**: Add a new user to the database.
- **Retrieve All Users**: Get a list of all users.
- **Update a User**: Update an existing user's details.
- **Delete a User**: Remove a user from the database.

## Requirements

- Java 17 or later
- Spring Boot (version 2.7.x or later)
- MySQL Database (or any other relational database you prefer)

## Getting Started

### 1. Clone the Project

First, clone the repository to your local machine.

```bash
git clone https://github.com/yourusername/user-management-api.git
cd user-management-api
2. Set up MySQL Database
Ensure you have MySQL installed and running. Then, create a database named klu (or change the name in application.properties).

```sql
CREATE DATABASE klu;
```

3. Configure Database
In the application.properties file, configure the connection to your MySQL database:

```xml
spring.datasource.url=jdbc:mysql://localhost:3306/klu
spring.datasource.username=root
spring.datasource.password=admin
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
4. Run the Application
You can run the application using the following command:


The application will run on port 2020 by default.
