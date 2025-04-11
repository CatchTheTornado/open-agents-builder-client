/************************************************
 *  1) IMPORTS
 ************************************************/
import { z } from "zod";

/************************************************
 *  2) DTO SCHEMAS & TYPES (Zod-based)
 ************************************************/
/**
 * AgentDTO
 */
export const agentDTOSchema = z.object({
  id: z.string().optional(),
  displayName: z.string().min(1),
  options: z.string().optional().nullable(),
  prompt: z.string().optional(),
  expectedResult: z.string().optional().nullable(),
  safetyRules: z.string().optional().nullable(),
  published: z.string().optional().nullable(),
  events: z.string().optional().nullable(),
  tools: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  locale: z.string().optional().nullable(),
  agentType: z.string().optional().nullable(),
  createdAt: z.string().optional(),  // Or default, depends on server
  updatedAt: z.string().optional(),
  inputs: z.string().optional().nullable(),
  defaultFlow: z.string().optional().nullable(),
  flows: z.string().optional().nullable(),
  agents: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  extra: z.string().optional().nullable()
});
export type AgentDTO = z.infer<typeof agentDTOSchema>;

/**
 * KeyDTO
 */
export const keyDTOSchema = z.object({
  displayName: z.string().min(1),
  keyLocatorHash: z.string().min(64).max(64),
  keyHash: z.string().min(32),
  keyHashParams: z.string().min(1),
  databaseIdHash: z.string().min(64).max(64),
  encryptedMasterKey: z.string().min(1),
  acl: z.string().nullable().optional(),
  extra: z.string().nullable().optional(),
  expiryDate: z.string().nullable().optional(),
  updatedAt: z.string().optional()
});
export type KeyDTO = z.infer<typeof keyDTOSchema>;

/**
 * AttachmentDTO
 */
export const attachmentDTOSchema = z.object({
  id: z.number().positive().optional(),
  displayName: z.string().optional().nullable(),
  safeNameIdentifier: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  mimeType: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  json: z.string().optional().nullable(),
  extra: z.string().optional().nullable(),
  size: z.number().positive().int().nullable(),
  storageKey: z.string().min(1),
  filePath: z.string().optional(),
  content: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  assignedTo: z.string().optional().nullable()
});
export type AttachmentDTO = z.infer<typeof attachmentDTOSchema>;

/**
 * SessionDTO
 */
export const sessionDTOSchema = z.object({
  id: z.string().min(1),
  agentId: z.string().min(1),
  userName: z.string().optional().nullable(),
  userEmail: z.string().optional().nullable(),
  acceptTerms: z.string().optional().nullable(),
  messages: z.string().optional().nullable(),
  promptTokens: z.number().optional().nullable(),
  completionTokens: z.number().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  finalizedAt: z.string().optional().nullable(),
});
export type SessionDTO = z.infer<typeof sessionDTOSchema>;

/**
 * ResultDTO
 */
export const resultDTOSchema = z.object({
  agentId: z.string().min(1),
  sessionId: z.string().min(1),
  userName: z.string().optional().nullable(),
  userEmail: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  format: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  finalizedAt: z.string().optional().nullable(),
});
export type ResultDTO = z.infer<typeof resultDTOSchema>;

/**
 * CalendarEventDTO
 */
export const calendarEventDTOSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  agentId: z.string().min(1),
  description: z.string().optional().nullable(),
  exclusive: z.string().optional().nullable(),
  start: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  end: z.string().optional().nullable(),
  allDay: z.boolean().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  participants: z.string().optional().nullable(),
  updatedAt: z.string().optional()
});
export type CalendarEventDTO = z.infer<typeof calendarEventDTOSchema>;

/**
 * ProductDTO
 */
