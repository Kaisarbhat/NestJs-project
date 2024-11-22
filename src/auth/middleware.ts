import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class Middleware implements NestMiddleware{
    use(){
        console.log('Request " : ' ,)
        
    }
}