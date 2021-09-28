import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ token, password });

    return response.status(204).send();
  }
}

export { ResetPasswordController };
