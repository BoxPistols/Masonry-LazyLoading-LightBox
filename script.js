document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid")
  var msnry
  var lazyloadImages = document.querySelectorAll("img.lazy")
  var lazyloadThrottleTimeout

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout)
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset
      lazyloadImages.forEach(function (img, index) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src
          img.onload = function () {
            img.classList.remove("lazy")
            msnry.layout()
          }
          lazyloadImages = Array.prototype.filter.call(
            lazyloadImages,
            function (image, i) {
              return i !== index
            }
          )
        }
      })
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload)
        window.removeEventListener("resize", lazyload)
        window.removeEventListener("orientationChange", lazyload)
      }
    }, 20)
  }

  document.addEventListener("scroll", lazyload)
  window.addEventListener("resize", lazyload)
  window.addEventListener("orientationChange", lazyload)

  imagesLoaded(grid, function () {
    msnry = new Masonry(grid, {
      itemSelector: ".grid-item",
      columnWidth: 300,
      gutter: 16,
      fitWidth: true,
    })
    lazyload()
  })
})

// window.lightbox = lightbox;

// window.lightbox.option({
//   disableScrolling: true,
//   fadeDuration: 200,
//   //other
//   albumLabel: "ギャラリー： %1 of %2",
//   disableScrolling: false,
//   fadeDuration: 600,
//   fitImagesInViewport: true,
//   imageFadeDuration: 600,
//   maxWidth: 400,
//   maxHeight: 400,
//   alwaysShowNavOnTouchDevices: false,
//   positionFromTop: 50,
//   resizeDuration: 700,
//   showImageNumberLabel: true,
//   wrapAround: false
// });
