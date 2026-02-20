import { Express } from "express";
import express from "express";



export function initHttp(app: Express) {
    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({message: "System is up"});
    });
    app.post("/register", (req, res) => {
        const {name, email, password} = req.body;
        console.log(name, email, password);
        res.json({message: "User registered successfully"});
    })
}