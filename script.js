var userExplanations = {};
var selfRatings = {};

window.onload = function() {
var explainSection = document.getElementById("explain-section");

for (var skill in explainQuestions) {
(function(skill) {
var block = document.createElement("div");
block.className = "explain-block";

var questionText = document.createElement("p");
questionText.innerHTML = "<strong>" + skill + ":</strong> " + explainQuestions[skill];
block.appendChild(questionText);

var clearBtn = document.createElement("button");
clearBtn.type = "button";
clearBtn.className = "rate-btn";
clearBtn.innerHTML = "I can explain this clearly";

var struggleBtn = document.createElement("button");
struggleBtn.type = "button";
struggleBtn.className = "rate-btn";
struggleBtn.innerHTML = "I would struggle to explain this";

var textBox = document.createElement("textarea");
textBox.className = "explain-textbox";
textBox.placeholder = "Type your explanation here...";
textBox.style.display = "none";
textBox.rows = 3;

textBox.oninput = function() {
userExplanations[skill] = textBox.value;
};

clearBtn.onclick = function() {
selfRatings[skill] = "clear";
textBox.style.display = "block";
clearBtn.classList.add("selected");
struggleBtn.classList.remove("selected");
};

struggleBtn.onclick = function() {
selfRatings[skill] = "struggle";
textBox.style.display = "none";
struggleBtn.classList.add("selected");
clearBtn.classList.remove("selected");
};

block.appendChild(clearBtn);
block.appendChild(struggleBtn);
block.appendChild(textBox);
explainSection.appendChild(block);
})(skill);
}
};

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

var reviewHtml = "";
for (var i = 0; i < haveSkills.length; i++) {
var s = haveSkills[i];
if (selfRatings[s] === "struggle") {
reviewHtml += "<div class='project-suggestion' style='border-left-color:#f59e0b;'><strong>" + s + ":</strong> You noted you would struggle to explain this. Consider reviewing it before interviews.</div>";
} else if (selfRatings[s] === "clear" && userExplanations[s]) {
reviewHtml += "<div class='project-suggestion' style='border-left-color:#16a34a;'><strong>" + s + " - your explanation:</strong><br>" + userExplanations[s] + "<br><em>Review this honestly - would this satisfy a real interviewer?</em></div>";
}
}
if (reviewHtml !== "") {
output += "<h3>Honesty Check Review</h3>";
output += reviewHtml;
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
