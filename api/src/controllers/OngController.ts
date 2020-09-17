import { Request, Response } from 'express'
import { connection } from '../database/connection'
import crypto from 'crypto'

export class OngController {

    public async create(req: Request, res: Response) {
        const { name, email, whatsapp, city, uf } = req.body

        const id = crypto.randomBytes(4).toString('hex')

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id })
    }


    public async index(req: Request, res: Response) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)
    }
}