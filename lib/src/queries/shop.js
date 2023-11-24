"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShop = void 0;
const client_1 = require("@apollo/client");
exports.getShop = client_1.gql `
  query GetShop {
    shop {
      displayGrossPrices
      defaultCountry {
        code
        country
      }
      countries {
        country
        code
      }
      geolocalization {
        country {
          code
          country
        }
      }
    }
  }
`;
//# sourceMappingURL=shop.js.map