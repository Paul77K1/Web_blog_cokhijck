/**
* Template Name: Green - v4.10.0
* Template URL: https://bootstrapmade.com/green-free-one-page-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });
      portfolioIsotope.arrange({ filter: '.filter-han' });
      portfolioIsotope.layout();
      
      let portfolioFilters = select('#portfolio-flters li', true);
     
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()
function changeText(filterItem) {
  console.log(filterItem);
  if (filterItem === 'han'){
    document.getElementById("activity").innerHTML = "Với nhiều năm kinh nghiệm học tập và làm việc tại nhật bản, Công Ty TNHH Cơ Khí JCK của chúng tôi không ngừng đào tạo, cải tiến, nâng cao và học hỏi để tạo ra những đường hàn chất lượng và đẹp mắt trong từng sản phẩm, Công Ty chúng tôi chuyên Hàn bồn vi sinh, bồn hóa chất, bồn chứa nước, bồn nấu gia nhiệt ,bồn trộn, bồn khí, ngoài ra chúng tôi còn Hàn các đường ống dẫn khí ,dẫn nước và nhiều sản phẩm khung, kệ inox cũng như cacbon trong nhiều lĩnh vực cơ khí... với những sản phẩm cũng như đường hàn của chúng tôi tạo ra, khách hàng luôn nhận được sự hài lòng nhất từ phía  Công Ty chúng tôi .";
  }
  else if (filterItem === 'bong'){
    document.getElementById("activity").innerHTML = "Trong quá trình gia công và chế tạo các bề mặt inox thường hay bị trầy xước và không đồng bộ bề mặt với nhau, thì giải pháp đánh bóng và xử lý các bề mặt được tạo ra để tăng thêm tính thẩm mỹ cho sản phẩm, tùy theo nhu cầu của khách hàng và độ bóng khác nhau như đánh bóng 2 line và độ bóng như gương (#400) với đội ngũ nhân viên tay nghề cao, Công Ty chúng tôi luôn đào tạo và  đặt ra quy trình đánh bóng  khắc khe nhất để tạo  những sản phẩm đẹp và sắc nét nhất, đáp ứng được sự hài lòng từ khách hàng khó tính nhất, hãy liên hệ Công Ty TNHH Cơ Khí JCK để được tư vấn và hỗ trợ tận tình nhất .";
  }
  else if (filterItem === 'ong'){
    document.getElementById("activity").innerHTML = "Ngoài nhận thi công các đường ống tại nhà xưởng, chúng tôi còn nhận thi công và lắp đặt các đường ống ngoài công trình như Inox 304, Inox 316, Cabon, ống nhựa PPR, cũng như các đường ống chịu áp lực ...nhằm kết nối lại các hệ thống lại với nhau sao cho hoàn chỉnh, Công Ty chúng tôi không ngừng trau dồi và học hỏi luôn tìm ra giải pháp tối ưu nhất nhằm cắt giảm những chi phí không cần thiết cho khách hàng, với nhiều năm kinh nghiệm thi công đường cho các Công Ty nước ngoài tại Việt  Nam, Công Ty chúng tôi luôn nhận được sự quan tâm và tin tưởng từ phía khách hàng bởi uy tín và chất lượng của sản phẩm tạo ra.    ";
  }
  else if (filterItem === 'inox'){
    document.getElementById("activity").innerHTML = "Là đơn vị nhiều năm kinh nghiệm trong lĩnh vực gia công bồn inox, gia công bồn trộn, gia công bồn công nghiệp, gia công bồn khuấy, gia công bồn gia nhiệt, …chúng tôi luôn luôn sáng tạo không ngừng thiết kế các mẫu bồn mới và theo yêu cầu của khách hàng . Tùy theo nhu cầu sử dụng và dung dịch cần chứa đựng khác nhau và yêu cầu của khách hàng, mà công ty chúng tôi đưa ra thiết kế phù hợp với những kích thước và ứng dụng khác nhau nhằm đáp ứng cho các nhu cầu chế biến thực phẩm, xử lý nước thải, cũng như chứa đựng và sử dụng cho nhiều tính năng khác nhau trong nghành công nghiệp thực phẩm cũng như hóa chất.";
  }
  else if (filterItem === 'nghiep'){
    document.getElementById("activity").innerHTML = "Để đảm bảo cho nghành sản xuất phát triển ngoài việc không ngừng đổi mới cải tiến trang thiết bị, máy móc, và kỹ thuật, thì việc bảo trì hệ thống công nghiệp để đảm bảo hệ thống sản xuất vận hành là một hoạt động trọng yếu ,trong quá trình sử dụng lâu dài máy móc thiết bị cũng như hệ thống trở nên hư hỏng và suy yếu ảnh hưởng đến tiến độ và sản xuất  của xí nghiệp, vì vậy việc bảo trì thường xuyên và đúng định kỳ sẽ đem lại nhiều lợi ích hiệu quả như : tăng tuổi thọ cho máy móc thiết bị ,giảm chi phí thay thế , nâng cao năng xuất, tăng tính an toàn, giúp hệ thống máy móc vận hành tốt hơn, với đội ngũ kỹ sư tay nghề cao nhiều năm kinh nghiệm, Công ty chúng tôi luôn đề ra những ý kiến, phương pháp tối ưu  giúp cho xí nghiệp, nhà máy  khắc phục những hệ thống, máy móc thiết bị suy yếu tăng khả năng vận hành cũng như sản xuất cho các xí nghiệp được tốt nhất. ";
  }
  else{
    document.getElementById("activity").innerHTML = ''
  }
}