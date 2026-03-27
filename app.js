// ====================
// Supabase Configuration
// ====================
const SUPABASE_URL = "https://bkrrlemabggghadqxvib.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9K9aBeGtUTZ__v1bTxRqqQ_leM3NjsL";

const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ====================
// Application State
// ====================
let isChatMinimized = false;
let sessionId = generateUUID();

// ====================
// DOM Elements - No Carousel Navigation
// ====================
const surveyForm = document.getElementById("surveyForm");
const progressBar = document.getElementById("progressBar");
const formStatus = document.getElementById("formStatus");

// ====================
// Chat DOM Elements
// ====================
const thermalSlider = document.getElementById("thermalSensation");
const thermalValue = document.getElementById("thermalValue");
const thermalLabel = document.getElementById("thermalLabel");
const glareSlider = document.getElementById("glareRating");
const glareValue = document.getElementById("glareValue");
const glareLabel = document.getElementById("glareLabel");
const concentrationSlider = document.getElementById("concentration");
const concentrationValue = document.getElementById("concentrationValue");
const concentrationLabel = document.getElementById("concentrationLabel");
const concentrationEmoji = document.getElementById("concentrationEmoji");
const productivitySlider = document.getElementById("productivity");
const productivityValue = document.getElementById("productivityValue");
const productivityLabel = document.getElementById("productivityLabel");
const productivityEmoji = document.getElementById("productivityEmoji");
const kssSlider = document.getElementById("kssScore");
const kssValue = document.getElementById("kssValue");
const kssLabel = document.getElementById("kssLabel");
const kssEmoji = document.getElementById("kssEmoji");
const moodButtons = document.querySelectorAll(".mood-btn");
const moodInput = document.getElementById("mood");
const chatWindow = document.getElementById("chatWindow");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMinimizeBtn = document.getElementById("chatMinimizeBtn");
const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatCloseWindowBtn = document.getElementById("chatCloseWindowBtn");
const satisfactionSliders = document.querySelectorAll(
  "#satOverall, #satPrivacy, #satLayout, #satAppearance, #satAirmove, #satClean, #satView"
);
const wellbeingSliders = document.querySelectorAll(
  "#who1, #who2, #who3, #who4, #who5"
);

// ====================
// Initialization
// ====================
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  // Thermal Slider
  thermalSlider.addEventListener("input", updateThermalDisplay);

  // Glare Slider
  glareSlider.addEventListener("input", updateGlareDisplay);

  // Concentration Slider
  concentrationSlider.addEventListener("input", updateConcentrationDisplay);

  // Productivity Slider
  productivitySlider.addEventListener("input", updateProductivityDisplay);

  // KSS Slider
  kssSlider.addEventListener("input", updateKSSDisplay);

  // Mood Buttons
  moodButtons.forEach((btn) => {
    btn.addEventListener("click", handleMoodClick);
  });

  // Satisfaction Sliders
  satisfactionSliders.forEach((slider) => {
    slider.addEventListener("input", updateSatisfactionDisplay);
  });

  // Well-being Sliders
  wellbeingSliders.forEach((slider) => {
    slider.addEventListener("input", updateWellbeingDisplay);
  });

  // Form Submission
  surveyForm.addEventListener("submit", handleFormSubmit);

  // Chat Functionality
  chatMinimizeBtn.addEventListener("click", minimizeChat);
  chatToggleBtn.addEventListener("click", maximizeChat);
  chatCloseWindowBtn.addEventListener("click", closeChat);
  chatForm.addEventListener("submit", handleChatSubmit);

  // Initial Updates
  updateThermalDisplay();
  updateGlareDisplay();
  updateConcentrationDisplay();
  updateProductivityDisplay();
  updateKSSDisplay();
  satisfactionSliders.forEach(updateSatisfactionDisplay);
  wellbeingSliders.forEach(updateWellbeingDisplay);
  updateProgressBar();
}

