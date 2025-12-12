/**
 * API Error 타입 정의
 */
export interface ApiErrorData {
  detail?: string;
  [key: string]: any;
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;

  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/**
 * API Client
 */
export class ApiClient {
  private prefix: string;

  constructor(prefix: string = "/api") {
    this.prefix = prefix;
  }

  /**
   * 공통 fetch 설정
   */
  private setCommonRequest(init: RequestInit = {}): RequestInit {
    const token = localStorage.getItem("_on_token");

    return {
      ...init,
      headers: {
        ...(init.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    };
  }

  /**
   * 응답 처리
   */
  private async handleResponse<T>(res: Response): Promise<T> {
    const contentType = res.headers.get("content-type");
    let data: T | null = null;

    if (contentType?.includes("application/json")) {
      data = await res.json() as T;
    } else {
      try {
        const text = await res.text();
        data = JSON.parse(text) as T;
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      const message = (data as any)?.detail || `HTTP Error ${res.status}`;
      throw new ApiError(message, res.status, data as any);
    }

    return data as T;
  }

  /**
   * GET
   */
  async GET<T>(
    endpoint: string,
    params: Record<string, any> = {},
    init: RequestInit = {}
  ): Promise<T> {
    const config = this.setCommonRequest(init);
    config.method = "GET";

    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== null && v !== undefined) query.append(k, String(v));
    });

    const url = `${this.prefix}${endpoint}${query.toString() ? `?${query.toString()}` : ""}`;

    const res = await fetch(url, config);
    return this.handleResponse<T>(res);
  }

  /**
   * POST
   */
  async POST<T>(
    endpoint: string,
    data: any = {},
    init: RequestInit = {}
  ): Promise<T> {
    const config = this.setCommonRequest(init);
    config.method = "POST";
    config.body = JSON.stringify(data);

    const url = `${this.prefix}${endpoint}`;
    const res = await fetch(url, config);

    return this.handleResponse<T>(res);
  }

  /**
   * DELETE
   */
  async DELETE<T>(
    endpoint: string,
    data: any = {},
    params: Record<string, any> = {},
    init: RequestInit = {}
  ): Promise<T> {
    const config = this.setCommonRequest(init);
    config.method = "DELETE";
    config.body = JSON.stringify(data);

    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== null && v !== undefined) query.append(k, String(v));
    });

    const url = `${this.prefix}${endpoint}${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url, config);

    return this.handleResponse<T>(res);
  }

  /**
   * PUT
   */
  async PUT<T>(
    endpoint: string,
    data: any = {},
    init: RequestInit = {}
  ): Promise<T> {
    const config = this.setCommonRequest(init);
    config.method = "PUT";
    config.body = JSON.stringify(data);

    const url = `${this.prefix}${endpoint}`;
    const res = await fetch(url, config);

    return this.handleResponse<T>(res);
  }

  /**
   * PATCH
   */
  async PATCH<T>(
    endpoint: string,
    data: any = {},
    init: RequestInit = {}
  ): Promise<T> {
    const config = this.setCommonRequest(init);
    config.method = "PATCH";
    config.body = JSON.stringify(data);

    const url = `${this.prefix}${endpoint}`;
    const res = await fetch(url, config);

    return this.handleResponse<T>(res);
  }
}
