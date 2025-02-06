const bcrypt = require("bcryptjs");

module.exports = {
  async up(db, client) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await db.collection("users").insertOne({
      email: "admin@example.com",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Usuario administrador creado correctamente.");
  },

  async down(db, client) {
    await db.collection("users").deleteOne({ email: "admin@example.com" });

    console.log("🔄 Usuario administrador eliminado.");
  }
};