export const priceSchema = z.object({
  value: z.number().min(0),
  currency: z.string()
});
export const productAttributeSchema = z.object({
  name: z.string(),
  type: z.enum(["text","select"]).default("text"),
  values: z.array(z.string()).optional(),
  defaultValue: z.string().optional()
});
export const productVariantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(1),
  name: z.string().optional(),
  status: z.string().optional(),
  price: priceSchema.optional(),
  priceInclTax: priceSchema.optional(),
  taxRate: z.number().min(0).max(1).optional(),
  taxValue: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  length: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  widthUnit: z.string().optional(),
  heightUnit: z.string().optional(),
  lengthUnit: z.string().optional(),
  weightUnit: z.string().optional(),
  brand: z.string().optional()
});
export const productImageSchema = z.object({
  storageKey: z.string().optional(),
  url: z.string().url(),
  alt: z.string().optional(),
  id: z.string().optional(),
  fileName: z.string().optional(),
  mimeType: z.string().optional()
});
export const productDTOSchema = z.object({
  id: z.string().optional(),
  agentId: z.string().optional().nullable(),
  sku: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  price: priceSchema.optional(),
  priceInclTax: priceSchema.optional(),
  taxRate: z.number().min(0).max(1).optional(),
  taxValue: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  length: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  widthUnit: z.string().optional(),
  heightUnit: z.string().optional(),
  lengthUnit: z.string().optional(),
  weightUnit: z.string().optional(),
  brand: z.string().optional(),
  status: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
  attributes: z.array(productAttributeSchema).optional(),
  variants: z.array(productVariantSchema).optional(),
  images: z.array(productImageSchema).optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});
export type ProductDTO = z.infer<typeof productDTOSchema>;

/**
 * OrderDTO
 */
