import type { Collection } from "mongodb";
import type { Invites } from "./invites";

export interface Database {
    invites: Collection<Invites>;
}