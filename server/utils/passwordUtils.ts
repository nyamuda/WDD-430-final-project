export class PasswordUtils {
  public static passwordResetHTMLTemplate(info: userInfo): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
      
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          h1 {
            color: #333;
          }
      
          p {
            color: #555;
            line-height: 1.6;
          }
      
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Request</h1>
          <p>Hello ${info.name},</p>
          <p>We received a request to reset your password. To proceed, click the button below:</p>
      
          <a href="${info.appDomain}/password/reset?token=${info.token}" class="cta-button">Reset My Password</a>
      
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
      
          <p>Best regards,<br>Loyd School of Driving Team</p>
        </div>
      </body>
      </html>      
    `;
  }
}

export interface userInfo {
  name: string;
  token: string;
  appDomain: string;
  email: string;
}
