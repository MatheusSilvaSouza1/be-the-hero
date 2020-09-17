import { Router } from 'express'
import { OngController } from './controllers/OngController'
import { IncidentController } from './controllers/IncidentController'
import { ProfileController } from './controllers/ProfileController'
import { SessionController } from './controllers/SessionController'

const router = Router()
const ongController =  new OngController
const incidentsController = new IncidentController
const profileController = new ProfileController
const sessionController = new SessionController

router.post('/sessions', sessionController.create)

router.get('/ongs', ongController.index)
router.post('/ongs', ongController.create )

router.get('/profile', profileController.index)

router.get('/incidents', incidentsController.index)
router.post('/incidents', incidentsController.create)
router.delete('/incidents/:id', incidentsController.delete)

export { router }
