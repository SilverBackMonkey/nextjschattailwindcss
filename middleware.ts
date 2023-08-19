import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from 'next/headers';
import prisma from './client';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll()

  const emailIsExist = request.cookies.get('email');
  const isAuthenticated = request.cookies.get('isAuthenticated');

  // when regist email, check if email exist in db, if so, set cookie items(isAuthenticated, email)
  if(request.nextUrl.pathname == "/regist") {
    const { email } = await request.json();
    if(emailIsExist || isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if(request.nextUrl.pathname == "/news") {
    if(!isAuthenticated)
      return NextResponse.redirect(new URL('/', request.url));
  }
} 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/news', '/regist'],
}