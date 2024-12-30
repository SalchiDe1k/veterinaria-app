import { Http } from "@/infrastructure/http/http";

export const baseUrlBackend = 'http://localhost:5000/api';
export const baseClientNext = '/api/';

export const httpClientNext = new Http();
export const httpBackendApi = new Http();