"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { deleteCookie } from 'cookies-next';
import { useParams } from 'next/navigation';


export default function Logout() {
  const router = useRouter();
  const { company } = useParams();

  useEffect(() => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("timezone");
    deleteCookie("userData");
    router.push(`/${company}/login`);
  }, [])

  return <></>
}
