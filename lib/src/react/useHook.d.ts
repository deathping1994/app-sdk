import { SaleorAPI } from "../api";
export declare const hookFactory: <T extends "auth" | "checkout" | "wishlist" | "cart" | "categories" | "collections" | "products" | "legacyAPIProxy">(query: T) => () => SaleorAPI[T];
