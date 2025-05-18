import { db } from "./index";
import { users } from "./schema";

async function testConnection() {
  try {
    const result = await db.select().from(users).limit(1);
    console.log("Connection successful:", result);
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();