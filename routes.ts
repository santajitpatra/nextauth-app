// Routes for public access @type { string[] }
export const publicRoutes = ["/"];


// Routes for authenticated access @type { string[] }
export const authenticatedRoutes = ["/auth/login", "/auth/register"];

// API prefix @type { string }
export const apiAuthPrefix = "/api/auth";

// Default login redirect URL @type { string }
export const DEFAULT_LOGIN_REDIRECT_URL = "/settings";