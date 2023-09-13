"use client";
import { useInterval } from "../../hooks/use-interval";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function DiscussionRefresher({ intervalMs }) {
  const router = useRouter();
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);
  useInterval(() => {
    refresh();
  }, intervalMs);
  return null;
}
