import { connect } from "./backend/src/services/mongodb.service.js";

async function clearDB() {
  const uri = "mongodb+srv://devteam_db_user:cSvIHgoaFX48RuO4@sage.81ahy6f.mongodb.net/?appName=sage";
  console.log("Connecting...");
  const client = await connect(uri);
  const db = client.db("webbuilder");
  const col = db.collection("contact_submissions");
  
  const result = await col.deleteMany({});
  console.log(`Deleted ${result.deletedCount} test documents.`);
  process.exit(0);
}

clearDB().catch(console.error);
