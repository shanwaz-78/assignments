const questions = [
  {
    Q: "1. How satisfied are you with our products?",
  },
  {
    Q: "2. How fair are the prices compared to similar retailers?",
  },
  {
    Q: "3. How satisfied are you with the value for money of your purchase?",
  },
  {
    Q: "4. On a scale of 1-10 how would you recommend us to your friends and family?",
  },
  {
    Q: "5. What could we do to improve our service? ",
  },
];

localStorage.setItem('questions', JSON.stringify(questions))
