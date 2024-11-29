import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const PORT: number = Number(process.env?.PORT) || 50005;
app.listen(PORT, () => {
  console.log(`Server is Running at PORT:- ${PORT}`);
});
