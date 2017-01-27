const HASH = '#slide';
const slideRegex = /#slide=(\d+)/;

/**
 * Static class with methods to manipulate and extract infro from the hash of
 * the URL.
 */
export default class Hash {
  /**
   * Listens to the hashchange event and reacts to it by making the
   * WebSlide instance navigate to the needed slide.
   * @param {WebSlides} wsInstance
   */
  static init(wsInstance) {
    window.addEventListener('hashchange', () => {
      const newSlideIndex = Hash.getSlideNumber();

      if (newSlideIndex !== null) {
        wsInstance.goToSlide(newSlideIndex);
      }
    }, false);
  }

  /**
   * Gets the slide number from the hash by a regex matching `#slide=` and gets
   * the number after it. If the number is invalid or less than 0, it will
   * return null as an invalid value.
   * @return {?number}
   */
  static getSlideNumber() {
    let results = document.location.hash.match(slideRegex);
    let slide = 0;

    if (Array.isArray(results)) {
      slide = parseInt(results[1], 10);
    }

    if (!Number.isInteger(slide) || slide < 0 || !Array.isArray(results)) {
      slide = null;
    } else {
      slide--; // Convert to 0 index
    }

    return slide;
  }

  /**
   * It will update the hash (if it's different) so it reflects the slide
   * number being visible.
   * @param {number} number The number of the slide we're transitioning to.
   */
  static setSlideNumber(number) {
    if (Hash.getSlideNumber() !== (number - 1)) {
      history.pushState({
        slideI: number - 1
      }, `Slide ${number}`, `${HASH}=${number}`);
    }
  }
}
