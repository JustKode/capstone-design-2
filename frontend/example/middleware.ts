import type { NextRequest, NextFetchEvent } from "next/server";
import { onPageRequestFactory } from "./components/function/pageFunction";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const onPageRequest = onPageRequestFactory("userId")
  await onPageRequest(request, event, true)
}