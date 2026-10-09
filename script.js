// Demonstration accounts for this class project (not real customer information).
const representatives = [
  { firstName: 'Maya', lastName: 'Smith', repId: '1001', phone: '555-201-1001', email: 'maya@example.com', password: '!A1bc' },
  { firstName: 'Noah', lastName: 'Brown', repId: '1002', phone: '555-201-1002', email: 'noah@example.com', password: '@B2cd' },
  { firstName: 'Ava', lastName: 'Jones', repId: '1003', phone: '555-201-1003', email: 'ava@example.com', password: '#C3de' },
  { firstName: 'Liam', lastName: 'Davis', repId: '1004', phone: '555-201-1004', email: 'liam@example.com', password: '$D4ef' },
  { firstName: 'Emma', lastName: 'Miller', repId: '1005', phone: '555-201-1005', email: 'emma@example.com', password: '%E5fg' },
  { firstName: 'Ethan', lastName: 'Wilson', repId: '1006', phone: '555-201-1006', email: 'ethan@example.com', password: '&F6gh' },
  { firstName: 'Olivia', lastName: 'Moore', repId: '1007', phone: '555-201-1007', email: 'olivia@example.com', password: '*G7hi' },
  { firstName: 'Lucas', lastName: 'Taylor', repId: '1008', phone: '555-201-1008', email: 'lucas@example.com', password: '?H8ij' },
  { firstName: 'Sophia', lastName: 'Anderson', repId: '1009', phone: '555-201-1009', email: 'sophia@example.com', password: '!J9kl' },
  { firstName: 'James', lastName: 'Thomas', repId: '1010', phone: '555-201-1010', email: 'james@example.com', password: '@K0mn' }
];

const form = document.getElementById('representativeForm');
const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('togglePassword');
const successMessage = document.getElementById('successMessage');

function showError(message, field) {
  alert(message); // Only one alert at a time
  field.focus();
  return false;
}

toggleButton.addEventListener('click', function () {
  const showing = passwordInput.type === 'text';
  passwordInput.type = showing ? 'password' : 'text';
  toggleButton.textContent = showing ? 'Show' : 'Hide';
  toggleButton.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  toggleButton.setAttribute('aria-pressed', String(!showing));
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  successMessage.hidden = true;
  const first = document.getElementById('firstName');
  const last = document.getElementById('lastName');
  const id = document.getElementById('repId');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const confirmation = document.getElementById('emailConfirmation');
  const transaction = document.getElementById('transaction');

  // REGEX validation: check fields in order and stop at the first error.
  if (!/^[A-Za-z][A-Za-z' -]*$/.test(first.value.trim())) return showError('Enter a valid first name.', first);
  if (!/^[A-Za-z][A-Za-z' -]*$/.test(last.value.trim())) return showError('Enter a valid last name.', last);
  if (!/^\d{4}$/.test(id.value.trim())) return showError('Representative ID must be exactly 4 digits.', id);
  if (!/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}(?:\s*(?:ext\.?|x)\s*\d{1,5})?$/i.test(phone.value.trim())) return showError('Enter a 10-digit phone number, optionally followed by an extension.', phone);
  if (!/^[^A-Za-z0-9\s][\S]{0,6}$/.test(passwordInput.value) || !/[A-Z]/.test(passwordInput.value) || !/\d/.test(passwordInput.value)) return showError('Password must be 1–7 characters, start with a special character, and contain an uppercase letter and a number.', passwordInput);
  if ((confirmation.checked || email.value.trim() !== '') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return showError('Enter a valid email address for confirmation.', email);
  if (transaction.value === '') return showError('Please select a transaction.', transaction);

  const rep = representatives.find(function (person) {
    return person.firstName.toLowerCase() === first.value.trim().toLowerCase() &&
      person.lastName.toLowerCase() === last.value.trim().toLowerCase() &&
      person.repId === id.value.trim() &&
      person.password === passwordInput.value &&
      person.phone === phone.value.trim() &&
      (!confirmation.checked || person.email.toLowerCase() === email.value.trim().toLowerCase());
  });
  if (!rep) return showError('Representative not found. Check your account information and try again.', id);
  successMessage.textContent = 'Welcome, ' + rep.firstName + ' ' + rep.lastName + '! Selected transaction: ' + transaction.value + '.';
  successMessage.hidden = false;
});

form.addEventListener('reset', function () {
  successMessage.hidden = true;
  passwordInput.type = 'password';
  toggleButton.textContent = 'Show';
  toggleButton.setAttribute('aria-label', 'Show password');
  toggleButton.setAttribute('aria-pressed', 'false');
});
