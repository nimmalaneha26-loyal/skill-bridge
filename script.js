document.getElementById('check-btn').addEventListener('click', function () {
  // Get all checked skills
  const checkboxes = document.querySelectorAll('#skills-checklist input[type="checkbox"]:checked');
  const userSkills = Array.from(checkboxes).map(cb => cb.value);

  // Get selected role
  const selectedRole = document.getElementById('role-select').value;
  alert('Script file loaded!');
  const resultOutput = document.getElementById('result-output');

  // Validation
  if (!selectedRole) {
    resultOutput.innerHTML = '<p class="result-missing">Please select a target role first.</p>';
    return;
  }

  if (userSkills.length === 0) {
    resultOutput.innerHTML = '<p class="result-missing">Please select at least one skill you know.</p>';
    return;
  }

  // Find the role data
  const roleData = rolesData.find(role => role.title === selectedRole);

  if (!roleData) {
    resultOutput.innerHTML = '<p class="result-missing">Role data not found.</p>';
    return;
  }

  const requiredSkills = roleData.requiredSkills;

  // Compare skills
  const haveSkills = requiredSkills.filter(skill => userSkills.includes(skill));
  const missingSkills = requiredSkills.filter(skill => !userSkills.includes(skill));

  const readinessPercent = Math.round((haveSkills.length / requiredSkills.length) * 100);

  // Build the output HTML
  let output = `<h3>Target: ${selectedRole}</h3>`;
  output += `<p><strong>You're ${readinessPercent}% ready for this role.</strong></p>`;

  output += `<p class="result-good">✅ Skills you have:</p>`;
  if (haveSkills.length > 0) {
    output += `<ul>${haveSkills.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
  } else {
    output += `<p>None yet — but every expert started here.</p>`;
  }

  output += `<p class="result-missing">⚠️ Skills you're missing:</p>`;
  if (missingSkills.length > 0) {
    output += `<ul>${missingSkills.map(skill => `<li>${skill}</li>`).join('')}</ul>`;

    output += `<h3>🎯 Suggested Projects to Close the Gap</h3>`;
    missingSkills.forEach(skill => {
      const suggestion = skillProjectMap[skill];
      if (suggestion) {
        output += `<div class="project-suggestion"><strong>${skill}:</strong> ${suggestion}</div>`;
      }
    });
  } else {
    output += `<p>🎉 You already know every required skill for this role!</p>`;
  }

  resultOutput.innerHTML = output;
});
