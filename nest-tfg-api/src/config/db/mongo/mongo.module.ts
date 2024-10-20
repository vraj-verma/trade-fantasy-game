import { Module } from "@nestjs/common";
import { MONGOCONFIG } from "./mongo.config";

@Module({
    imports: [...MONGOCONFIG]
})
export class MongoModule{}