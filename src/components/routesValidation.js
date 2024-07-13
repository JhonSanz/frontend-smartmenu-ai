"use client";

import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { getCookie } from 'cookies-next';
import { useEffect } from 'react'
import { clientRoutes, publicRoutes, adminRoutes } from '@/utils/allRoutes';


export default function RoutesValidation({ children }) {

  return <>{children}</>
}