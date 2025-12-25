const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save UID to sessionStorage for dashboard use
    sessionStorage.setItem("uid", user.uid);

    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
});
