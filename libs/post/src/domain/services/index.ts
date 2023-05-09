import { ISetNotPublished, SET_NOT_PUBLISHED } from "./set-not-published.case";
import { AggregateRoot } from "@nestjs/cqrs";
import { ISetPublished, SET_PUBLISHED } from "./set-published.case";
import { PLAIN_TO_INSTANCE } from "./plain-to-instance.case";

export class PostServices 
  extends AggregateRoot 
  implements ISetNotPublished, ISetPublished 
{
  setPublished = SET_PUBLISHED
  setNotPublished = SET_NOT_PUBLISHED
  plainToInstance = PLAIN_TO_INSTANCE
}