// ====================
// Thermal Comfort Handlers
// ====================
function updateThermalDisplay() {
  const value = parseInt(thermalSlider.value);
  thermalValue.textContent = value;

  let label = "";
  let bgColor = "";

  if (value < -2) {
    label = "Very Cold";
    bgColor = "rgb(0, 0, 139)";
  } else if (value === -2) {
    label = "Cold";
    bgColor = "rgb(0, 102, 204)";
  } else if (value === -1) {
    label = "Cool";
    bgColor = "rgb(135, 206, 250)";
  } else if (value === 0) {
    label = "Neutral";
    bgColor = "rgb(255, 165, 0)";
  } else if (value === 1) {
    label = "Warm";
    bgColor = "rgb(255, 140, 0)";
  } else if (value === 2) {
    label = "Hot";
    bgColor = "rgb(255, 69, 0)";
  } else {
    label = "Very Hot";
    bgColor = "rgb(178, 34, 34)";
  }

  thermalLabel.textContent = label;
  thermalSlider.style.background = `linear-gradient(to right, rgb(0, 0, 139), rgb(0, 102, 204), rgb(135, 206, 250), rgb(255, 165, 0), rgb(255, 140, 0), rgb(255, 69, 0), rgb(178, 34, 34))`;
  thermalSlider.style.backgroundSize = "100% 100%";
}

// ====================
// Visual Comfort (Glare) Handlers
// ====================
function updateGlareDisplay() {
  const value = parseInt(glareSlider.value);
  glareValue.textContent = value;

  const labels = ["", "None (1)", "Slight (2)", "Moderate (3)", "Severe (4)", "Intolerable (5)"];
  glareLabel.textContent = labels[value];

  glareSlider.style.background = `linear-gradient(to right, rgb(34, 139, 34), rgb(144, 238, 144), rgb(255, 255, 0), rgb(255, 165, 0), rgb(255, 69, 0))`;
  glareSlider.style.backgroundSize = "100% 100%";
}

// ====================
// Concentration Handlers
// ====================
function updateConcentrationDisplay() {
  const value = parseInt(concentrationSlider.value);
  concentrationValue.textContent = value;

  const emoji = getProgressEmoji(value, 10);
  concentrationEmoji.textContent = emoji;

  let label = "";
  if (value <= 2) label = "Very Low";
  else if (value <= 4) label = "Low";
  else if (value <= 6) label = "Moderate";
  else if (value <= 8) label = "High";
  else label = "Very High";

  concentrationLabel.textContent = label;
  concentrationSlider.style.background = `linear-gradient(to right, #FF9500, #C85A99)`;
  concentrationSlider.style.backgroundSize = "100% 100%";
}

// ====================
// Productivity Handlers
// ====================
function updateProductivityDisplay() {
  const value = parseInt(productivitySlider.value);
  productivityValue.textContent = value;

  const emoji = getProgressEmoji(value, 10);
  productivityEmoji.textContent = emoji;

  let label = "";
  if (value <= 2) label = "Very Low";
  else if (value <= 4) label = "Low";
  else if (value <= 6) label = "Moderate";
  else if (value <= 8) label = "High";
  else label = "Very High";

  productivityLabel.textContent = label;
  productivitySlider.style.background = `linear-gradient(to right, #FF9500, #C85A99)`;
  productivitySlider.style.backgroundSize = "100% 100%";
}

// ====================
// KSS (Energy Level) Handlers
// ====================
function updateKSSDisplay() {
  const value = parseInt(kssSlider.value);
  kssValue.textContent = value;

  const emoji = getKSSEmoji(value);
  kssEmoji.textContent = emoji;

  const labels = [
    "",
    "Alert",
    "More Alert",
    "Alert & Focused",
    "Fairly Alert",
    "Neither Alert nor Sleepy",
    "Some Sleepiness",
    "Sleepy (Fighting it)",
    "Very Sleepy",
    "Can't Keep Eyes Open",
  ];
  kssLabel.textContent = labels[value];

  const dayProgress = ((value - 1) / 8) * 100;
  kssSlider.style.background = `linear-gradient(to right, #FFD700, #FFA500, #FF6347)`;
  kssSlider.style.backgroundSize = "100% 100%";
}

