import { NamedObservable } from "../NamedObservable";
import { LocalStorageEvents, LocalStorageItems } from "./types";
/**
 * Sets or removes data from local storage in one of the specified data format.
 * If data is set to null, then it is removed from local storage.
 * If needed, it stringify data for persistence in local storage or parse such data to be retrieved
 * in desired format.
 */
declare class LocalStorageHandlerProxy extends NamedObservable<LocalStorageItems | LocalStorageEvents> {
    /**
     * Stringify object/string and saves it to local storage with expiration date.
     *
     * @param {LocalStorageItems} name
     * @param {string | TItem | null} item
     * @returns {Promise<void>}
     * @protected
     */
    protected saveItem<TItem extends object>(name: LocalStorageItems, item: any | TItem | string | null): Promise<void>;
    /**
     * Retrieve item from local storage and parse it as object/string.
     *
     * @param {LocalStorageItems} name
     * @returns {Promise<TItem | null>}
     * @protected
     */
    protected static retrieveItem<TItem extends {}>(name: LocalStorageItems): Promise<TItem | null>;
    /**
     * Remove whole storage data
     *
     * @returns {Promise<void>}
     * @protected
     */
    protected clearStorage(): Promise<void>;
}
export default LocalStorageHandlerProxy;
