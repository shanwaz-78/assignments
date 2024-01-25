import "dotenv/config";
import createConnection from "./database/connection.js";
import axios from "axios";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

const port = process.env.PORT || "8000";
const API_URL = `https://api.wazirx.com/api/v2/tickers`;

const app = express();

// both body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors
app.use(cors({ origin: "*" }));

// routes
app.use("/get-data", routes.tradingInfoRoute);

const server = http.createServer(app);
server.listen(port);

const fetchDataFromAPI = async (url) => {
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

const storeData = async () => {
  const conn = await createConnection();
  try {
    const data = await fetchDataFromAPI(API_URL);

    const top10Tickers = Object.values(data).slice(0, 10);

    for (const ticker of top10Tickers) {
      const { name, last, buy, sell, volume, base_unit } = ticker;
      const selectQuery = `SELECT * FROM Trading_info WHERE name = ?`;
      const [selectRows] = await conn.execute(selectQuery, [name]);

      if (selectRows.length === 0) {
        const insertQuery = `INSERT INTO Trading_info (name, last, buy, sell, volume, base_unit) VALUES (?, ?, ?, ?, ?, ?)`;
        const [insertRows] = await conn.execute(insertQuery, [
          name,
          last,
          buy,
          sell,
          volume,
          base_unit,
        ]);

        if (insertRows.affectedRows >= 1) {
          console.log(`Data Inserted into DB Successfully for ${name}`);
        } else {
          console.error(`Failed to insert data for ${name}`);
        }
      } else {
        console.log(`Data for ${name} already exists in the database`);
      }
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

storeData();

server.on("listening", () =>
  console.log(`Server is listening at port ${port}`)
);
server.on("error", () => console.log(`Server is not listening`));