function getKSSEmoji(value) {
  const emojis = ["", "😃", "😊", "🙂", "😐", "😑", "😴", "😪", "😴", "😵"];
  return emojis[value] || "😐";
}

function getProgressEmoji(value, max) {
  if (value <= max * 0.2) return "😞";
  if (value <= max * 0.4) return "😕";
  if (value <= max * 0.6) return "😐";
  if (value <= max * 0.8) return "😊";
  return "🤩";
}

// ====================
// Mood Selection Handlers
// ====================
function handleMoodClick(e) {
  e.preventDefault();
  moodButtons.forEach((btn) => btn.classList.remove("selected"));
  e.target.classList.add("selected");
  moodInput.value = e.target.dataset.mood;
  updateProgressBar();
}

// ====================
// Satisfaction Sliders
// ====================
function updateSatisfactionDisplay() {
  satisfactionSliders.forEach((slider) => {
    const value = slider.value;
    const valueSpan = document.getElementById(slider.id + "Val");
    if (valueSpan) {
      valueSpan.textContent = value;
      slider.style.background = `linear-gradient(to right, #FF9500, #C85A99)`;
      slider.style.backgroundSize = "100% 100%";
    }
  });
  updateProgressBar();
}

// ====================
// Well-being Sliders
// ====================
function updateWellbeingDisplay() {
  wellbeingSliders.forEach((slider) => {
    const value = slider.value;
    const valueSpan = document.getElementById(slider.id + "Val");
    if (valueSpan) {
      valueSpan.textContent = value;
      slider.style.background = `linear-gradient(to right, #FF9500, #C85A99)`;
      slider.style.backgroundSize = "100% 100%";
    }
  });
  updateProgressBar();
}

// ====================
// Progress Bar Update
// ====================
function updateProgressBar() {
  const totalFields = 50;
  let filledFields = 0;

  // Check if essential fields are filled
  if (txt("room")) filledFields++;
  if (num("thermalSensation") !== undefined) filledFields++;
  if (txt("brightness")) filledFields++;
  if (txt("mood")) filledFields++;
  if (num("concentration") !== undefined) filledFields++;
  if (num("productivity") !== undefined) filledFields++;
  if (num("kssScore") !== undefined) filledFields++;
  if (txt("satOverall")) filledFields++;
  if (txt("who1")) filledFields++;
  if (txt("watchBrand")) filledFields++;

  // Add optional fields that are filled
  if (txt("userId")) filledFields++;
  if (txt("thermalNotes")) filledFields++;
  if (txt("visualNotes")) filledFields++;
  if (txt("feelingNotes")) filledFields++;
  if (txt("satisfactionNotes")) filledFields++;

  const percentage = Math.round((filledFields / totalFields) * 100);
  progressBar.style.width = percentage + "%";
  formStatus.textContent =
    "Form " + percentage + "% complete · " + filledFields + " of " + totalFields + " key fields";
}

