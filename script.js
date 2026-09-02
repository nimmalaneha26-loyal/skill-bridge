var selfRatings = {};

window.onload = function() {
var explainSection = document.getElementById("explain-section");

for (var skill in explainQuestions) {
var block = document.createElement("div");
block.className = "explain-block";

var questionText = document.createElement("p");
questionText.innerHTML = "<strong>" + skill + ":</strong> " + explainQuestions[skill];
block.appendChild(questionText);

var clearBtn = document.createElement("button");
clearBtn.type = "button";
clearBtn.className = "rate-btn";
clearBtn.innerHTML = "I can explain this clearly";
clearBtn.setAttribute("data-skill", skill);
clearBtn.onclick = function() {
var s = this.getAttribute("data-skill");
selfRatings[s] = "clear";
highlightSelected(this);
};

var struggleBtn = document.createElement("button");
struggleBtn.type = "button";
struggleBtn.className = "rate-btn";
struggleBtn.innerHTML = "I would struggle to explain this";
struggleBtn.setAttribute("data-skill", skill);
struggleBtn.onclick = function() {
var s = this.getAttribute("data-skill");
selfRatings[s] = "struggle";
highlightSelected(this);
};

block.appendChild(clearBtn);
block.appendChild(struggleBtn);
explainSection.appendChild(block);
}
};

function highlightSelected(clickedBtn) {
var skill = clickedBtn.getAttribute("data-skill");
var siblingButtons = document.querySelectorAll(".rate-btn[data-skill='" + skill + "']");
for (var i = 0; i < siblingButtons.length; i++) {
siblingButtons[i].classList.remove("selected");
}
clickedBtn.classList.add("selected");
}

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

var struggledSkills = [];
for (var i = 0; i < haveSkills.length; i++) {
if (selfRatings[haveSkills[i]] === "struggle") {
struggledSkills.push(haveSkills[i]);
}
}

if (struggledSkills.length > 0) {
output += "<div class='project-suggestion' style='border-left-color:#f59e0b;'><strong>Honesty Check:</strong> You marked ";
for (var i = 0; i < struggledSkills.length; i++) {
output += struggledSkills[i];
if (i < struggledSkills.length - 1) {
output += ", ";
}
}
output += " as known, but noted you would struggle to explain " + (struggledSkills.length > 1 ? "these" : "this") + " clearly. Consider reviewing before interviews.</div>";
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