const addressSchema = z.object({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country: z.any().optional(),
  countryCode: z.string().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  provinceCode: z.string().optional(),
  street: z.string().optional(),
  summary: z.string().optional(),
  postalCode: z.string().optional(),
});
const noteSchema = z.object({
  date: z.string(),
  message: z.string(),
  author: z.string().optional()
});
const statusChangeSchema = z.object({
  date: z.string(),
  message: z.string(),
  oldStatus: z.string().optional(),
  newStatus: z.string()
});
const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional()
});
const orderItemSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  productSku: z.string().optional(),
  variantSku: z.string().optional(),
  productId: z.string().optional(),
  variantId: z.string().optional(),
  variantName: z.string().optional(),
  message: z.string().optional(),
  customOptions: z.array(z.object({ name: z.string(), value: z.string() })).optional(),
  originalPrice: priceSchema.optional(),
  price: priceSchema,
  priceInclTax: priceSchema.optional(),
  taxValue: priceSchema.optional(),
  quantity: z.number().min(1),
  successfully_fulfilled_quantity: z.number().min(0).optional(),
  title: z.string().optional(),
  lineValue: priceSchema.optional(),
  lineValueInclTax: priceSchema.optional(),
  lineTaxValue: priceSchema.optional(),
  originalPriceInclTax: priceSchema.optional(),
  taxRate: z.number().min(0).max(1).optional(),
  variant: z.any().optional()
});
export const orderDTOSchema = z.object({
  id: z.string().optional(),
  agentId: z.string().optional(),
  sessionId: z.string().optional(),
  billingAddress: addressSchema.optional(),
  shippingAddress: addressSchema.optional(),
  attributes: z.record(z.any()).optional(),
  notes: z.array(noteSchema).optional(),
  statusChanges: z.array(statusChangeSchema).optional(),
  status: z.enum([
    "shopping_cart",
    "quote",
    "new",
    "processing",
    "shipped",
    "completed",
    "cancelled"
  ]).default("shopping_cart"),
  email: z.string().email().optional(),
  customer: customerSchema.optional(),
  subtotal: priceSchema.optional(),
  subTotalInclTax: priceSchema.optional(),
  subtotalTaxValue: priceSchema.optional(),
  total: priceSchema.optional(),
  totalInclTax: priceSchema.optional(),
  shippingMethod: z.string().optional(),
  shippingPrice: priceSchema.optional(),
  shippingPriceInclTax: priceSchema.optional(),
  shippingPriceTaxRate: z.number().optional(),
  items: z.array(orderItemSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});
export type OrderDTO = z.infer<typeof orderDTOSchema>;

/**
 * AuditDTO
 */
export const auditDTOSchema = z.object({
  id: z.number().positive().int().optional(),
  ip: z.string().optional(),
  ua: z.string().optional(),
  keyLocatorHash: z.string().optional(),
  databaseIdHash: z.string().optional(),
  recordLocator: z.string().optional(),
  diff: z.string().optional(),
  eventName: z.string().optional(),
  createdAt: z.string().optional()
});
export type AuditDTO = z.infer<typeof auditDTOSchema>;

/**
 * StatDTO + AggregatedStatsDTO
 */
export const statsSchema = z.object({
  id: z.number().positive().int().optional(),
  eventName: z.string().min(1),
  promptTokens: z.number().positive().int(),
  completionTokens: z.number().positive().int(),
  finishReasons: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  createdMonth: z.number().positive().int().nullable().optional(),
  createdDay: z.number().positive().int().nullable().optional(),
  createdYear: z.number().positive().int().nullable().optional(),
  createdHour: z.number().positive().int().nullable().optional(),
  counter: z.number().positive().int().optional()
});
export type StatDTO = z.infer<typeof statsSchema>;

export interface AggregatedStatsDTO {
  thisMonth: {
    overallTokens: number;
    promptTokens: number;
    completionTokens: number;
    overalUSD: number;
    requests: number;
  };
  lastMonth: {
    overallTokens: number;
    promptTokens: number;
    completionTokens: number;
    overalUSD: number;
    requests: number;
  };
  today: {
    overallTokens: number;
    promptTokens: number;
    completionTokens: number;
    overalUSD: number;
    requests: number;
  };
}

/************************************************
 *  3) CONFIG INTERFACE for the client
 ************************************************/
export interface OpenAgentsConfig {
  baseUrl?: string;         
  databaseIdHash: string;  
  apiKey: string;          
}

/************************************************
 *  4) A SHARED BASE CLASS
 ************************************************/
export class BaseClient {
  protected baseUrl: string;
  protected databaseIdHash: string;
  protected apiKey: string;

  constructor(config: OpenAgentsConfig) {
    this.baseUrl = config.baseUrl || "https://app.openagentsbuilder.com";
    this.databaseIdHash = config.databaseIdHash;
    this.apiKey = config.apiKey;
  }

  protected async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    queryParams?: Record<string, string|number>
  ): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;
    if (queryParams) {
      const qs = new URLSearchParams();
      for (const [k,v] of Object.entries(queryParams)) {
        qs.append(k, String(v));
      }
      url += `?${qs.toString()}`;
    }

    const headers: Record<string,string> = {
      "Authorization": `Bearer ${this.apiKey}`,
      "database-id-hash": this.databaseIdHash
    };
    const options: RequestInit = { method, headers };

    if (body && method !== "GET") {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    const resp = await fetch(url, options);
    let result: any = {};
    try {
      result = await resp.json();
    } catch {/* No JSON */ }

    if (!resp.ok) {
      throw new Error(`Error (${resp.status}): ${result.message || resp.statusText}`);
    }
    return result as T;
  }
}

/************************************************
 * 5) AGENT API
 ************************************************/
export class AgentApi extends BaseClient {
  public async listAgents(params?: Record<string, string|number>): Promise<AgentDTO[]> {
    return this.request<AgentDTO[]>("/api/agent", "GET", null, params);
  }

  public async upsertAgent(agentData: Partial<AgentDTO>): Promise<any> {
    return this.request<any>("/api/agent", "PUT", agentData);
  }

  public async deleteAgent(agentId: string): Promise<any> {
    return this.request<any>(`/api/agent/${agentId}`, "DELETE");
  }
}

/************************************************
 * 6) KEYS API
 ************************************************/
export class KeysApi extends BaseClient {
  public async listKeys(params?: Record<string, string>): Promise<KeyDTO[]> {
    return this.request<KeyDTO[]>("/api/keys", "GET", null, params);
  }

  // For how keys are created, see:
  //  https://github.com/CatchTheTornado/open-agents-builder/blob/a5b5582d1bcb5de04baa53e26ef58086f4c5d436/src/contexts/key-context.tsx#L91
  public async upsertKey(keyData: Partial<KeyDTO>): Promise<any> {
    return this.request<any>("/api/keys", "PUT", keyData);
  }

