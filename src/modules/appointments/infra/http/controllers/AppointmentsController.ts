import { Request, Response } from 'express'
import { parseISO } from "date-fns";
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const CreateAppointment = container.resolve(CreateAppointmentService)

    const appointment = await CreateAppointment.execute({
      date: parsedDate,
      user_id,
      provider_id
    })

    return response.json(appointment)
  }

}
