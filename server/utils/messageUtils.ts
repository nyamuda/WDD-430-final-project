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
                  
              }
              .container {
                  background-color: #fff;
                  margin:auto;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0,0,0,0.2);
                  max-width: 38rem;
              }
              h1 {
                background-color: #007BFF;
                color: #fff;
                text-align: center;
                padding: 10px;
              }
              p {
                  margin: 0;
                  padding: 5px 0;
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