  public async deleteKey(keyLocatorHash: string): Promise<any> {
    return this.request<any>(`/api/keys/${keyLocatorHash}`, "DELETE");
  }
}

/************************************************
 * 7) ATTACHMENTS API
 ************************************************/
export class AttachmentApi extends BaseClient {
  public async listAttachments(): Promise<AttachmentDTO[]> {
    return this.request<AttachmentDTO[]>("/api/attachment", "GET");
  }

  public async queryAttachments(params: Record<string, string|number>): Promise<any> {
    return this.request<any>("/api/attachment/query", "GET", null, params);
  }

  public async upsertAttachment(attachmentData: Partial<AttachmentDTO>): Promise<any> {
    return this.request<any>("/api/attachment", "PUT", attachmentData);
  }

  public async deleteAttachment(storageKey: string): Promise<any> {
    return this.request<any>(`/api/attachment/${storageKey}`, "DELETE");
  }

  public async exportAttachments(): Promise<Blob> {
    const url = `${this.baseUrl}/api/attachment/export`;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "database-id-hash": this.databaseIdHash
      }
    });
    if (!resp.ok) {
      const result = await resp.json().catch(()=>{});
      throw new Error(`Error exporting attachments: ${result?.message || resp.statusText}`);
    }
    return resp.blob();
  }
}

/************************************************
 * 8) STATS API
 ************************************************/
export class StatsApi extends BaseClient {
  public async putStats(statsData: Partial<StatDTO>): Promise<any> {
    return this.request<any>("/api/stats", "PUT", statsData);
  }

  public async getAggregatedStats(): Promise<{
    message: string;
    data: AggregatedStatsDTO;
    status: number;
  }> {
    return this.request<{
      message: string;
      data: AggregatedStatsDTO;
      status: number;
    }>("/api/stats/aggregated", "GET");
  }
}

/************************************************
 * 9) AUDIT API
 ************************************************/
export class AuditApi extends BaseClient {
  public async listAudit(params?: Record<string,string|number>): Promise<AuditDTO[]> {
    return this.request<AuditDTO[]>("/api/audit", "GET", null, params);
  }

  public async createAuditLog(auditLog: Partial<AuditDTO>): Promise<any> {
    return this.request<any>("/api/audit", "PUT", auditLog);
  }
}

/************************************************
 * 10) RESULT API
 ************************************************/
export class ResultApi extends BaseClient {
  public async listResults(params?: Record<string,string|number>): Promise<ResultDTO[]> {
    return this.request<ResultDTO[]>("/api/result", "GET", null, params);
  }

  public async deleteResult(sessionId: string): Promise<any> {
    return this.request<any>(`/api/result/${sessionId}`, "DELETE");
  }
}

/************************************************
 * 11) SESSION API
 ************************************************/
export class SessionApi extends BaseClient {
  public async listSessions(params?: Record<string,string|number>): Promise<SessionDTO[]> {
    return this.request<SessionDTO[]>("/api/session", "GET", null, params);
  }

  public async deleteSession(sessionId: string): Promise<any> {
    return this.request<any>(`/api/session/${sessionId}`, "DELETE");
  }
}

/************************************************
 * 12) CALENDAR API
 ************************************************/
export class CalendarApi extends BaseClient {
  public async listEvents(params?: Record<string,string|number>): Promise<CalendarEventDTO[]> {
    return this.request<CalendarEventDTO[]>("/api/calendar", "GET", null, params);
  }

  public async upsertEvent(eventData: Partial<CalendarEventDTO>): Promise<any> {
    return this.request<any>("/api/calendar", "PUT", eventData);
  }

  public async deleteEvent(eventId: string): Promise<any> {
    return this.request<any>(`/api/calendar/${eventId}`, "DELETE");
  }
}

/************************************************
 * 13) PRODUCT API
 ************************************************/
export class ProductApi extends BaseClient {
  public async listProducts(params?: Record<string,string|number>): Promise<ProductDTO[]> {
    return this.request<ProductDTO[]>("/api/product", "GET", null, params);
  }

