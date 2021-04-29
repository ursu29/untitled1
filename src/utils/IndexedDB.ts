import { INDEXED_DB_EMPLOYEE_RETENTION_DAYS } from '../config'

/**
 * Parent class for working with indexedDB
 */

class IndexedDBCollection {
  // Open or create the database
  protected openDB(schema: string, keyPath: string) {
    const indexedDB: IDBFactory = window.indexedDB
    const open = indexedDB.open('Portal', 1)
    open.onupgradeneeded = () => {
      open.result.createObjectStore(schema, { keyPath })
    }
    return open
  }

  // Start the seance with the database, make action, close the seance
  protected seanceDB(
    schema: string,
    keyPath: string,
    mode: IDBTransaction['mode'],
    callbackStore: (store: IDBObjectStore) => IDBRequest | void,
    callbackResult?: (result: IDBRequest['result']) => void,
  ) {
    const open = this.openDB(schema, keyPath)

    open.onsuccess = function () {
      const db = open.result
      const transaction = db.transaction(schema, mode)
      const store = transaction.objectStore(schema)

      const getValue = callbackStore(store)

      transaction.oncomplete = function () {
        db.close()
        if (callbackResult && getValue) callbackResult(getValue.result)
      }
    }
  }
}

/**
 * Employee class
 */

export class EmployeeIDB extends IndexedDBCollection {
  async get(mail: string): Promise<EmployeeIDBType | null> {
    return new Promise(res => {
      super.seanceDB(
        'Employees',
        'mail',
        'readwrite',
        store => {
          const getValue = store.get(mail)
          getValue.onsuccess = function () {
            // Check for expiration
            const dataAgeDays =
              Math.abs(new Date().getTime() - getValue.result?.timestamp.getTime()) / 8.64e7
            if (dataAgeDays > INDEXED_DB_EMPLOYEE_RETENTION_DAYS) {
              store.delete(getValue.result.mail)
              res(null)
            }
          }
          return getValue
        },
        result => res(result),
      )
    })
  }

  put(data: EmployeeIDBType) {
    super.seanceDB('Employees', 'mail', 'readwrite', store => {
      const getValue = store.get(data?.mail)
      getValue.onsuccess = function () {
        const payload = getValue.result ? objectsDeepMerge(data, getValue.result) : data
        store.put({ ...payload, timestamp: new Date() })
      }
    })
  }
}

/**
 * Interfaces
 */

interface EmployeeIDBType {
  mail: string
  avatar: {
    [key: string]: Blob | null
  }
}

/**
 * Utils
 */

// Merge a `source` object to a `target` recursively
function objectsDeepMerge(target: any, source: any) {
  try {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object)
        Object.assign(source[key], objectsDeepMerge(target[key], source[key]))
    }
    Object.assign(target || {}, source)
    return target ? Object.assign(target, source) : source
  } catch {
    return source
  }
}
