import { MascotaRequest, MascotaResponse } from "@/domain/interfaces";
import { Response } from "@/domain/interfaces/api/Response";
import { Paginacion } from "@/domain/interfaces/api/response/paginacion/paginacion";
import { GET_PET_BY_PROPIETARIO_ID, POST_CREATE_MASCOTA } from "@/infrastructure/helpers/connections/api/pet.connection";
import { baseUrlBackend, httpBackendApi } from "@/infrastructure/helpers/connections/config";

export const mascotaRepository = {
  async create(data: MascotaRequest) {
    try {

      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.post<Response<MascotaResponse>>(
        POST_CREATE_MASCOTA,
        data
      );
      return response;
    } catch (error: unknown) {
      throw error; // Re-throw the error for further handling if needed
    }
  },

  async getByPropietariId(propietarioId: string) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.get<Response<MascotaResponse[]>>(GET_PET_BY_PROPIETARIO_ID + propietarioId);
      return response;
    } catch (error) {
      throw error; // Re-throw the error for further handling if needed
    }
  },

  async getMascotas(url?: string) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.get<Response<Paginacion<MascotaResponse>>>(url ?? baseUrlBackend +'/pet');
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error for further handling if needed
    }
  }
};
