import { locationService, sortKeys, isSortKey } from "../services/location.service"
import { Request, Response } from "express"

export const locationController = {
    
    find: async (req: Request, res: Response) => {
        
        const query = typeof req.query?.q === 'string' ? req.query.q : undefined
        const sort = isSortKey(req.query?.sort) ? sortKeys[req.query.sort] : undefined 
        const filter = Array.isArray(req.query?.filter) ? req.query.filter as string[] : undefined
        const latitude = typeof req.query.latitude === 'string' ? Number.parseFloat(req.query.latitude) : undefined
        const longitude = typeof req.query.longitude === 'string' ? Number.parseFloat(req.query.longitude) : undefined
        const coords = latitude && longitude ? {latitude, longitude} : undefined

        return locationService.find({query, sort, filter, coords})
    },
    
    post: () => {}
};
