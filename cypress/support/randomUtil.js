export const generateRandomEmail = () => {
    const randomId = Cypress._.random(0, 1e6);  // Generate a random number
    return `user${randomId}@example.com`; // Construct a random email
  };