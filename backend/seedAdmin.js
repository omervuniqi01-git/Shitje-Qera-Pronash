require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");

const krijoAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const ekziston = await User.findOne({ email });
  if (ekziston) {
    console.log("Admini ekziston tashme:", email);
    process.exit(0);
  }

  await User.create({ email, password });
  console.log("Admini u krijua:", email);
  process.exit(0);
};

krijoAdmin();
