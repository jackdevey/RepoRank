import { Repository } from "./repository";

export function getRepository(): Repository {
    let r = new Repository()
    return r
}