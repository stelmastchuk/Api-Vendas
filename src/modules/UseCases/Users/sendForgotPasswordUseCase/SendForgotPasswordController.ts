import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordUseCase } from './SendForgotPasswordUseCase';

class SendForgotPasswordController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordUseCase = container.resolve(
      SendForgotPasswordUseCase,
    );

    await sendForgotPasswordUseCase.execute(email);

    return response.status(204).send();
  }
}

export { SendForgotPasswordController };
