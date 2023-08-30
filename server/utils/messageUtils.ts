export class MessageUtils {
  public static MessageHTMLTemplate(message: MessageInfo): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  background-color: #fff;
                  margin: 20px;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0,0,0,0.2);
              }
              h1 {
                  color: #333;
                  text-align: center;
              }
              p {
                  margin: 0;
                  padding: 5px 0;
              }
              .message {
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Contact Form Submission</h1>
              <p><strong>Name:</strong> ${message.name}</p>
              <p><strong>Email:</strong> ${message.email}</p>
              <p><strong>Phone:</strong> ${message.phone}</p>
              <div class="message">
                  <p><strong>Message:</strong></p>
                  <p>${message.message}</p>
              </div>
          </div>
      </body>
      </html>
      
  `;
  }
}

export interface MessageInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}
