// Declare addItem in global scope so it can be accessed from HTML
window.addItem = null

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Simulate loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }
  }, 1500)

  // Auth Modal Functionality
  const profileIcon = document.getElementById("profileIcon")
  const authModal = document.getElementById("authModal")
  const closeAuthModal = document.getElementById("closeAuthModal")
  const authTabs = document.querySelectorAll(".auth-tab")

  // Open auth modal when profile icon is clicked
  profileIcon.addEventListener("click", () => {
    authModal.classList.add("active")
  })

  // Close auth modal when close button is clicked
  closeAuthModal.addEventListener("click", () => {
    authModal.classList.remove("active")
  })

  // Close auth modal when clicking outside the modal
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      authModal.classList.remove("active")
    }
  })

  // Tab switching functionality
  authTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and forms
      document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"))
      document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Show corresponding form
      const formId = this.getAttribute("data-tab") + "Form"
      document.getElementById(formId).classList.add("active")
    })
  })

  // Todo list functionality
  const inputData = document.getElementById("inputData")
  const content = document.getElementById("content")

  // Define addItem function and make it globally accessible
  window.addItem = () => {
    if (inputData.value.trim() !== "") {
      const li = document.createElement("li")
      li.textContent = inputData.value

      const deleteIcon = document.createElement("i")
      deleteIcon.className = "fas fa-trash-alt"
      deleteIcon.addEventListener("click", () => {
        li.remove()
      })

      li.appendChild(deleteIcon)
      content.appendChild(li)

      // Clear input
      inputData.value = ""
      inputData.focus()

      // Add click event to toggle done state
      li.addEventListener("click", function (e) {
        if (e.target !== deleteIcon) {
          this.classList.toggle("done")
        }
      })
    }
  }

  // Add event listener for Enter key in the input field
  if (inputData) {
    inputData.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        window.addItem()
      }
    })
  }
})

