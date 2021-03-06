import { StringExtensions } from './extensions/StringExtensions'

interface IAppInEvent {}
type DynamicObject = { [key: string]: any }

class EventFormatter {
  private _keyMapping: {
    [key: string]: string
  } = {
    time: 'TimeGenerated',
    'data.baseData.responseCode': 'ResultCode',
    name: 'Type',
    'data.baseData.properties': 'Properties',
    ClientIp: 'ClientIP',
    SdkVersion: 'SDKVersion',
    Duration: 'DurationMs',
  }
  private _valueMapping: {
    [key: string]: (value: DynamicObject) => object
  } = {
    tags: (val) => this.formatTags(val),
  }
  private _prefixStrip: string[] = ['tags.', 'data.', 'baseData.']
  private _noFlatMap: string[] = [
    'data.baseData.properties',
    'data.baseData.metrics',
    'data.baseData.exceptions',
  ]

  public formatEvent(event: any): DynamicObject {
    return this.flattenObject(event)
  }

  private formatObject(k: string, obj: any): DynamicObject {
    let parsed: DynamicObject = {}

    Object.keys(obj).map((k) => {
      if (this.isObject(obj[k])) {
        const keyName = this._keyMapping[k]
        const formattedKeyName =
          keyName !== undefined
            ? StringExtensions.toPascalCase(keyName)
            : StringExtensions.toPascalCase(k)
        const valueMapping = this._valueMapping[k]
        if (valueMapping !== undefined) {
          if (keyName === '..') {
            parsed = {
              ...parsed,
              ...valueMapping(obj[k]),
            }
          } else {
            parsed = {
              ...parsed,
              ...{ [formattedKeyName]: { ...valueMapping(obj[k]) } },
            }
          }
        } else {
          parsed = {
            ...parsed,
            ...{
              [formattedKeyName]: {
                ...this.formatObject(formattedKeyName, obj[k]),
              },
            },
          }
        }
      } else {
        console.log(k)
        parsed = {
          ...parsed,
          ...this.formatEntry(k, obj[k]),
        }
      }
    })
    return parsed
  }

  private formatEntry(key: string, entry: any): DynamicObject {
    const keyName = this._keyMapping[key]
    return { [StringExtensions.toPascalCase(keyName || key)]: entry }
  }
  private isObject(val: any) {
    if (val === null) {
      return false
    }
    return typeof val === 'function' || typeof val === 'object'
  }

  private formatTags(tags: any) {
    const parsed: DynamicObject = {}

    Object.keys(tags).map((key: string) => {
      const val: any = tags[key]
      const keyParts = key
        .replace('ai.', '')
        .replace('cloud.', 'app.')
        .replace('location.', 'client.')
        .replace('internal.', '')
        .split('.')

      const newKey =
        keyParts.length > 1
          ? `${StringExtensions.toPascalCase(
              keyParts[0],
            )}${StringExtensions.toPascalCase(keyParts[1])}`
          : StringExtensions.toPascalCase(keyParts[0])
      const keyName = this._keyMapping[newKey] || newKey
      parsed[keyName] = val
    })

    return parsed
  }

  private flattenObject(obj: object, keySeparator = '.') {
    const flattenObjectRecursive = (
      obj: object,
      parentProperty?: string,
      propertyMap: Record<string, unknown> = {},
    ) => {
      for (const [key, value] of Object.entries(obj)) {
        const property = parentProperty
          ? `${parentProperty}${keySeparator}${key}`
          : key
        const namedKey = this._keyMapping[property]
        const valueMapping = this._valueMapping[namedKey || property]
        const usableKey = StringExtensions.toPascalCase(
          namedKey || this.stripIfNeeded(property),
        )
        if (
          value &&
          typeof value === 'object' &&
          !this._noFlatMap.includes(property)
        ) {
          flattenObjectRecursive(
            valueMapping !== undefined ? valueMapping(value) : value,
            property,
            propertyMap,
          )
        } else {
          propertyMap[usableKey] =
            valueMapping !== undefined ? valueMapping(value) : value
        }
      }
      return propertyMap
    }
    return flattenObjectRecursive(obj)
  }

  private stripIfNeeded(key: string) {
    let newKey = key
    this._prefixStrip.forEach((x) => (newKey = newKey.replace(x, '')))
    return newKey
  }
}

export default EventFormatter
