/**
 * Clase para manejar solicitudes HTTP.
 * Proporciona métodos convenientes para realizar solicitudes GET, POST, PUT y DELETE.
 */
export class Http {
  /**
   * La URL base para las solicitudes HTTP.
   */
  private baseURL: string;

  /**
   * Encabezados predeterminados para todas las solicitudes.
   */
  private defaultHeaders: Record<string, string>;

  /**
   * Crea una nueva instancia de HttpClient.
   * @param baseURL - La URL base para todas las solicitudes.
   */
  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Establece encabezados predeterminados.
   * @param headers - Los encabezados que se agregarán a los predeterminados.
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Método para manejar las solicitudes HTTP.
   * @param url - El endpoint de la solicitud.
   * @param options - Opciones para la solicitud.
   * @returns La respuesta en formato JSON.
   * @throws Lanzará un error si la solicitud no es exitosa.
   */
  async request<T>(
    url: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: unknown;
      [key: string]: unknown;
    } = {}
  ): Promise<T> {
    const {
      method = "GET",
      headers = {},
      body = null,
      ...otherOptions
    } = options;
    const mergedHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : null,
        ...otherOptions,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  /**
   * Realiza una solicitud GET.
   * @param url - El endpoint de la solicitud.
   * @param options - Opciones adicionales para la solicitud.
   * @returns La respuesta en formato JSON.
   */
  get<T>(url: string, options: Record<string, unknown> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  /**
   * Realiza una solicitud POST.
   * @param url - El endpoint de la solicitud.
   * @param data - El cuerpo de la solicitud.
   * @param options - Opciones adicionales para la solicitud.
   * @returns La respuesta en formato JSON.
   */
  post<T>(
    url: string,
    data: unknown,
    options: Record<string, unknown> = {}
  ): Promise<T> {
    return this.request<T>(url, { ...options, method: "POST", body: data });
  }

  /**
   * Realiza una solicitud PUT.
   * @param url - El endpoint de la solicitud.
   * @param data - El cuerpo de la solicitud.
   * @param options - Opciones adicionales para la solicitud.
   * @returns La respuesta en formato JSON.
   */
  put<T>(
    url: string,
    data: unknown,
    options: Record<string, unknown> = {}
  ): Promise<T> {
    return this.request<T>(url, { ...options, method: "PUT", body: data });
  }

  /**
   * Realiza una solicitud DELETE.
   * @param url - El endpoint de la solicitud.
   * @param options - Opciones adicionales para la solicitud.
   * @returns La respuesta en formato JSON.
   */
  delete<T>(url: string, options: Record<string, unknown> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}
