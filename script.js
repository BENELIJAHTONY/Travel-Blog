document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const body = document.body

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme") || "light"
  body.classList.toggle("dark-mode", savedTheme === "dark")

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light"
    localStorage.setItem("theme", currentTheme)
  })

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active")
    document.body.classList.toggle("menu-open")

    // Transform hamburger to X
    this.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && !event.target.closest(".mobile-menu-btn")) {
      navMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })

  // Mobile Dropdown Toggle
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a")

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault()
        dropdown.classList.toggle("active")
      }
    })
  })

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (email) {
        // In a real implementation, you would send this to your backend
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // In a real implementation, you would send this to your backend
      alert("Thank you for your message! We will get back to you soon.")
      this.reset()
    })
  }

  // Comment Form Submission
  const commentForm = document.getElementById("comment-form")

  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // In a real implementation, you would send this to your backend
      alert("Thank you for your comment! It will appear after moderation.")
      this.reset()
    })
  }

  // Search Form Submission
  const searchForm = document.getElementById("search-form")

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const searchInput = this.querySelector("input")
      const searchTerm = searchInput.value.trim()

      if (searchTerm) {
        // In a real implementation, you would redirect to search results page
        alert(`Searching for: ${searchTerm}`)
      }
    })
  }

  // Reply Button Functionality
  const replyButtons = document.querySelectorAll(".reply-btn")

  replyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const commentForm = document.getElementById("comment-form")
      const commentNameInput = document.getElementById("comment-name")

      // Scroll to comment form
      commentForm.scrollIntoView({ behavior: "smooth" })

      // Focus on the name input
      setTimeout(() => {
        commentNameInput.focus()
      }, 500)
    })
  })

  // Lazy Loading Images
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]")

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Handle URL parameters for category pages
  if (window.location.pathname.includes("category.html")) {
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get("cat")

    if (category) {
      const categoryTitle = document.querySelector(".page-header h1")
      if (categoryTitle) {
        // Format the category name (replace hyphens with spaces and capitalize)
        const formattedCategory = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")

        categoryTitle.textContent = formattedCategory
      }
    }
  }
})
