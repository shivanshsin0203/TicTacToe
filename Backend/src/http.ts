import { Express } from "express";
import express from "express";
import { AuthService } from "./services/authService";
import gameManager from "./services/gameManager";


const user=new AuthService();
export function initHttp(app: Express) {
    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({message: "System is up"});
    });
    app.post("/register", async(req, res) => {
        const {name, email, password} = req.body;
        const response=await user.register({email,password,name})
        res.json(response)
    })
    app.post("/login", async(req, res) => {
        const {email, password} = req.body;
        const response=await user.login({email,password})
        res.json(response)
    })
    app.get("/rooms", (req, res) => {
        const rooms=gameManager.getAllRooms();
        res.json(rooms)
    })
}