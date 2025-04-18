# open-agents-builder-client

**Note**: For a complete example project using this client, see the [Open Agents Builder Example](https://github.com/CatchTheTornado/open-agents-builder-example).

A TypeScript client for the [Open Agents Builder](https://www.openagentsbuilder.com/) APIs, featuring modular classes for agents, keys, attachments, stats, audits, sessions, results, calendar, products, and orders. The library uses **Zod**-based schemas for type validation and can be easily extended to cover your application-specific needs.

## Features

- **Typed Data Transfer Objects (DTOs)** via Zod schemas
- **Modular** approach: `client.agent`, `client.keys`, `client.attachment`, etc.
- **Automatically sets** `Authorization: Bearer <API_KEY>` and `database-id-hash` headers
- Supports **multiple endpoints**:  
  - Agents (`/api/agent`)  
  - Keys (`/api/keys`)  
  - Attachments (`/api/attachment`)  
  - Stats & Audit logs (`/api/stats`, `/api/audit`)  
  - Results & Sessions (`/api/result`, `/api/session`)  
  - Calendar Events (`/api/calendar`)  
  - Products & Orders (`/api/product`, `/api/order`)
  - Memory & Vector Stores (`/api/memory/*`)
- **Configurable** base URL, database ID hash, and API key.

## Getting Started

### Installation

```bash
npm install open-agents-builder-client
npm install zod
```

or

```bash
yarn add open-agents-builder-client
yarn add zod
```

### Usage

1. **Import** and **initialize** the client:

```ts
import { OpenAgentsBuilderClient } from "open-agents-builder-client";

const client = new OpenAgentsBuilderClient({
  baseUrl: "https://app.openagentsbuilder.com",  // optional, defaults to this if omitted
  databaseIdHash: "35f5c5b139a6b569d4649b7...",
  apiKey: "YOUR_API_KEY"
});
```

2. **Call** the various endpoint methods. For example:

#### Example: List Agents
```ts
client.agent.listAgents()
  .then((agents) => {
    console.log("Agents retrieved:", agents);
  })
  .catch(console.error);
```

#### Example: Upsert a Product
```ts
client.product.upsertProduct({
  sku: "PROD-XYZ",
  name: "Sample Product",
  description: "A wonderful product"
})
.then((resp) => {
  console.log("Product upserted:", resp);
})
.catch(console.error);
```

#### Example: Upload or Upsert an Attachment
If uploading a binary file via JSON is not possible, you might need a **multipart** approach. For standard upsert (JSON-based):
```ts
client.attachment.upsertAttachment({
  storageKey: "unique-file-123",
  displayName: "myfile.pdf",
  mimeType: "application/pdf",
  content: "Optional text content"
})
.then((resp) => console.log("Attachment upserted:", resp))
.catch(console.error);
```

> **Note**: For file uploads with `FormData`, you can add a specialized method in `AttachmentApi` to handle `multipart/form-data`.

### Additional Examples

- **Delete a Key**  
  ```ts
  client.keys.deleteKey("1122334455667788aaabbbcccdddeeefff0011223344556677aaabbbcccdddee")
    .then(() => console.log("Key deleted!"))
    .catch(console.error);
  ```

- **Get Aggregated Stats**  
  ```ts
  client.stats.getAggregatedStats()
    .then(({ data }) => {
      console.log("This month usage:", data.thisMonth);
      console.log("Last month usage:", data.lastMonth);
      console.log("Today usage:", data.today);
    })
    .catch(console.error);
  ```

- **Audit Log**  
  ```ts
  client.audit.createAuditLog({
    eventName: "updateProduct",
    recordLocator: JSON.stringify({ productId: "PROD-XYZ" }),
    diff: JSON.stringify({
      old: { name: "Old Product Name" },
      new: { name: "New Product Name" }
    })
  })
    .then(() => console.log("Audit log created!"))
    .catch(console.error);
  ```

- **Memory Operations**
  ```ts
  // Create a new vector store
  client.memory.createStore("my-store")
    .then(() => console.log("Store created!"))
    .catch(console.error);

  // List stores with pagination
  client.memory.listStores({ limit: 10, offset: 0 })
    .then(({ files }) => console.log("Stores:", files))
    .catch(console.error);

  // First generate embeddings for your text
  const text = "Sample text to store";
  client.memory.generateEmbeddings(text)
    .then(({ embedding }) => {
      // Then create a record using the generated embeddings
      return client.memory.createRecord("my-store", {
        id: "record-1",
        content: text,
        embedding: embedding,
        metadata: { source: "example" }
      });
    })
    .then(() => console.log("Record created with generated embeddings!"))
    .catch(console.error);

  // Search records using vector similarity
  client.memory.listRecords("my-store", {
    embeddingSearch: "search query",
    topK: 5
  })
    .then(({ rows }) => console.log("Similar records:", rows))
    .catch(console.error);
  ```

### Key Creation

For **key creation** details (how `keyHash`, `keyLocatorHash`, etc. are derived), see the [official Key Context code](https://github.com/CatchTheTornado/open-agents-builder/blob/a5b5582d1bcb5de04baa53e26ef58086f4c5d436/src/contexts/key-context.tsx#L91).

### File Uploads

If you need to **upload a file** (e.g., to an attachment) with **multipart/form-data**, add a specialized method to your `AttachmentApi` that uses `FormData` instead of JSON.

## Contributing

Feel free to open **pull requests** or **issues** if you find bugs or want to add enhancements. We welcome community contributions to improve the library.

## License

**MIT License** © [CatchTheTornado](https://www.catchthetornado.com/)  

See the [LICENSE](LICENSE) file for details.