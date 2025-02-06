/**
 * Clase para manejar solicitudes HTTP con autenticación JWT.
 */
export class Http {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private token: string | null = null; // 🔹 Variable para almacenar el token JWT

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Establece encabezados predeterminados.
   * @param headers - Los encabezados adicionales.
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Establece el token de autenticación.
   * @param token - El token JWT.
   */
  setToken(token: string | null): void {
    this.token = token;
  }

  /**
   * Método para manejar las solicitudes HTTP.
   * @param url - El endpoint de la solicitud.
   * @param options - Opciones de la solicitud.
   * @returns La respuesta en formato JSON.
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

    const mergedHeaders: Record<string, string> = { ...this.defaultHeaders, ...headers };

    // 🔹 Si hay un token, se añade al encabezado Authorization
    if (this.token) {
      mergedHeaders["Authorization"] = `Bearer ${this.token}`;
    }

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

  get<T>(url: string, options: Record<string, unknown> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  post<T>(url: string, data: unknown, options: Record<string, unknown> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "POST", body: data });
  }

  put<T>(url: string, data: unknown, options: Record<string, unknown> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "PUT", body: data });
  }

  delete<T>(url: string, options: Record<string, unknown> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}
