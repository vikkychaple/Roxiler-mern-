const { MongoClient } = require('mongodb');

async function checkConnection() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected successfully to server");
    const adminDb = client.db().admin();
    const info = await adminDb.serverInfo();
    console.log(info);
  } catch (err) {
    console.error("Connection failed", err);
  } finally {
    await client.close();
  }
}

checkConnection();
