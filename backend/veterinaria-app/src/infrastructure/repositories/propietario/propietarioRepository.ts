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

  async paginacion(
    page: number = 1,
    pageSize: number = 10,
    protocol: string,
    host: string,
    path: string
  ): Promise<Paginacion<IPropietario>> {
    const total = await PropietariosModel.countDocuments();
    const totalPages = Math.ceil(total / pageSize);

    if (page < 1 || page > totalPages) {
      throw new Error(`La página solicitada no es válida.`);
    }

    const data = await PropietariosModel.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const baseUrl = `${protocol}://${host}${path}`;
    const first_page_url = `${baseUrl}?page=1&pageSize=${pageSize}`;
    const last_page_url = `${baseUrl}?page=${totalPages}&pageSize=${pageSize}`;
    const next_page_url =
      page < totalPages
        ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}`
        : null;
    const prev_page_url =
      page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;

    const from = total > 0 ? (page - 1) * pageSize + 1 : null;
    const to = total > 0 ? Math.min(page * pageSize, total) : null;

    const links = Array.from({ length: totalPages }, (_, index) => ({
      url: `${baseUrl}?page=${index + 1}&pageSize=${pageSize}`,
      label: (index + 1).toString(),
      active: index + 1 === page,
    }));

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

    return {
      current_page: page,
      first_page_url,
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
}
