import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailjet from 'node-mailjet';
import { ETemplatesMailjet } from '../enums/templates-mailjet.enum';
import { IMail } from '../interfaces/mailjet.interface';


@Injectable()
export class MailjetService {

    private mailjet: mailjet.Email.Client;

    constructor(
        private configService: ConfigService
    ) {
        this.mailjet = mailjet.connect(this.configService.get('MAILJET_PUBLIC_API_KEY'), this.configService.get('MAILJET_PRIVATE_API_KEY'));
        // this._sendTest();
    }

    async sendEmail(mail: IMail): Promise<mailjet.Email.Response> {
        mail.Messages[0].From = {
            Email: this.configService.get('EMAIL'),
            Name: this.configService.get('NAME_EMAIL'),
        };

        return this.mailjet.post('send', { 'version': 'v3.1' }).request(mail);
    }

    private _sendTest(): void {
        this.mailjet.post('send', { 'version': 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        "Email": "cegifloresca@ittepic.edu.mx",
                        "Name": "Cesar"
                    },
                    To: [
                        {
                            "Email": "cegifloresca@ittepic.edu.mx",
                            "Name": "Cesar"
                        }
                    ],
                    TemplateID: ETemplatesMailjet.DEFAULT_PASSWORD,
                    TemplateLanguage: true,
                    Subject: 'xd',
                    Variables: {
                        password: "teeeee",
                    }
                }
            ]
        })
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })
    }
}
