import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider'
import ISendMailDTO from "@shared/container/provider/MailProvider/dtos/ISendMailDTO";

class FakeMailProvider implements IMailProvider {
  private message: ISendMailDTO[] = []

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.message.push(message)
  }
}

export default FakeMailProvider
