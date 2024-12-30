import { propietarioRequest } from "@/domain/interfaces/api/request/propietarios/propietario";
import { Response } from "@/domain/interfaces/api/Response";
import { Paginacion } from "@/domain/interfaces/api/response/paginacion/paginacion";
import { PropietarioResponse } from "@/domain/interfaces/api/response/propietario/propietario";
import {
  GET_ALL_OWNERS,
  POST_CREATE_OWNERS,
} from "@/infrastructure/helpers/connections/api/owner.connection";
import { httpBackendApi } from "@/infrastructure/helpers/connections/config";

export const propietarioRepository = {
  async getAll(url?: string) {
    try {
      const response = await httpBackendApi.get<
        Response<Paginacion<PropietarioResponse>>
      >(url ?? GET_ALL_OWNERS);
      return response;
    } catch (error) {
      throw console.log(error);
    }
  },
  async create(data: propietarioRequest) {
    try {
      const response = await httpBackendApi.post<Response<PropietarioResponse>>(
        POST_CREATE_OWNERS,
        data
      );
      return response;
    } catch (error) {
      throw console.log(error);
    }
  },
};
