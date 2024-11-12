export function getForgotPasswordEmail(email: string, token: string) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333333;
                    line-height: 1.6;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 15px;
                    color: #ffffff;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 4px;
                    margin-top: 20px;
                }
                .button:hover {
                    background-color: #0056b3;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p>Hello,</p>
                
                <p>Follow this link to reset your Petville password for your <strong>${email}</strong> account.</p>
                
                <a href="http://localhost:3000/reset-password/${token}" class="button">Reset your password</a>
                
                <p>If you didn’t ask to reset your password, you can ignore this email.</p>
                
                <p>Thanks,</p>
                <p>Task Manager team</p>
                
                <div class="footer">
                    <p>Please do not reply to this email. This inbox is not monitored.</p>
                </div>
            </div>
        </body>
        </html>
    `
}