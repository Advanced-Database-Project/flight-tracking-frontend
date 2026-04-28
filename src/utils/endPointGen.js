//

import BASE_URL from "../../config";

// ----------------------------------------

// export const generateEndPoint = (port, path) => {
//   return `${BASE_URL}:${port}/${path}`;
// };

export const generateEndPoint = (port, path) => {
  return `:${port}/${path}`;
};
