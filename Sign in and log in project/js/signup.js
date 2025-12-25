const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Firebase Auth create user
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save user info in Firestore
    await db.collection("users").doc(user.uid).set({
      name: name,
      email: email
    });

    alert("Signup successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});