  public async upsertProduct(productData: Partial<ProductDTO>): Promise<any> {
    return this.request<any>("/api/product", "PUT", productData);
  }

  public async deleteProduct(productId: string): Promise<any> {
    return this.request<any>(`/api/product/${productId}`, "DELETE");
  }
}

/************************************************
 * 14) ORDER API
 ************************************************/
export class OrderApi extends BaseClient {
  public async listOrders(params?: Record<string,string|number>): Promise<any> {
    return this.request<any>("/api/order", "GET", null, params);
  }

  public async upsertOrder(orderData: Partial<OrderDTO>): Promise<any> {
    return this.request<any>("/api/order", "PUT", orderData);
  }

  public async deleteOrder(orderId: string): Promise<any> {
    return this.request<any>(`/api/order/${orderId}`, "DELETE");
  }
}

/************************************************
 * 15) MEMORY API TYPES
 ************************************************/
export const vectorStoreEntrySchema = z.object({
  id: z.string(),
  content: z.string(),
  embedding: z.array(z.number()),
  metadata: z.record(z.unknown()),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type VectorStoreEntry = z.infer<typeof vectorStoreEntrySchema>;

export interface VectorStoreMetadata {
  file: string;
  displayName: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
  lastAccessed?: string;
}

export interface PaginatedVectorStores {
  files: VectorStoreMetadata[];
  limit: number;
  offset: number;
  hasMore: boolean;
  total: number;
}

export interface PaginatedRecords {
  rows: Array<VectorStoreEntry & { similarity?: number }>;
  total: number;
  vectorSearchQuery?: string;
}

/************************************************
 * 16) MEMORY API
 ************************************************/
export class MemoryApi extends BaseClient {
  public async createStore(storeName: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/api/memory/create", "POST", { storeName });
  }

  public async listStores(params?: { limit?: number; offset?: number; query?: string }): Promise<PaginatedVectorStores> {
    return this.request<PaginatedVectorStores>("/api/memory/query", "GET", null, params);
  }

  public async getStore(filename: string): Promise<VectorStoreEntry[]> {
    return this.request<VectorStoreEntry[]>(`/api/memory/${filename}`, "GET");
  }

  public async deleteStore(filename: string): Promise<{ message: string; status: number }> {
    return this.request<{ message: string; status: number }>(`/api/memory/${filename}`, "DELETE");
  }

  public async listRecords(
    filename: string,
    params?: { limit?: number; offset?: number; embeddingSearch?: string; topK?: number }
  ): Promise<PaginatedRecords> {
    return this.request<PaginatedRecords>(`/api/memory/${filename}/records`, "GET", null, params);
  }

  public async createRecord(filename: string, record: VectorStoreEntry): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/memory/${filename}/records`, "POST", record);
  }

  public async deleteRecord(filename: string, recordId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/memory/${filename}/records/${recordId}`, "DELETE");
  }

  public async generateEmbeddings(content: string): Promise<{ embedding: number[] }> {
    return this.request<{ embedding: number[] }>("/api/memory/embeddings", "POST", { content });
  }
}

/************************************************
 * 17) MASTER CLIENT
 ************************************************/
export class OpenAgentsBuilderClient {
  public agent: AgentApi;
  public keys: KeysApi;
  public attachment: AttachmentApi;
  public stats: StatsApi;
  public audit: AuditApi;
  public result: ResultApi;
  public session: SessionApi;
  public calendar: CalendarApi;
  public product: ProductApi;
  public order: OrderApi;
  public memory: MemoryApi;

  constructor(config: OpenAgentsConfig) {
    this.agent = new AgentApi(config);
    this.keys = new KeysApi(config);
    this.attachment = new AttachmentApi(config);
    this.stats = new StatsApi(config);
    this.audit = new AuditApi(config);
    this.result = new ResultApi(config);
    this.session = new SessionApi(config);
    this.calendar = new CalendarApi(config);
    this.product = new ProductApi(config);
    this.order = new OrderApi(config);
    this.memory = new MemoryApi(config);
  }
}

/************************************************
 * END OF FILE
 ************************************************/

