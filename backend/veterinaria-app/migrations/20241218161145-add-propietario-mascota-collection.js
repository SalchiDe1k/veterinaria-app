module.exports = {
  async up(db, client) {
    await db.createCollection("propietarios", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [
            "primerNombre",
            "primerApellido",
            "correo",
            "numero_telefono",
          ],
          properties: {
            primerNombre: {
              bsonType: "string",
              description: "El primer nombre del propietario es obligatorio",
            },
            segundoNombre: {
              bsonType: "string",
              description: "El segundo nombre del propietario es opcional",
            },
            primerApellido: {
              bsonType: "string",
              description: "El primer apellido del propietario es obligatorio",
            },
            segundoApellido: {
              bsonType: "string",
              description: "El segundo apellido del propietario es opcional",
            },
            correo: {
              bsonType: "string",
              pattern: "^.+@.+\\..+$",
              description:
                "El correo electrónico debe ser válido y obligatorio",
            },
            numero_telefono: {
              bsonType: "string",
              description: "El número de teléfono es obligatorio",
            },
            createdAt: {
              bsonType: "date",
              description: "Fecha de creación",
            },
            updatedAt: {
              bsonType: "date",
              description: "Fecha de actualización",
            },
          },
        },
      },
    });
  },

  async down(db, client) {
    await db.dropCollection("propietarios");
    console.log("✅ Colección 'propietarios' eliminada exitosamente.");
  },
};
