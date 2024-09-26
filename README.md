# technichaltest
## How to install and run the script.
1. Install Node.js: Ensure that Node.js is installed on your computer.
Initialize Project:
Create a new directory for the project and navigate into it. Run npm init -y to create a package.json file.

2. Install Puppeteer: Run the command npm install puppeteer to install Puppeteer.

3. Create Script File: Create a JavaScript file (for example, script.js) and paste the Puppeteer code you have written.

4. Run the Script: Use the command node script.js in the terminal to execute the script.

## explanation of how the code works
1. Login Process:
- The code opens the browser and the TikTok login page.
- It attempts to log in three times by entering the email and password.
- It handles CAPTCHA manually (the user must complete it and continue the script after pressing Enter).
- If the login is successful, it proceeds to the "For You" page.

2. Liking Posts:
- After a successful login, the code opens the TikTok feed.
- For each post from 1 to 10, the code searches for the "like" button and clicks it.
- After liking a post, the code scrolls down to the next post.
- If the "like" button is not found, the script logs the error and continues.
