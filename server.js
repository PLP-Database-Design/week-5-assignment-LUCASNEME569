const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }
    console.log("successfully connected to mysql: ", db.threadId)
})


// Question 1 Create a GET endpoint that retrieves all patients and displays their:patient_id,first_name,last_name,date_of_birth

app.get('', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth  FROM PATIENTS"
    db.query(getPatients, (err, data) => {
        if(err){
            return res.status(400).send("Failed to get Patients")}
        res.status(200).send(data)
    })})


// Question 2 Create a GET endpoint that displays all providers with their: first_name, last_name,provider_specialty

app.get('', (req, res) => {
    const getProviders = "SELECT first_name, last_name,provider_specialty FROM PROVIDERS"
    db.query(getProviders, (err, data) => {
        if(err){
            return res.status(400).send("Failed to get Providers")}
        res.status(200).send(data)
    })})

// Question 3 Create a GET endpoint that retrieves all patients by their first name

app.get('', (req, res) => {
    const getPatients = "SELECT first_name  FROM PATIENTS"
    db.query(getPatients, (err, data) => {
        if(err){
            return res.status(400).send("Failed to get Patients")}
        res.status(200).send(data)
    })})

// Question 4 Create a GET endpoint that retrieves all providers by their specialty

app.get('', (req, res) => {
    const getProviders = "SELECT provider_specialty FROM PROVIDERS"
    db.query(getProviders, (err, data) => {
        if(err){
            return res.status(400).send("Failed to get Providers")}
        res.status(200).send(data)
    })})


// listen to the server 
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})