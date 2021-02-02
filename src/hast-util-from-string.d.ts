declare module "hast-util-from-string" {
  import type { Node } from "hast";
  export default function (node: Node, value: string): void;
}
