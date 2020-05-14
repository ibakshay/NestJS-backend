import { validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";

export class NewPruductDTO {

    title: string
    description: string

    @IsInt()
    price: number
}