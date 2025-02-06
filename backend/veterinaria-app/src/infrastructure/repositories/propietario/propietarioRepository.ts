import { StatusCodes } from "http-status-codes";
import { IPropietario } from "../../../domain/models/propietario/IPropietario";
import { PropietariosModel } from "../../database/models/propietario/propietarioModel";
import { ResponseException } from "../../exceptions/responseException";
import { IPropietarioRepository } from "../../../domain/repositories/propietario/IPropietarioRepository";
import { Paginacion } from "../../../domain/models/paginacion/pagination";

export class PropietarioRepository implements IPropietarioRepository {
  async existByNumeroIdentificacion(
    numeroIdentificacion: string
  ): Promise<boolean> {
    try {
      const propietario = await PropietariosModel.findOne({
        numero_identificacion: numeroIdentificacion,
      });
      return propietario !== null; // Retorna true si encuentra, false si no.
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al verificar existencia del propietario por numero de identificacion: ${error.message}`,
      ]);
    }
  }

  async getAll(): Promise<IPropietario[]> {
    try {
      return await PropietariosModel.find();
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al obtener los propietarios: ${error.message}`,
      ]);
    }
  }
  async existById(id: string): Promise<boolean> {
    try {
      const propietario = await PropietariosModel.findById(id);
      return propietario !== null; // Retorna true si encuentra, false si no.
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al verificar existencia del propietario por ID: ${error.message}`,
      ]);
    }
  }

  async paginacion(
    page: number = 1,
    pageSize: number = 10,
    protocol: string,
    host: string,
    path: string
  ): Promise<Paginacion<IPropietario>> {
    const total = await PropietariosModel.countDocuments();
    const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;
  
    // Verificar si la página solicitada es válida
    if (total > 0 && (page < 1 || page > totalPages)) {
      throw new Error(`La página solicitada no es válida.`);
    }
  
    // Obtener datos solo si hay elementos
    const data = total > 0 
      ? await PropietariosModel.find()
          .skip((page - 1) * pageSize)
          .limit(pageSize)
      : [];
  
    const baseUrl = `${protocol}://${host}${path}`;
    const first_page_url = `${baseUrl}?page=1&pageSize=${pageSize}`;
    const last_page_url = total > 0 ? `${baseUrl}?page=${totalPages}&pageSize=${pageSize}` : null;
    const next_page_url =
      total > 0 && page < totalPages
        ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}`
        : null;
    const prev_page_url =
      total > 0 && page > 1
        ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}`
        : null;
  
    const from = total > 0 ? (page - 1) * pageSize + 1 : null;
    const to = total > 0 ? Math.min(page * pageSize, total) : null;
  
    // Generar enlaces de paginación solo si hay datos
    const links = total > 0
      ? Array.from({ length: totalPages }, (_, index) => ({
          url: `${baseUrl}?page=${index + 1}&pageSize=${pageSize}`,
          label: (index + 1).toString(),
          active: index + 1 === page,
        }))
      : [];
  
    if (total > 0) {
      links.unshift({
        url: prev_page_url,
        label: "pagination.previous",
        active: false,
      });
  
      links.push({
        url: next_page_url,
        label: "pagination.next",
        active: false,
      });
    }
  
    return {
      current_page: page,
      first_page_url: total > 0 ? first_page_url : null,
      from,
      last_page: totalPages,
      last_page_url,
      links,
      next_page_url,
      path: baseUrl,
      per_page: pageSize,
      prev_page_url,
      to,
      total,
      data,
    };
  }
  
  async create(data: Partial<IPropietario>): Promise<IPropietario> {
    try {
      const propietario = new PropietariosModel(data);
      return await propietario.save();
    } catch (error) {
      const responseException = new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al crear el propietario: ${error.message}`,
      ]);

      for (const field in error.errors) {
        responseException.addMessage(error.errors[field].message);
      }

      throw responseException;
    }
  }

  async update(id: string, data: Partial<IPropietario>): Promise<IPropietario> {
    try {
      const updatedPropietario = await PropietariosModel.findByIdAndUpdate(
        id,
        data,
        { new: true }
      );
      if (!updatedPropietario) {
        throw new ResponseException(StatusCodes.NOT_FOUND, [
          `No se encontró el propietario con ID: ${id}`,
        ]);
      }
      return updatedPropietario;
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al actualizar el propietario: ${error.message}`,
      ]);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await PropietariosModel.findByIdAndDelete(id);
      if (!result) {
        throw new ResponseException(StatusCodes.NOT_FOUND, [
          `No se encontró el propietario con ID: ${id}`,
        ]);
      }
      return true;
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al eliminar el propietario: ${error.message}`,
      ]);
    }
  }
  async getById(id: string): Promise<IPropietario> {
    try {
      const result = await PropietariosModel.findById(id);
      if (!result) {
        throw new ResponseException(StatusCodes.NOT_FOUND, [
          `No se encontró el propietario con ID: ${id}`,
        ]);
      }
      return result;
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al obtener el propietario por ID: ${error.message}`,
      ]);
    }
  }

  async search(query: string): Promise<IPropietario[]> {
    const LIMIT = 50; // Por ejemplo, 50 resultados

    try {
      if (!query) {
        const datos = await PropietariosModel.find().limit(LIMIT - 40);
        return datos;
      }

      const palabras = query.trim().split(/\s+/); // Divide el query en palabras

      const combinaciones = [];

      if (palabras.length >= 2) {
        const [primerNombre, primerApellido, ...resto] = palabras;
        const segundoNombre = resto.length >= 1 ? resto[0] : undefined;
        const segundoApellido = resto.length >= 2 ? resto[1] : undefined;
        console.log(segundoNombre, segundoApellido, palabras, palabras.length);

        combinaciones.push({
          primerNombre: { $regex: primerNombre, $options: "i" },
          primerApellido: { $regex: primerApellido, $options: "i" },
        });

        combinaciones.push({
          primerNombre: { $regex: primerNombre, $options: "i" },
          segundoNombre: { $regex: primerApellido, $options: "i" },
        });

        combinaciones.push({
          primerApellido: { $regex: primerNombre, $options: "i" },
          segundoApellido: { $regex: primerApellido, $options: "i" },
        });

        if (segundoNombre) {
          combinaciones.push({
            primerNombre: { $regex: primerNombre, $options: "i" },
            segundoNombre: { $regex: segundoNombre, $options: "i" },
            primerApellido: { $regex: primerApellido, $options: "i" },
          });
        }

        if (segundoApellido) {
          combinaciones.push({
            primerNombre: { $regex: primerNombre, $options: "i" },
            primerApellido: { $regex: primerApellido, $options: "i" },
            segundoApellido: { $regex: segundoApellido, $options: "i" },
          });
        }
      }

      // Construir consulta
      const datos = await PropietariosModel.find({
        $or: [
          { primerNombre: { $regex: query, $options: "i" } },
          { segundoNombre: { $regex: query, $options: "i" } },
          { primerApellido: { $regex: query, $options: "i" } },
          { segundoApellido: { $regex: query, $options: "i" } },
          { numero_identificacion: { $regex: query, $options: "i" } },
          { numero_telefono: { $regex: query, $options: "i" } },
          { correo: { $regex: query, $options: "i" } },
          ...combinaciones, // Añadir combinaciones de nombres completos
        ],
      }).limit(LIMIT);

      return datos;
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        "Error al buscar los propietarios.",
        `Detalles: ${error.message}`,
      ]);
    }
  }

  async existByCorreo(correo: string): Promise<boolean> {
    try {
      const propietario = await PropietariosModel.findOne({
        correo: correo,
      });
      return propietario !== null; // Retorna true si encuentra, false si no.
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al probar existencia del propietario por correo: ${error.message}`,
      ]);
    }
  }
}
