import { createConnection } from "mysql2/promise";

const openConnection = async () => {
  const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWD,
    waitForConnections: true,
    queueLimit: 0,
  };
  const conn = await createConnection(config);
  return conn;
};

export default openConnection;
