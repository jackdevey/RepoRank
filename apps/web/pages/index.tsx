import { Button } from "ui";
import { getRepository } from "@reporank/algs";

export default function Web() {

  const repo = getRepository();
  let data = repo.analyse();

  return (
    <div>
      {data.metrics.stars.count}
    </div>
  );
}
