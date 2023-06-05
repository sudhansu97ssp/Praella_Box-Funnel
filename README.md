
# Box Funnel With Recharge

A brief description of the project where we are selecting coffee bag according to our preference set and the quantity, roast, grind , frequency and also add on items can be selected before going to summary page.




## Project Setup Guide


This guide will walk you through the step-by-step process of setting up **Box funnel with Recharge** project locally. By following these instructions, you will be able to develop and test your **Box funnel with Recharge** on your local machine before deploying it to a live environment. Let's get started!



## Prerequisites

- IDE 
- Git


### Step 1: Clone the Repository

    1. Open your terminal or command prompt.
    2. Change the current working directory to the location where you want to clone the repository.
    3. Run the following command to clone the repository:

    git clone https://github.com/sudhansu97ssp/Praella_Box-Funnel.git

    4. Once the cloning process is complete, navigate into the project directory:

    cd your-repository
### Step 2: Start the Development Server

    1. Now, the project setup in your local environment is complete.Install the extension of live server to run the application in local.

    2. Open your browser and navigate to http://127.0.0.1:5501/ to access your locally hosted application. 
## Step 3: Customize and Test

    1. Open your preferred code editor and start customizing files located in the project's directory to add or customize any features.
    2. Make any necessary modifications to the html files, stylesheet, and JavaScript file.
    3. Save your changes and observe the updates in the browser.
    4. Test your project's functionality and ensure everything works as expected.
## Step 4: Deployment to Vercel

    1. Once you are satisfied with your changes and want to deploy your application to a live environment, follow these steps:

- Push the changes to your remote repository.
- Then deploy the repository in the netlify server. It will provide the hosted link.
## Testcases


    1. Start the server and It will land us on the Preference Selection Page where we can select the preference as per our requirement.

    2. On clicking on any one preference, It will open the **Bag selection page** where we can selected the no of quantity of bag we want to purchase.

    3. Untill and unless we select any bag selection quantity we can't navigate to the next **Roast preference page**.

    4. After selecting bag quantity, it will navigate us to the **Roast preference page**, where we can select single product all quantity or multiple product all quantity.

    5. For example, if a customer has chosen the "8 Bags", they are allowed to select up to 8 quantities of products(can be 8 qty of one product or a total of 8 qty of mixed products).

    6. After selecting the quantity, we can navigate to the **Grind type page**, wheere we have different instruments for grind and we can select any one of the grind type and then navigate to frequency page by clicking next button.

    7. In **Frequency page**, we have to select any one type of frequency from the options, then by clicking on next it will navigate us to the **add-on selection page**.

    8. In **Add-On Page** , It is optional to select any addon , if we don't want to select any addon item, then we can navigate to **Summary page** by clicking next button.

    9. If someone will click on the any add-on item , then it will reflect in the next **Summary page**.

    10. In the **Summary Page**, We will get all the details which we have done in the whole box funnel process.

    11. In the **Summary page**, If we want to change anything again, then also we can directly go to that page by clicking the edit button along with the page details heading.

    12. When we click on the checkout button , it will show a popup and will navigate again to the initial **Preference page** to start the process again to purchase a new item.
