module.exports = {
  async up(db, client) {
    await db.createCollection("mascotas", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["nombre", "especie", "sexo", "propietarioId"],
          properties: {
            nombre: {
              bsonType: "string",
              description: "El nombre de la mascota es obligatorio",
            },
            raza: {
              bsonType: "string",
              description: "La raza de la mascota es opcional",
            },
            especie: {
              bsonType: "string",
              description: "La especie de la mascota es obligatoria",
            },
            sexo: {
              bsonType: "string",
              enum: ["Macho", "Hembra"],
              description:
                "El sexo de la mascota es obligatorio ('Macho' para macho, 'Hembra' para hembra)",
            },
            edad: {
              bsonType: "int",
              description: "La edad de la mascota es opcional",
            },
            unidadEdad: {
              bsonType: "string",
              enum: ["meses", "años"],
              description: "La unidad de la edad debe ser 'meses' o 'años'",
            },
            peso: {
              bsonType: "number",
              description: "El peso de la mascota es opcional",
            },
            unidadPeso: {
              bsonType: "string",
              enum: ["kilogramos", "gramos"],
              description: "La unidad del peso debe ser 'kilogramos' o 'gramos'",
            },
            color: {
              bsonType: "string",
              description: "El color de la mascota es opcional",
            },
            propietarioId: {
              bsonType: "objectId",
              description:
                "El ID del propietario de la mascota es obligatorio y debe ser un ObjectId",
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
    console.log("✅ Colección 'mascotas' creada exitosamente con unidadPeso.");
  },

  async down(db, client) {
    await db.dropCollection("mascotas");
    console.log("✅ Colección 'mascotas' eliminada exitosamente.");
  },
};
