export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard:path*',
    '/dashboard/boxes/:path*',
    '/dashboard/products/:path*',
    '/dashboard/providers/:path*',
    '/dashboard/purchases/:path*',
    '/dashboard/transactions/:path*',
    '/dashboard/users/:path*'
  ]
};
