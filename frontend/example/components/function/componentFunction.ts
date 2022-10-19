import { Dispatch, SetStateAction } from "react"
import { LogData } from "./interface"
import { COMPONENT_VIEW, MOUSE_ON } from "./typeConst"

export const loggingViewtimeFunction = (isIntersecting: boolean, setIsInterseting: Dispatch<SetStateAction<boolean>>, addData: Dispatch<SetStateAction<LogData>>, id: string, cookieKey: string, debug: boolean = false) => {
  return async (isVisible: boolean) => {
    if (isIntersecting != isVisible) {
      const userCookie = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)')
      const userId = userCookie ? userCookie[2] : null

      const data: LogData = {
        userId: userId,
        timestamp: new Date().getTime(),
        doing: isVisible,
        actionType: COMPONENT_VIEW,
        objectId: id
      }

      if (debug) {
        console.log(data)
      }
      addData(data)
      setIsInterseting(isVisible)
    }
  }
}

export const loggingOnMouseOverFunction = (id: string, cookieKey: string, addData: Dispatch<SetStateAction<LogData>>, debug: boolean = false) => {
  return async () => {
    const userCookie = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)')
    const userId = userCookie ? userCookie[2] : null

    const data: LogData = {
      userId: userId,
      timestamp: new Date().getTime(),
      doing: true,
      actionType: MOUSE_ON,
      objectId: id
    }

    if (debug) {
      console.log(data)
    }
    addData(data)
  }
}

export const loggingOnMouseOutFunction = (id: string, cookieKey: string, addData: Dispatch<SetStateAction<LogData>>, debug: boolean = false) => {
  return async () => {
    const userCookie = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)')
    const userId = userCookie ? userCookie[2] : null

    const data: LogData = {
      userId: userId,
      timestamp: new Date().getTime(),
      doing: false,
      actionType: MOUSE_ON,
      objectId: id
    }

    if (debug) {
      console.log(data)
    }
    addData(data)
  }
}