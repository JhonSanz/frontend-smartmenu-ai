"use client";

import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { getCookie } from 'cookies-next';
import { useEffect } from 'react'
import { clientRoutes, publicRoutes, adminRoutes } from '@/utils/allRoutes';


export default function RoutesValidation({ children }) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { company } = useParams();

  function checkAuth() {
    if (pathname === "/") return;
    const mandatoryCookies = ["companyName", "role", "timezone", "token", "userData"];
    if (!company) router.push("/");

    let path = pathname.split(`/${company}/`)[1];
    if (publicRoutes.includes(path)) return;

    for (let cookie of mandatoryCookies) {
      let found = getCookie(cookie)
      if (found === undefined) router.push(`/${company}/logout`);
    }

    if (getCookie("role") === "client") {
      if (!clientRoutes.map(url => `user/${url}`).includes(path))
        router.push(`/${company}/logout`);
    } else if (getCookie("role") === "admin") {
      if (!adminRoutes.map(url => `admin/${url}`).includes(path))
        router.push(`/${company}/logout`);
    }
  }

  // https://nextjs.org/docs/app/api-reference/functions/use-router#examples
  useEffect(() => {
    checkAuth();
  }, [pathname, searchParams])

  return <>{children}</>
}