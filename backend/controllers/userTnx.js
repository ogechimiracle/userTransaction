import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transactions = JSON.parse(
  readFileSync(join(__dirname, "../data/tnx.json"), "utf-8")
);

export const getTransaction = (req, res)=>{
    res.json(transactions)
}

