document.addEventListener("DOMContentLoaded", () => {
  // Navigation menu toggle
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("active")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    // Burger Animation
    burger.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target)
    const isClickOnBurger = burger.contains(event.target)

    if (nav.classList.contains("active") && !isClickInsideNav && !isClickOnBurger) {
      nav.classList.remove("active")
      burger.classList.remove("active")

      navLinks.forEach((link) => {
        link.style.animation = ""
      })
    }
  })

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        burger.classList.remove("active")

        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }
    })
  })

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "scale(1)"
          }, 10)
        } else {
          card.style.opacity = "0"
          card.style.transform = "scale(0.8)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Project Modal
  const modal = document.querySelector(".project-modal")
  const modalContent = document.querySelector(".modal-body")
  const closeModal = document.querySelector(".close-modal")
  const projectDetailsBtns = document.querySelectorAll(".project-details-btn")

  projectDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectCard = btn.closest(".project-card")
      const projectTitle = projectCard.querySelector("h3").textContent
      const projectDesc = projectCard.querySelector("p").textContent
      const projectImg = projectCard.querySelector("img").src
      const projectTags = projectCard.querySelector(".project-tags").innerHTML

      // Create modal content
      modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${projectTitle}</h2>
                </div>
                <div class="modal-img">
                    <img src="${projectImg}" alt="${projectTitle}">
                </div>
                <div class="modal-desc">
                    <h3>Description</h3>
                    <p>${projectDesc}</p>
                    <h3>Technologies utilisées</h3>
                    <div class="project-tags">
                        ${projectTags}
                    </div>
                    <h3>Fonctionnalités</h3>
                    <ul>
                        <li>Fonctionnalité 1</li>
                        <li>Fonctionnalité 2</li>
                        <li>Fonctionnalité 3</li>
                    </ul>
                    <h3>Défis et solutions</h3>
                    <p>Description des défis rencontrés lors du développement de ce projet et des solutions mises en œuvre pour les surmonter.</p>
                </div>
            `

      // Show modal
      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Simple validation
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      formStatus.textContent = "Veuillez remplir tous les champs."
      formStatus.className = "error"
      return
    }

    // Simulate form submission
    formStatus.textContent = "Envoi en cours..."
    formStatus.className = ""
    formStatus.style.display = "block"

    // Simulate API call
    setTimeout(() => {
      formStatus.textContent = "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais."
      formStatus.className = "success"
      contactForm.reset()
    }, 1500)
  })

  // Scroll animation for sections
  const sections = document.querySelectorAll("section")

  function checkSections() {
    const triggerBottom = window.innerHeight * 0.8

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top

      if (sectionTop < triggerBottom) {
        section.classList.add("show")
      }
    })
  }

  // Initial check
  checkSections()

  // Check on scroll
  window.addEventListener("scroll", checkSections)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isDarkMode = document.body.classList.contains("dark-mode")

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    // Update scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop

    // Add shadow when scrolled and apply appropriate background color based on theme
    if (scrollTop > 50) {
      header.style.boxShadow = isDarkMode ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)"
      header.style.background = isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"
    } else {
      header.style.boxShadow = "none"
      header.style.background = isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"
    }
  })

  // Mode sombre toggle
  const darkModeToggle = document.getElementById("darkmode-toggle")

  // Vérifier si le mode sombre est déjà activé dans le localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode")
    darkModeToggle.checked = true
  }

  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("darkMode", "enabled")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("darkMode", "disabled")
    }
    updateHeaderStyle() // Mettre à jour le style du header après le changement de thème
  })
})

// Ajouter également cette fonction pour mettre à jour le header lorsque le mode sombre est activé/désactivé
function updateHeaderStyle() {
  const isDarkMode = document.body.classList.contains("dark-mode")
  const header = document.querySelector("header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 50) {
    header.style.boxShadow = isDarkMode ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)"
  }

  header.style.background = isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"
}

// Appeler updateHeaderStyle au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderStyle()
  // Le reste du code DOMContentLoaded existant...
})
