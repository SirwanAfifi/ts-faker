import { proxy } from "valtio";

export const state = proxy({
  config: {
    scale: 100,
    numberMax: 50,
  },
});
