export interface IMail {
    Messages: [
        {
            From?: {
                Email: string;
                Name: string;
            },
            To: [
                {
                    Email: string;
                    Name: string;
                }
            ],
            TemplateID: number;
            TemplateLanguage: boolean;
            Subject: string;
            Variables: {
                [key: string]: any;
            }
        }
    ]
}