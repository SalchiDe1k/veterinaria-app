import { StatusCodes as codes, StatusCodes } from "http-status-codes";
import { IMascota } from "../../../domain/models/mascota/IMascota";
import { IMascotaRepository } from "../../../domain/repositories/mascota/IMascotaRepository";
import {
  IMascotaDocument,
  MascotaModel,
} from "../../database/models/mascota/mascotaModel";
import { ResponseException } from "../../exceptions/responseException";
import { Paginacion } from "../../../domain/models/paginacion/pagination";
import mongoose from "mongoose";

/**
 * Clase que implementa operaciones CRUD para la entidad Mascota.
 * @implements IMascotaRepository
 */
export class MascotaRepository implements IMascotaRepository {
  async getAll(): Promise<IMascotaDocument[]> {
    try {
      return await MascotaModel.find();
    } catch (error) {
      throw new ResponseException(codes.BAD_REQUEST, [
        "Error al obtener las mascotas.",
      ]);
    }
  }

  async create(data: Partial<IMascota>): Promise<IMascotaDocument> {
    try {
      const mascota = new MascotaModel(data);
      const savedMascota = await mascota.save();

      // Populamos el propietario a partir de propietarioId
      const populatedMascota = await MascotaModel.findById(
        savedMascota._id
      ).populate("propietarioId");

      if (!populatedMascota) {
        throw new Error("La mascota no se encontró después de ser creada.");
      }

      return populatedMascota as IMascotaDocument;
    } catch (error) {
      const responseException = new ResponseException(codes.BAD_REQUEST, [
        "Error al crear la mascota",
        error.message,
      ]);
      responseException.addMessage(JSON.stringify(error));
      for (const field in error.errors) {
        responseException.addMessage(error.errors[field].message);
      }

      throw responseException;
    }
  }

  async update(
    id: string,
    data: Partial<IMascota>
  ): Promise<IMascotaDocument | null> {
    try {
      const updatedMascota = await MascotaModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedMascota) {
        throw new ResponseException(codes.NOT_FOUND, [
          `No se encontró la mascota con ID: ${id}`,
        ]);
      }
      return updatedMascota;
    } catch (error) {
      throw new ResponseException(codes.BAD_REQUEST, [
        "Error al actualizar la mascota.",
      ]);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await MascotaModel.findByIdAndDelete(id);
      if (!result) {
        throw new ResponseException(codes.NOT_FOUND, [
          `No se encontró la mascota con ID: ${id}`,
        ]);
      }
      return true;
    } catch (error) {
      throw new ResponseException(codes.BAD_REQUEST, [
        "Error al eliminar la mascota.",
      ]);
    }
  }

  async existById(mascotaId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(mascotaId)) {
        throw new ResponseException(StatusCodes.BAD_REQUEST, [
          `El ID proporcionado (${mascotaId}) no es válido.`,
        ]);
      }
      const result = await MascotaModel.exists({ _id: mascotaId });
      return Boolean(result); // Retorna true si existe, false si no.
    } catch (error) {
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        `Error al verificar existencia de la mascota por ID: ${error.message}`,
      ]);
    }
  }

  async propietarioEnMascota(mascotaId: string, propietarioId: string): Promise<boolean> {
    try {
      // Verificar la relación basada en el _id del modelo de mascota
      const exists = await MascotaModel.exists({ _id: mascotaId, propietarioId });
      return Boolean(exists); // Retorna true si existe, false si no.
    } catch (error) {
      throw new ResponseException(StatusCodes.INTERNAL_SERVER_ERROR, [
        `Error al verificar la relación entre la mascota y el propietario: ${error.message}`,
      ]);
    }
  }
  async searchByIdPropietario(propietarioId: string) {
    const LIMIT = 50; // Limitar el número de resultados

    try {
      // Construir consulta filtrando por propietarioId
      const datos = await MascotaModel.find({ propietarioId })
        .populate('propietarioId').limit(LIMIT);

      // Retornar los resultados encontrados
      return datos;
    } catch (error) {
      // Manejo de errores con un ResponseException
      throw new ResponseException(StatusCodes.BAD_REQUEST, [
        "Error al buscar las mascotas del propietario.",
        `Detalles: ${error.message}`,
      ]);
    }
  }
  async paginacion(
    page: number = 1,
    pageSize: number = 10,
    protocol: string,
    host: string,
    path: string
  ): Promise<Paginacion<IMascotaDocument>> {
    const total = await MascotaModel.countDocuments();
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    if (page < 1 || page > totalPages) {
      throw new Error(
        `La página solicitada (${page}) no es válida. Total de páginas disponibles: ${totalPages}.`
      );
    }

    const data = await MascotaModel.find().populate("propietarioId")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const baseUrl = `${protocol}://${host}${path}`;

    const buildUrl = (p: number) => `${baseUrl}?page=${p}&pageSize=${pageSize}`;
    const paginationLinks = this.createPaginationLinks(
      totalPages,
      page,
      baseUrl,
      pageSize
    );

    return {
      current_page: page,
      first_page_url: total > 0 ? buildUrl(1) : null,
      from: total > 0 ? (page - 1) * pageSize + 1 : null,
      last_page: totalPages,
      last_page_url: total > 0 ? buildUrl(totalPages) : null,
      links: paginationLinks,
      next_page_url: page < totalPages ? buildUrl(page + 1) : null,
      path: baseUrl,
      per_page: pageSize,
      prev_page_url: page > 1 ? buildUrl(page - 1) : null,
      to: total > 0 ? Math.min(page * pageSize, total) : null,
      total,
      data,
    };
  }

  private createPaginationLinks(
    totalPages: number,
    currentPage: number,
    baseUrl: string,
    pageSize: number
  ): Array<{ url: string | null; label: string; active: boolean }> {
    const buildUrl = (page: number) =>
      `${baseUrl}?page=${page}&pageSize=${pageSize}`;

    const links = Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      return {
        url: buildUrl(page),
        label: page.toString(),
        active: page === currentPage,
      };
    });

    return [
      {
        url: currentPage > 1 ? buildUrl(currentPage - 1) : null,
        label: "pagination.previous",
        active: false,
      },
      ...links,
      {
        url: currentPage < totalPages ? buildUrl(currentPage + 1) : null,
        label: "pagination.next",
        active: false,
      },
    ];
  }
}
