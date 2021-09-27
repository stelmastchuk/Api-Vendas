import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAvatarUseCase } from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatarFileName = request.file?.filename;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    const user = await updateAvatarUseCase.execute({
      user_id: id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      avatarFileName: avatarFileName!,
    });

    return response.status(201).json(user);
  }
}

export { UpdateAvatarController };
