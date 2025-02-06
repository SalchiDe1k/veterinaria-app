module.exports = {
  async up(db, client) {
    // Crear la colección "citas" con validación
    await db.createCollection("citas", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["start", "end", "title", "mascotaId", "propietarioId"],
          properties: {
            start: {
              bsonType: "date",
              description: "El campo 'start' es obligatorio y debe ser una fecha."
            },
            end: {
              bsonType: "date",
              description: "El campo 'end' es obligatorio y debe ser una fecha."
            },
            title: {
              bsonType: "string",
              description: "El campo 'title' es obligatorio y debe ser una cadena."
            },
            motivo: {
              bsonType: "string",
              description: "El campo 'motivo' es obligatorio y debe ser una cadena."
            },
            mascotaId: {
              bsonType: "objectId",
              description: "El campo 'mascotaID' es obligatorio y debe ser un ObjectId."
            },
            propietarioId: {
              bsonType: "objectId",
              description: "El campo 'propietarioID' es obligatorio y debe ser un ObjectId."
            },
            createdAt: {
              bsonType: "date",
              description: "Fecha de creación generada automáticamente."
            },
            updatedAt: {
              bsonType: "date",
              description: "Fecha de última actualización generada automáticamente."
            }
          }
        }
      }
    });

    console.log("Colección 'citas' creada correctamente.");
  },

  async down(db, client) {
    // Eliminar la colección "citas"
    await db.collection("citas").drop();

    console.log("Colección 'citas' eliminada correctamente.");
  }
};
