import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; // Get the requested path
    const token = request.cookies.get('token'); // Replace 'token' with your cookie key

    // Redirect logged-in users away from the login page
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to main page
    }

    // Protect the /addsite page, redirect unauthenticated users to /login
    if (pathname === '/addsite' && !token) {
        return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login page
    }

    // Allow access to all other routes
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ['/login', '/addsite'], // Routes to apply the middleware
};
