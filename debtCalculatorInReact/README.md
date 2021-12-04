# Debt free calculator

## Goal and requirement
The calculator will tell you how long a debt will take to be paid off. In this calculator, it will actually keep track of your payments and overpayments.

general process:
1. User enters total debt amount
2. User enters interest rate
3. The app will display how many normal payments it will take to be debt free
4. There is a "Make a payment" field. The user can set the payment amount. It will calculate the payment against the interest and deduct from the total debt amount
5. You will require a 1% minimum payment on the principal.
6. Require that the user cannot pay less than the minimum
7. Every time the user makes a payment, you will record that payment and show it in a list of payments, while reducing the overall balance
8. Every time the user makes a payment, you must first calculate the interest. We will calculate interest annually.

## Results and UI design

![image](https://user-images.githubusercontent.com/86294140/144701663-20deb0f2-7672-4aab-819d-d7825daa9947.png)

## Mistake 

1. keep in mind do not use querySelector to generate the DOM elements in React.
2. In paymentList component, receiving the properties as an object will be easier to manage the data. 


