import { propietarioRequest } from "@/domain/interfaces/api/request/propietarios/propietario";
import { Response } from "@/domain/interfaces/api/Response";
import { Paginacion } from "@/domain/interfaces/api/response/paginacion/paginacion";
import { PropietarioResponse } from "@/domain/interfaces/api/response/propietario/propietario";
import {
  GET_ALL_OWNERS,
  GET_SEARCH_OWNERS,
  POST_CREATE_OWNERS,
} from "@/infrastructure/helpers/connections/api/owner.connection";
import { httpBackendApi } from "@/infrastructure/helpers/connections/config";

export const propietarioRepository = {
  async getAll(url?: string) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.get<
        Response<Paginacion<PropietarioResponse>>
      >(url ?? GET_ALL_OWNERS);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async create(data: propietarioRequest) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.post<Response<PropietarioResponse>>(
        POST_CREATE_OWNERS,
        data
      );
      return response;
    } catch (error: unknown) {
      console.error("Error al crear el propietario:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  },
  async getById(id: string) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.get<Response<PropietarioResponse>>(
        `${GET_ALL_OWNERS}${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async update(id: string, data: propietarioRequest) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.put<Response<PropietarioResponse>>(
        `${GET_ALL_OWNERS}${id}`,
        data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async search(query?: string): Promise<Response<PropietarioResponse[]>> {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");
      const response = await httpBackendApi.get<
        Response<PropietarioResponse[]>
      >(`${GET_SEARCH_OWNERS}${query}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
