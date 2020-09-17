import { Request, Response } from 'express'
import { connection } from '../database/connection'


export class SessionController {

    async create(req: Request, res: Response) {
        const { id } = req.body

        const ong = await connection('ongs').where('id', id).select('name').first()

        if (!ong) {
            return res.status(400).json({
                error: 'Nenhuma ong encontrado com esse ID'
            })
        }
        return res.json(ong)
    }

}