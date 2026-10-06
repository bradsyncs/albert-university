document.addEventListener("DOMContentLoaded", () => {
  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const tryoutForm = document.getElementById("tryoutForm");
  const formMessage = document.getElementById("formMessage");

  if (tryoutForm) {
    tryoutForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = tryoutForm.querySelector("button[type='submit']");

      submitButton.disabled = true;
      submitButton.textContent = "SUBMITTING...";

      const formData = new FormData(tryoutForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/tryout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to submit application.");
        }

        formMessage.textContent = result.message;
        formMessage.className = "form-message success";

        tryoutForm.reset();
      } catch (error) {
        formMessage.textContent =
          error.message || "Something went wrong. Please try again.";

        formMessage.className = "form-message error";
      }

      submitButton.disabled = false;
      submitButton.textContent = "SUBMIT TRYOUT APPLICATION";
    });
  }
});