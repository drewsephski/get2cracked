# Content Feature Plan

## Data Model (Prisma Schema)

The following Prisma schema defines the `Content` model and its relationship with the `User` model.

```prisma
// User Model (existing)
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @default(now()) @map(name: "updated_at")
  role          UserRole  @default(USER)

  accounts Account[]
  sessions Session[]
  messages ChatMessage[]
  content  Content[] // Relationship to Content model

  stripeCustomerId       String?   @unique @map(name: "stripe_customer_id")
  stripeSubscriptionId   String?   @unique @map(name: "stripe_subscription_id")
  stripePriceId          String?   @map(name: "stripe_price_id")
  stripeCurrentPeriodEnd DateTime? @map(name: "stripe_current_period_end")

  @@map(name: "users")
}

// Content Status Enum
enum ContentStatus {
  DRAFT
  PUBLISHED
}

// Content Model (existing)
model Content {
  id        String        @id @default(cuid())
  title     String
  content   String
  slug      String        @unique
  status    ContentStatus @default(DRAFT)
  createdAt DateTime      @default(now()) @map(name: "created_at")

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])
  @@map(name: "content")
}
```

## API Design

### 1. Create New Content

*   **HTTP Method:** `POST`
*   **Endpoint Path:** `/api/content`
*   **Description:** Allows authenticated users to create new content entries.
*   **Expected Request Body:**
    ```json
    {
      "title": "string",
      "content": "string",
      "slug": "string",
      "status": "DRAFT" | "PUBLISHED" // Optional, defaults to DRAFT
    }
    ```
*   **Expected Response Body (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "slug": "string",
      "status": "DRAFT" | "PUBLISHED",
      "createdAt": "Date",
      "authorId": "string"
    }
    ```

### 2. Get All Content for a User

*   **HTTP Method:** `GET`
*   **Endpoint Path:** `/api/content`
*   **Description:** Retrieves all content entries owned by the authenticated user.
*   **Expected Request Body:** None (User ID will be inferred from the session/authentication token).
*   **Expected Response Body (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "slug": "string",
        "status": "DRAFT" | "PUBLISHED",
        "createdAt": "Date",
        "authorId": "string"
      },
      // ... more content objects
    ]