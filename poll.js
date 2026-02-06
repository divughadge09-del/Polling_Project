// ================= ADMIN =================
function publishPoll() {
    const pollData = {
        question: document.getElementById("question").value,
        options: [
            opt1.value,
            opt2.value,
            opt3.value,
            opt4.value
        ]
    };

    if (!pollData.question || pollData.options.some(o => o === "")) {
        alert("Please fill all fields!");
        return;
    }

    localStorage.setItem("pollData", JSON.stringify(pollData));
    localStorage.removeItem("voted");

    alert("Poll published successfully ✅");
}

// ================= USER =================
function loadPoll() {
    const poll = JSON.parse(localStorage.getItem("pollData"));

    if (!poll) {
        document.getElementById("pollQuestion").innerText =
            "No poll published yet";
        return;
    }

    document.getElementById("pollQuestion").innerText = poll.question;

    const pollBox = document.getElementById("pollOptions");
    pollBox.innerHTML = "";

    poll.options.forEach((opt, i) => {
        pollBox.innerHTML += `
        <div class="poll-card">
            <input type="radio" name="poll" id="opt${i}">
            <label for="opt${i}">
                <h3>${opt}</h3>
                <div class="bar"></div>
            </label>
        </div>`;
    });
}

function submitPoll() {
    if (localStorage.getItem("voted")) {
        alert("You already voted!");
        return;
    }

    const selected = document.querySelector('input[name="poll"]:checked');
    if (!selected) {
        alert("Please select an option!");
        return;
    }

    localStorage.setItem("voted", "true");

    document.getElementById("pollPage").style.display = "none";
    document.getElementById("thankYouPage").style.display = "flex";
}

if (document.getElementById("pollOptions")) {
    loadPoll();
}
