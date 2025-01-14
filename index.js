window.onload = function () {
  // Cache selectors
  const elements = {
    nightImage: document.getElementById("night-image"),
    dayImage: document.getElementById("day-image"),
    palmLeft: document.getElementById("palm-left"),
    palmRight: document.getElementById("palm-right"),
    logoImage: document.getElementById("logo-image"),
    categoryContainers: gsap.utils.toArray(".category-container"),
    exploreText: document.getElementById("explore-text"),
  };

  // Store palm trees for animation
  const palmTrees = [elements.palmLeft, elements.palmRight];

  initializeAnimations();

  function initializeAnimations() {
    // Set initial opacity for day/night transition
    gsap.set(elements.dayImage, { opacity: 0 });

    // Set initial state for category containers and explore text
    gsap.set(elements.categoryContainers, { opacity: 0 }); // Hide categories initially
    gsap.set(elements.exploreText, { opacity: 0 }); // Hide explore text initially
    gsap.set(elements.exploreText, { color: "black" }); // Set explore text to black initially

    // Day/Night Transition
    gsap
      .timeline()
      .to(elements.nightImage, {
        opacity: 0,
        duration: 3,
        ease: "power2.inOut",
      })
      .to(
        elements.dayImage,
        {
          opacity: 1,
          duration: 3,
          ease: "power2.inOut",
        },
        "<"
      );

    // GSAP animation for logo
    gsap.to(elements.logoImage, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power2.inOut",
    });

    // GSAP timeline for palm tree and category animations
    const tl = gsap.timeline({ delay: 1 }); // Start after 1 second

    tl.fromTo(
      palmTrees,
      {
        xPercent: (i, target) => {
          return target.id === "palm-left" ? -150 : 150;
        },
        opacity: 0,
        scale: 0.6,
        rotationY: (i, target) => {
          return target.id === "palm-left" ? -80 : 80;
        },
        transformOrigin: "center bottom",
        yPercent: (i, target) => {
          return target.id === "palm-left" ? 0 : -10;
        },
      },
      {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 2.5,
        ease: "elastic.out(1, 0.7)",
        stagger: 0.2,
        delay: 0.3, // Add 0.3s delay to palm tree animation
      }
    )
      .to(
        palmTrees,
        {
          rotation: (i, target) => {
            return target.id === "palm-left" ? -2 : 2;
          },
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        ">-0.5"
      )
      // Animate "Explore Our Collection" text with categories
      .fromTo(
        elements.exploreText,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1, // Adjust duration as needed
          ease: "power2.out",
        },
        "<" // Start with the category animation
      )
      // GSAP animation for category items entrance - Slide Up with Bounce
      .fromTo(
        elements.categoryContainers,
        {
          y: 50, // Start below their normal position
          opacity: 0,
        },
        {
          y: 0, // Move to their normal position
          opacity: 1,
          duration: 1, // Adjust duration as needed
          ease: "back.out(1.7)", // Use a back easing for the bounce effect
          stagger: 0.1,
        },
        "<" // Starts with the palm tree animation
      );
  }
};
