document.getElementById("check-btn").addEventListener("click", function() {
var checkboxes = document.querySelectorAll("#skills-checklist input[type=checkbox]:checked");
var userSkills = [];
for (var i = 0; i < checkboxes.length; i++) {
userSkills.push(checkboxes[i].value);
}

var selectedRole = document.getElementById("role-select").value;
var resultOutput = document.getElementById("result-output");

if (selectedRole === "") {
resultOutput.innerHTML = "<p class='result-missing'>Please select a target role first.</p>";
return;
}

if (userSkills.length === 0) {
resultOutput.innerHTML = "<p class='result-missing'>Please select at least one skill you know.</p>";
return;
}

var roleData = null;
for (var i = 0; i < rolesData.length; i++) {
if (rolesData[i].title === selectedRole) {
roleData = rolesData[i];
break;
}
}

if (roleData === null) {
resultOutput.innerHTML = "<p class='result-missing'>Role data not found.</p>";
return;
}

var requiredSkills = roleData.requiredSkills;
var haveSkills = [];
var missingSkills = [];

for (var i = 0; i < requiredSkills.length; i++) {
var skill = requiredSkills[i];
var found = false;
for (var j = 0; j < userSkills.length; j++) {
if (userSkills[j] === skill) {
found = true;
break;
}
}
if (found) {
haveSkills.push(skill);
} else {
missingSkills.push(skill);
}
}

var readinessPercent = Math.round((haveSkills.length / requiredSkills.length) * 100);

var output = "<h3>Target: " + selectedRole + "</h3>";
output += "<p><strong>You are " + readinessPercent + "% ready for this role.</strong></p>";

var friendlyText = roleData.fresherFriendly ? "Yes" : "Usually needs experience";
output += "<p><strong>Fresher-friendly:</strong> " + friendlyText + "</p>";
output += "<p>" + roleData.experienceNote + "</p>";

output += "<p class='result-good'>Skills you have:</p>";
if (haveSkills.length > 0) {
output += "<ul>";
for (var i = 0; i < haveSkills.length; i++) {
output += "<li>" + haveSkills[i] + "</li>";
}
output += "</ul>";
} else {
output += "<p>None yet, but every expert started here.</p>";
}

output += "<p class='result-missing'>Skills you are missing:</p>";
if (missingSkills.length > 0) {
output += "<ul>";
for (var i = 0; i < missingSkills.length; i++) {
output += "<li>" + missingSkills[i] + "</li>";
}
output += "</ul>";

output += "<h3>Suggested Projects to Close the Gap</h3>";
for (var i = 0; i < missingSkills.length; i++) {
var s = missingSkills[i];
if (skillProjectMap[s]) {
output += "<div class='project-suggestion'><strong>" + s + ":</strong> " + skillProjectMap[s] + "</div>";
}
}
} else {
output += "<p>You already know every required skill for this role!</p>";
}

resultOutput.innerHTML = output;
});
