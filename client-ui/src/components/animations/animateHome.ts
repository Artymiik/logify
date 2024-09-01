import gsap from "gsap";

export const animateHome = () => {
  gsap.set(".logo", { opacity: 0, x: -40 });
  gsap.to(".logo", 0.4, {
    opacity: 1,
    x: 0,
  });

  gsap.set(".signin__header", { opacity: 0, x: 100 });
  gsap.to(".signin__header", 0.4, {
    opacity: 1,
    x: 0,
  });

  gsap.set(".el__mini__description", { opacity: 0, y: 40 });
  gsap.to(".el__mini__description", 0.4, {
    opacity: 1,
    y: 0,
  });

  gsap.set(".title__index", { opacity: 0, y: 40 });
  gsap.to(".title__index", 0.4, {
    opacity: 1,
    y: 0,
    delay: 0.15,
  });

  gsap.set(".description__index", { opacity: 0, y: 40 });
  gsap.to(".description__index", 0.4, {
    opacity: 1,
    y: 0,
    delay: 0.2,
  });

  gsap.set(".bottom__btn__blocks", { opacity: 0, y: 40 });
  gsap.to(".bottom__btn__blocks", 0.4, {
    opacity: 1,
    y: 0,
    delay: 0.25,
  });
};
