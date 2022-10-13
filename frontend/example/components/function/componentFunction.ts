import { Dispatch, MouseEventHandler, MutableRefObject, SetStateAction, useEffect, useState } from "react"
import { SERVER_URL } from "../../env/server"

export const loggingViewtimeFunction = (isIntersecting: boolean, setIsInterseting: Dispatch<SetStateAction<boolean>>, id: string, cookieKey: string, debug: boolean = false) => {
  return async (isVisible: boolean) => {
    if (isIntersecting != isVisible) {
      const userCookie = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)')
      const userId = userCookie ? userCookie[2] : null

      const data = {
        userId: userId,
        timestamp: new Date().getTime(),
        isShow: isVisible,
        id: id
      }

      if (debug) {
        console.log(data)
      } else {
        const response = await fetch(`${SERVER_URL}/log/component/view`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        })
      }
      setIsInterseting(isVisible)
    }
  }
}

export const loggingOnMouseOverFunction = (id: string, cookieKey: string, debug: boolean = false) => {
  return async () => {
    const userCookie = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)')
    const userId = userCookie ? userCookie[2] : null

    const data = {
      userId: userId,
      timestamp: new Date().getTime(),
      isMouseOn: true,
      id: id
    }

    if (debug) {
      console.log(data)
    } else {
      const response = await fetch(`${SERVER_URL}/log/component/mouse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    }
  }
}

export const loggingOnMouseOutFunction = (id: string, cookieKey: string, debug: boolean = false) => {
  return async () => {
    const userCookie = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)')
    const userId = userCookie ? userCookie[2] : null

    const data = {
      userId: userId,
      timestamp: new Date().getTime(),
      isMouseOn: false,
      id: id
    }

    if (debug) {
      console.log(data)
    } else {
      const response = await fetch(`${SERVER_URL}/log/component/mouse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    }
  }
}