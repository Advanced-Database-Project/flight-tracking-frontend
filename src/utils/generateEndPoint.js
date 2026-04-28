//

import { BASE_URL } from "../../config";

// ----------------------------------------

export const generateEndPoint = (port, path) => {
  const base = (BASE_URL || "").replace(/\/+$/, "");
  const p = (path || "").replace(/^\/+/, "");

  const baseHasPort = /:\d+(?:$|\/)/.test(base);

  return baseHasPort ? `${base}/${p}` : `${base}:${port}/${p}`;
};
