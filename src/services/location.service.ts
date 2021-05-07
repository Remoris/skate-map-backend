import { getRepository } from "typeorm"
import { Location } from "../entities/location.entity"

export enum sortKeys {
    distance = "distance",
    rating = "rating",
    popularity = "popularity",
}

export const isSortKey = (key: any): key is sortKeys => typeof key === 'string' && Object.values(sortKeys).includes(key as sortKeys)

export const locationService = {
    find: async (params: {query?: string, sort?: sortKeys, filter?: string[], coords?: {latitude: number, longitude: number}}) => {
        const LocationRepository = getRepository(Location)
        LocationRepository.find({})
    }

}