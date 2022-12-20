import { Error404 } from "@reporank/algs";
import DefaultError from "../components/defaults/defaultError";

export default function e404() {
    return <DefaultError error={new Error404("The page you wanted doesn't exist")}/>
}