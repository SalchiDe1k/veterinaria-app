import { CitaRequest } from "@/domain/interfaces/api/request/citas/citaRequest";
import { Response } from "@/domain/interfaces/api/Response";
import { GET_DATES, POST_CREATE_DATE, PUT_UPDATE_DATE } from "@/infrastructure/helpers/connections/api/date.connection";
import { httpBackendApi } from "@/infrastructure/helpers/connections/config";

export const citaRepository = {
  

  async create(data: CitaRequest) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");
      const response = await httpBackendApi.post<Response<unknown>>(
        POST_CREATE_DATE,
        data
      );
      return response;
    } catch (error: unknown) {
      throw error; // Re-throw the error for further handling if needed
    }
  },

  async get() {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");

      const response = await httpBackendApi.get<Response<unknown>>(GET_DATES);
      return response;
    } catch (error) {
      throw error; // Re-throw the error for further handling if needed
    }
  },

  async update(id: string, cita: { citaInicio: string, citaFin: string }) {
    try {
      httpBackendApi.setToken(localStorage.getItem("token") || "");
      const response = await httpBackendApi.put<Response<unknown>>(PUT_UPDATE_DATE +
        id, cita);
      return response;
    } catch (error) {
      throw error;
    }
  }

};
