declare module "hast-util-to-string" {
  import type { Node } from "hast";
  export default function (node: Node): string;
}
