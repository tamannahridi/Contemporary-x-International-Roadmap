function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

function openTaskWindow(windowId) {
    document.querySelectorAll('.task-window').forEach(win => win.classList.add('hidden'));
    document.getElementById(windowId).classList.remove('hidden');
}

function closeTaskWindow(windowId, phaseId) {
    document.getElementById(windowId).classList.add('hidden');
    document.getElementById("home-page").classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
    showPage('cover-page');

    document.querySelectorAll(".locked").forEach(button => button.disabled = true);

    function checkCompletion(windowId, nextBtnId, nextPhaseId, isFinalPhase = false) {
        const checkboxes = document.querySelectorAll(`#${windowId} input[type="checkbox"]`);
        const nextButton = document.getElementById(nextBtnId);

        checkboxes.forEach(cb => cb.addEventListener("change", function() {
            const allChecked = [...checkboxes].every(cb => cb.checked);
            nextButton.disabled = !allChecked;
            nextButton.classList.toggle("locked", !allChecked);
        }));

        nextButton.addEventListener("click", function() {
            document.getElementById(windowId).classList.add("hidden");

            if (isFinalPhase) {
                // Hide all other pages and show only the congratulations page
                document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
                showPage('congrats-page');
            } else {
                document.getElementById(nextPhaseId).disabled = false;
                document.getElementById(nextPhaseId).classList.remove("locked");
            }
        });
    }

    checkCompletion("phase1-window", "phase1-next", "phase2-btn");
    checkCompletion("phase2-window", "phase2-next", "phase3-btn");
    checkCompletion("phase3-window", "phase3-next", "phase4-btn");
    checkCompletion("phase4-window", "phase4-next", "congrats-page", true); // This ensures the Congratulations page appears

    document.getElementById("phase1-btn").addEventListener("click", () => openTaskWindow("phase1-window"));
    document.getElementById("phase2-btn").addEventListener("click", () => openTaskWindow("phase2-window"));
    document.getElementById("phase3-btn").addEventListener("click", () => openTaskWindow("phase3-window"));
    document.getElementById("phase4-btn").addEventListener("click", () => openTaskWindow("phase4-window"));
});
