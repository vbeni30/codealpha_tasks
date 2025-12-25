function calculateAge() {
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');

    // Clear previous error
    errorMessage.textContent = '';

    // Validation
    if (!day || !month || !year) {
        errorMessage.textContent = 'Please fill in all fields';
        resultSection.classList.remove('show');
        return;
    }

    if (day < 1 || day > 31) {
        errorMessage.textContent = 'Day must be between 1 and 31';
        resultSection.classList.remove('show');
        return;
    }

    if (month < 1 || month > 12) {
        errorMessage.textContent = 'Month must be between 1 and 12';
        resultSection.classList.remove('show');
        return;
    }

    if (year < 1900 || year > new Date().getFullYear()) {
        errorMessage.textContent = `Year must be between 1900 and ${new Date().getFullYear()}`;
        resultSection.classList.remove('show');
        return;
    }

    // Create date objects
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    // Validate if date is valid
    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
        errorMessage.textContent = 'Please enter a valid date';
        resultSection.classList.remove('show');
        return;
    }

    // Check if birth date is in the future
    if (birthDate > today) {
        errorMessage.textContent = 'Birth date cannot be in the future';
        resultSection.classList.remove('show');
        return;
    }

    // Calculate age
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (ageDays < 0) {
        ageMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate();
    }

    // Adjust for negative months
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Calculate total days
    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((today - birthDate) / oneDay);
    const totalHours = totalDays * 24;

    // Calculate next birthday
    let nextBirthday = new Date(today.getFullYear(), month - 1, day);
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / oneDay);

    // Display results with animation
    displayResults(ageYears, ageMonths, ageDays, totalDays, totalHours, daysUntilBirthday);
}

function displayResults(years, months, days, totalDays, totalHours, daysUntilBirthday) {
    // Animate numbers
    animateNumber('years', years);
    animateNumber('months', months);
    animateNumber('days', days);
    
    // Update total values
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    document.getElementById('nextBirthday').textContent = `${daysUntilBirthday} days`;

    // Show result section
    document.getElementById('resultSection').classList.add('show');
}

function animateNumber(elementId, finalValue) {
    const element = document.getElementById(elementId);
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = finalValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), finalValue);
        element.textContent = current;

        if (step >= steps) {
            clearInterval(timer);
            element.textContent = finalValue;
        }
    }, duration / steps);
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
    });
});