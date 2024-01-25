import createConnection from "../database/connection.js";

const userAccountInfo = async (req, res) => {
  const conn = await createConnection();
  try {
    const query = `SELECT name, last, buy, sell, volume, base_unit FROM Trading_info`;

    const [result] = await conn.execute(query);

    if (!result || result.length === 0) {
      throw new Error(`No data found in the database`);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

export default { userAccountInfo };
