declare module "hast-util-select" {
  import type { Node, Element } from "hast";
  export const selectAll: (selector: string, node: Node) => Element[];
}
