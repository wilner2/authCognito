import "./config/moduleAlias";
import express from "express";
import dotenv from "dotenv";
import { SignUpController } from "@/presentation/controllers/signUp";
import { CreateUser } from "@/domain/useCases/createUser";
import { GwCreateUserCognito } from "@/infra/gateways/gwCreateUser";
import { Encryptation } from "@/infra/cryptography/encryptation";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const Gateway = new GwCreateUserCognito();
const crypto = new Encryptation();
const createUser = new CreateUser(Gateway, crypto);
const SignUPController = new SignUpController(createUser);

app.post("/", async (req, res) => {
  const response = await SignUPController.handle(req.body || {});
  if (response.statusCode !== 200)
    return res.status(response.statusCode).json({
      statusCode: response.statusCode,
      message: response.body.message,
    });
  res.json();
});
