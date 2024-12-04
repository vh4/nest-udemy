import { Request } from "express";
declare module 'express' {
	export interface Request {
		user?:object,
		mid:string,
		timestamp:Date | string,
		response?:object
	}
}

export {}

