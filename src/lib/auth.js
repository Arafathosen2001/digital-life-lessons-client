import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, 
  emailAndPassword: {
    enabled: true,
    autoSignIn: false //defaults to true
  },
  user: {
    additionalFields: {
      isPremium: {
        type: "boolean", // টাইপ অবশ্যই বলে দিতে হবে
        defaultValue: false
      },
      role: {
        type: "string", // টাইপ সেট করতে হবে
        defaultValue: "user" // ডিফল্ট ভ্যালু হিসেবে "user" থাকবে
      }
    }
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }, 
  },
  database: mongodbAdapter(db, {
    client
  }),
});