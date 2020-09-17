import { Request, Response } from 'express'
import { connection } from '../database/connection'

export class IncidentController {

    async index(req: Request, res: Response) {

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        res.header('X-Total-Count', count['count(*)'])

        return res.json(incidents)
    }


    async create(req: Request, res: Response) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return res.json({ id })

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('incidents').where('id', id).select('ong_id').first()

        if (incident.ong_id != ong_id) {
            return res.status(401).json({
                error: 'Operation not permitted.'
            })
        }

        await connection('incidents').where('id', id).delete()
        return res.status(204).send()
    }

}