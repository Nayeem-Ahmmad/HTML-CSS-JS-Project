const uid = sessionStorage.getItem("uid");

if (!uid) {
  window.location.href = "index.html";
} else {
  db.collection("users").doc(uid).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("username").innerText = data.name;
        document.getElementById("useremail").innerText = data.email;
      }
    });
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
  auth.signOut().then(() => {
    sessionStorage.removeItem("uid");
    window.location.href = "index.html";
  });
});
