document.getElementById('check-btn').addEventListener('click', function () {
  const checkboxes = document.querySelectorAll('#skills-checklist input[type="checkbox"]:checked');
  const userSkills = Array.from(checkboxes).map(function (cb) {
    return cb.value;
  });

  const selectedRole = document.getElementById('role-select').value;
  const resultOutput = document.getElementById('result-output');

  if (!selectedRole) {
    resultOutput.innerHTML = '<p class="result-missing">Please select a target role first.</p>';
    return;
  }

  if (userSkills.length === 0) {
    resultOutput.innerHTML = '<p class="result-missing">Please select at least one skill you know.</p>';
    return;
  }

  const roleData = rolesData.find(function (role) {
    return role.title === selectedRole;
  });

  if (!roleData) {
    resultOutput.innerHTML = '<p class="result-missing">Role data not found.</p>';
    return;
  }

  const requiredSkills = roleData.requiredSkills;

  const haveSkills = requiredSkills.filter(function (skill) {
    return userSkills.indexOf(skill) !== -1;
  });

  const missingSkills = requiredSkills.filter(function (skill) {
    return userSkills.indexOf(skill) === -1;
  });

  const readinessPercent = Math.round((haveSkills.length / requiredSkills.length) * 100);

  let output = '<h3>Target: ' + selectedRole + '</h3>';
  output += '<p><strong>You are ' + readinessPercent + '% ready for this role.</strong></p>';

  const friendlyText = roleData.fresherFriendly ? 'Yes' : 'Usually needs experience';
  output += '<p><strong>Fresher-friendly:</strong> ' + friendlyText + '</p>';
  output += '<p class="experience-note">' + roleData.experienceNote + '</p>';

  output += '<p class="result-good">Skills you have:</p>';
  if (haveSkills.length > 0) {
    output += '<ul>';
    for (let i = 0; i < haveSkills.length; i++) {
      output += '<li>' + haveSkills[i] + '</li>';
    }
    output += '</ul>';
  } else {
    output += '<p>None yet, but every expert started here.</p>';
  }

  output += '<p class="result-missing">Skills you are missing:</p>';
  if (missingSkills.length > 0) {
    output += '<ul>';
    for (let i = 0; i < missingSkills.length; i++) {
      output += '<li>' + missingSkills[i] + '</li>';
    }
    output += '</ul>';

    output += '<h3>Suggested Projects to Close the Gap</h3>';
    for (let i = 0; i < missingSkills.length; i++) {
      const skill = missingSkills[i];
      const suggestion = skillProjectMap[skill];
      if (suggestion) {
        output += '<div class="project-suggestion"><strong>' + skill + ':</strong> ' + suggestion + '</div>';
      }
    }
  } else {
    output += '<p>You already know every required skill for this role!</p>';
  }

  resultOutput.innerHTML = output;
});
                                                      
