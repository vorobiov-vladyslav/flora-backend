const categories = ["roses", "mixed", "seasonal", "premium"];

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flora API",
      version: "1.0.0",
      description:
        "REST API for the Flora bouquet shop. CRUD for bouquets with Joi validation, image upload via Multer, and a minimal orders endpoint.",
    },
    servers: [
      { url: "http://localhost:3000", description: "Local development" },
      { url: "https://flora-backend.onrender.com", description: "Render deployment" },
    ],
    tags: [
      { name: "Bouquets", description: "Bouquet catalogue operations" },
      { name: "Orders", description: "Order submission" },
      { name: "Feedbacks", description: "Client feedback operations" },
    ],
    components: {
      schemas: {
        Bouquet: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Spring Elegance" },
            description: { type: "string", example: "A delicate blend of peonies, tulips, and roses." },
            price: { type: "number", example: 35 },
            photoURL: { type: "string", example: "https://example.com/photos/spring-elegance.jpg" },
            favorite: { type: "boolean", example: true },
            category: { type: "string", enum: categories, example: "seasonal" },
            image2x: { type: "string", example: "https://example.com/photos/spring-elegance@2x.jpg" },
            alt: { type: "string", example: "Spring Elegance bouquet" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        BouquetCreate: {
          type: "object",
          required: ["title", "description", "price"],
          properties: {
            title: { type: "string", example: "Spring Elegance" },
            description: { type: "string", example: "A delicate blend of peonies, tulips, and roses." },
            price: { type: "number", example: 35 },
            category: { type: "string", enum: categories, example: "seasonal" },
            favorite: { type: "boolean", example: false },
            photoURL: { type: "string", example: "https://example.com/photos/spring-elegance.jpg" },
            image2x: { type: "string", example: "https://example.com/photos/spring-elegance@2x.jpg" },
            alt: { type: "string", example: "Spring Elegance bouquet" },
          },
        },
        BouquetUpdate: {
          type: "object",
          minProperties: 1,
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string", enum: categories },
            favorite: { type: "boolean" },
            photoURL: { type: "string" },
            image2x: { type: "string" },
            alt: { type: "string" },
          },
        },
        BouquetFavorite: {
          type: "object",
          required: ["favorite"],
          properties: {
            favorite: { type: "boolean", example: true },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Jane Doe" },
            phone: { type: "string", example: "+380000000000" },
            address: { type: "string", example: "Kyiv, Khreshchatyk 1" },
            message: { type: "string", example: "Please deliver before noon." },
            product: { type: "string", example: "Spring Elegance" },
            quantity: { type: "integer", example: 1 },
            agree: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        OrderCreate: {
          type: "object",
          required: ["name", "phone"],
          properties: {
            name: { type: "string", example: "Jane Doe" },
            phone: { type: "string", example: "+380000000000" },
            address: { type: "string", example: "Kyiv, Khreshchatyk 1" },
            message: { type: "string", example: "Please deliver before noon." },
            product: { type: "string", example: "Spring Elegance" },
            quantity: { type: "integer", example: 1 },
            agree: { type: "boolean", example: true },
          },
        },
        Feedback: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            text: { type: "string", example: "Flora made my anniversary unforgettable!" },
            author: { type: "string", example: "Emma T." },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        FeedbackCreate: {
          type: "object",
          required: ["text", "author"],
          properties: {
            text: { type: "string", example: "Flora made my anniversary unforgettable!" },
            author: { type: "string", example: "Emma T." },
          },
        },
        FeedbackUpdate: {
          type: "object",
          minProperties: 1,
          properties: {
            text: { type: "string" },
            author: { type: "string" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Not found" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
