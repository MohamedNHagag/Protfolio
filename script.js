const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileNavLinks = document.querySelector('.mobile-nav-links');
const closeMenuButton = document.querySelector('.close-menu-button');

// فتح وإغلاق القائمة
if (mobileMenuButton && mobileNavLinks && closeMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileNavLinks.classList.add('open');
        document.body.classList.add('blur');
    });

    closeMenuButton.addEventListener('click', () => {
        mobileNavLinks.classList.remove('open');
        document.body.classList.remove('blur');
    });

    // إغلاق عند الضغط خارج القائمة
    document.addEventListener('click', function (event) {
        if (mobileNavLinks.classList.contains('open')) {
            if (!mobileNavLinks.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileNavLinks.classList.remove('open');
                document.body.classList.remove('blur');
            }
        }
    });
}


// تغيير أيقونة الوضع الداكن
function updateToggleButtonIcon() {
  if (body.classList.contains('dark-mode')) {
    toggleButton.innerHTML = '<span class="icon sun-icon">☀️</span>';
  } else {
    toggleButton.innerHTML = '<span class="icon moon-icon">🌙</span>';
  }
}





// قم بتحديث الأيقونة عند تحميل الصفحة لأول مرة
updateToggleButtonIcon();

// أضف مستمع الحدث للنقر على الزر
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode'); // تبديل كلاس dark-mode على الـ body

  // بعد تبديل الكلاس، قم بتحديث الأيقونة
  updateToggleButtonIcon();
});


// يمكنك أيضاً إضافة logic لحفظ اختيار المستخدم في Local Storage
// ليبقى الوضع الليلي/النهاري مفعلاً حتى بعد إعادة تحميل الصفحة.
// هذا يتطلب قراءة من Local Storage عند تحميل الصفحة وكتابة فيه عند تبديل الوضع.







// مراقبة الأقسام التي تحتوي على الكلاس "animated-section"
const sections = document.querySelectorAll('.animated-section');

const options = {
  root: null, // نراقب التفاعل مع الـ viewport
  threshold: 0.5 // يجب أن يظهر 50% من العنصر في الشاشة ليتم تطبيق الأنيميشن
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // إضافة الكلاس "visible" لبدء الأنيميشن
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // بعد المرة الأولى، لا نحتاج لمتابعة المراقبة
    }
  });
}, options);

// بدء المراقبة على الأقسام المحددة
sections.forEach(section => {
  observer.observe(section);
});


document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuIcon.addEventListener('click', function() {
      navLinks.classList.toggle('open');
  });
});





document.addEventListener('DOMContentLoaded', () => {
  // استهداف كل العناصر التي نريد تحريكها
  const itemsToReveal = document.querySelectorAll('.reveal-item');

  // إعدادات الـ Intersection Observer
  const options = {
      root: null, // يراقب التقاطع بالنسبة للـ viewport
      rootMargin: '0px',
      threshold: 0.1 // نسبة ظهور العنصر لبدء التشغيل (10%)
  };

  // دالة الـ Callback التي تُنفذ عند حدوث تقاطع
  const callback = (entries, observer) => {
      entries.forEach(entry => {
          // إذا كان العنصر متقاطعًا (دخل الشاشة)
          if (entry.isIntersecting) {
              // أضف الكلاس الذي يشغل الأنيميشن
              entry.target.classList.add('visible');
              // (اختياري) أوقف مراقبة هذا العنصر بعد ظهوره لتوفير الموارد
              observer.unobserve(entry.target);
          }
      });
  };

  // إنشاء الـ Observer
  const observer = new IntersectionObserver(callback, options);

  // بدء مراقبة كل عنصر مستهدف
  itemsToReveal.forEach(item => {
      observer.observe(item);
  });
});
