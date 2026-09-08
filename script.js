document.querySelectorAll(".next-btn").forEach(function(btn) {
btn.addEventListener("click", function() {
var next = this.getAttribute("data-next");
document.querySelectorAll(".step").forEach(function(s) { s.classList.remove("active"); });
document.getElementById("step-" + next).classList.add("active");
document.getElementById("step-indicator").textContent = "Step " + next + " of 4";
});
});

document.querySelectorAll(".back-btn").forEach(function(btn) {
btn.addEventListener("click", function() {
var back = this.getAttribute("data-back");
document.querySelectorAll(".step").forEach(function(s) { s.classList.remove("active"); });
document.getElementById("step-" + back).classList.add("active");
document.getElementById("step-indicator").textContent = "Step " + back + " of 4";
});
});

document.getElementById("check-btn").addEventListener("click", function() {
document.querySelectorAll(".step").forEach(function(s) { s.classList.remove("active"); });
document.getElementById("step-4").classList.add("active");
document.getElementById("step-indicator").textContent = "Step 4 of 4";
});
