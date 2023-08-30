export class BookingUtils {
  public static BookingHTMLTemplate(booking: BookInfo): string {
    return `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        /* Add your CSS styles here */
        body {
            font-family: Arial, sans-serif;
            margin:auto;
        }
        .container {
            max-width: 38rem;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007BFF;
            color: #fff;
            text-align: center;
            padding: 10px;
        }
        .booking-details {
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Booking Confirmation</h1>
        </div>
        <div class="booking-details">
            <h2>New Booking:</h2>
            <p><strong>Client email:</strong> ${booking.email}</p>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Address:</strong> ${booking.address}</p>
            <p><strong>Service:</strong> ${booking.service}</p>
        </div>
    </div>
</body>
</html>
`;
  }
}

export interface BookInfo {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  service: string;
}
