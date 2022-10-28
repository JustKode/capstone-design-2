import type { NextRequest, NextFetchEvent } from "next/server"
import { SERVER_URL } from "../../env/server"

export const onPageRequestFactory = (cookieKey: string) => {
  return async (request: NextRequest, event: NextFetchEvent, debug: boolean = false) => {
    const pathname = request.nextUrl.pathname
    const userId = request.cookies.get(cookieKey) || "null"

    // stop condition
    if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
      return
    }

    const data = {
      basePath: pathname,
      userId: userId,
      timestamp: new Date().getTime()
    }

    if (debug) {
      console.log(data)
    }

    const response = await fetch(`${SERVER_URL}/log/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }
}