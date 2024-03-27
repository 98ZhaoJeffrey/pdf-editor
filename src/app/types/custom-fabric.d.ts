import { IObjectOptions } from "fabric/fabric-impl"

declare module 'fabric/fabric-impl' {
    interface IObjectOptions {
        id: string
    }
}
