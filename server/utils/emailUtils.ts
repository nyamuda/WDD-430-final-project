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
      
          <h2>Hi ${info.name}!</h2>
      
          <p>Thanks for signing up to Loyd School of driving. Please verify your email address.</p>
      
          <a href="${info.appDomain}/verify?token=${info.token}">VERIFY MY EMAIL</a>
      
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
