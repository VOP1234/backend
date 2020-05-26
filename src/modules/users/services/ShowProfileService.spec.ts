import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ShowProfileService from '@modules/users/services/ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfileService = new ShowProfileService(
      fakeUsersRepository,
    )
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    const profile = await showProfileService.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@exemple.com')
  })

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user_id',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
