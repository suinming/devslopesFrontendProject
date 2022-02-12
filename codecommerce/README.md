# App mockup

## Login/Signup screen
1. User can sign-in
2. Password field is obscured
3. There is an "eye" icon next to password to reveal what is being typed
4. If password is invalid, show an error message as depicted in the screenshot below
5. If successful sign-in, take user to Customer Cart
6. User can switch between Sign in and Create Account
7. If creating an account there will be two password fields
8. Passwords must match or show appropriate error as depicted below
9. First name and last name cannot have numbers
10. Postal code must not allow text (numbers only)
11. Show an "eye" icon next to password to reveal what is being typed
12. If an account for that email already exists, show an error message
13. Add a facebook sign in button

## Home page
1. use the open-source Node API CommerceJS to get the information of the product
2. each product needs an image, title, description, quantity and price

## Cart screen
1. Create a cart that has some items in it
2. These should be actual components with item value
3. The total sum of all items should be calculated as a total
4. Items can be removed and quantities can be increased or decreased -- cart total should adjust accordingly
5. If there are zero cart items the Checkout button should be disabled
6. If Checkout is selected move to the shipping screen

## Shipping screen
1. Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
2. Ensure phone fields cannot take text (only numbers)
3. Ensure postal code cannot take text (only numbers)
4. Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
5. Back to cart button should go back to cart
6. There should be a Next or "Payment" button to go to next screen

## Payment screen
1. Create a credit card formatted that takes all major credit cards (Visa, Master Card, American Express, etc)
2. Format the credit card field so the numbers are properly spaced (we don't want it to look ugly!)
3. Have a dropdown for month and year for expiration dates
4. Show errors if fields are entered incorrectly
5. The Pay button should show the total price. If the fields are not complete this button should be disabled
6. Show the cart/total at the right (or somewhere else)
7. The Pay button should take the user to the confirmation screen

## Confirmation screen
1. Should show amount paid
2. Should show last 4 digits of credit card used to make the purchase




