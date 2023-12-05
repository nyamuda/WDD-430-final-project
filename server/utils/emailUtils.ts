export class EmailUtils {
  public static VerifyEmailHTMLTemplate(info: verifyEmailInfo): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
      
          #container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
      
          h2 {
            color: #007bff;
          }
      
          p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 15px;
          }
      
          a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
      
        
        </style>
      </head>
      <body>
      
      <div id="container">
      <h2>Hi ${info.name},</h2>
      <p>Thanks for signing up to Loyd School of Driving. Please verify your email address.</p>
      <a href="${info.appDomain}/email-verification/verify/?token=${info.token}">VERIFY MY EMAIL</a>
      <p>Please note that this link will expire in 24 hours.</p>
      <p>Regards,</p>
      <p>Loyd School of Driving Team</p>
    </div>
      
      </body>
      </html>      
  `;
  }
}

export interface verifyEmailInfo {
  name: string;
  token: string;
  appDomain: string;
  email: string;
}