// ====================
// Form Submission
// ====================
async function handleFormSubmit(e) {
  e.preventDefault();

  // Gather all form data
  const payload = {
    session_id: sessionId,
    timestamp: new Date().toISOString(),

    // Location
    room: txt("room") || null,
    user_id: txt("userId") || null,
    grid_number: num("gridNumber") || null,

    // Thermal Comfort
    thermal_sensation: num("thermalSensation") || null,
    thermal_preference: txt("thermalPreference") || null,
    air_movement: txt("airMovement") || null,
    thermal_notes: txt("thermalNotes") || null,

    // Visual Comfort
    brightness: txt("brightness") || null,
    glare_rating: num("glareRating") || null,
    glare_task_affected: checked("taskAffected"),
    visual_notes: txt("visualNotes") || null,

    // Mood
    mood: txt("mood") || null,
    mood_other: txt("moodOther") || null,
    feeling_notes: txt("feelingNotes") || null,

    // Performance
    concentration: num("concentration") || null,
    productivity: num("productivity") || null,

    // Energy Level
    kss_score: num("kssScore") || null,

    // Symptoms
    symptom_wheezing: checked("symptom01"),
    symptom_shortness_breath: checked("symptom02"),
    symptom_cough: checked("symptom03"),
    symptom_runny_nose: checked("symptom04"),
    symptom_watery_eyes: checked("symptom05"),
    symptom_dry_throat: checked("symptom06"),
    symptom_musty_smell: checked("symptom07"),
    symptom_headache: checked("symptom08"),
    symptom_temp_discomfort: checked("symptom09"),
    symptom_mood_concentration: checked("symptom10"),
    symptom_notes: txt("symptomNotes") || null,

    // Satisfaction (7 items)
    sat_overall: num("satOverall") || null,
    sat_privacy: num("satPrivacy") || null,
    sat_layout: num("satLayout") || null,
    sat_appearance: num("satAppearance") || null,
    sat_airmove: num("satAirmove") || null,
    sat_clean: num("satClean") || null,
    sat_view: num("satView") || null,
    satisfaction_notes: txt("satisfactionNotes") || null,

    // Well-Being (WHO-5)
    who1_cheerful: num("who1") || null,
    who2_calm: num("who2") || null,
    who3_vigorous: num("who3") || null,
    who4_fresh: num("who4") || null,
    who5_interesting: num("who5") || null,

    // Wearable Data
    uses_smartwatch: checked("usesSmartwatch"),
    watch_brand: txt("watchBrand") || null,
    heart_rate: num("heartRate") || null,
    hrv_ms: num("hrvMs") || null,
    stress_level: num("stressLevel") || null,
    wrist_temp_delta: parseFloat(document.getElementById("wristTempDelta").value) || null,
    sleep_hours: parseFloat(document.getElementById("sleepHours").value) || null,
  };

  // Insert into Supabase
  const { data, error } = await supabase
    .from("comfort_survey")
    .insert([payload]);

  if (error) {
    console.error("Error inserting data:", error);
    alert("Error submitting survey. Please try again.");
    addChatMessage(
      "assistant",
      "Sorry, there was an error submitting your survey. Please try again."
    );
  } else {
    console.log("Survey submitted successfully!", data);
    alert("Survey submitted! Thank you for your feedback.");
    addChatMessage(
      "assistant",
      "Thank you for sharing your comfort feedback! This data helps us improve the building environment."
    );
    // Reset form
    // surveyForm.reset();
    // updateProgressBar();
  }
}

// ====================
// Chat Functionality
// ====================
function minimizeChat() {
  chatWindow.style.display = "none";
  chatToggleBtn.style.display = "block";
  isChatMinimized = true;
}

function maximizeChat() {
  chatWindow.style.display = "flex";
  chatToggleBtn.style.display = "none";
  isChatMinimized = false;
  chatInput.focus();
}

function closeChat() {
  chatWindow.style.display = "none";
  chatToggleBtn.style.display = "none";
}

function handleChatSubmit(e) {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  // User message
  addChatMessage("user", escapeHtml(message));

  // Clear input
  chatInput.value = "";

  // Simulated assistant response
  setTimeout(() => {
    const responses = [
      "Thanks for sharing! Your feedback is valuable.",
      "I understand. The building team will review your input.",
      "That's helpful to know. We're always making improvements.",
      "Your comfort matters to us!",
      "I'll make sure this gets to the facilities team.",
    ];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    addChatMessage("assistant", randomResponse);
  }, 500);
}

function addChatMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerHTML = text;

  messageDiv.appendChild(bubble);
  chatMessages.appendChild(messageDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ====================
// Helper Functions
// ====================
function num(id) {
  const val = document.getElementById(id).value;
  return val ? parseFloat(val) : null;
}

function txt(id) {
  return document.getElementById(id).value || null;
}

function checked(id) {
  return document.getElementById(id).checked;
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
