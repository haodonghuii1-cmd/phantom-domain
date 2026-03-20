// 页面滚动动画
document.addEventListener('DOMContentLoaded', function() {
    // 滚动显示动画配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 为子元素添加延迟动画
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // 为不同元素添加不同的动画类
    // 标题动画
    const titles = document.querySelectorAll('.hero-title, .feature-title, .section-title, .specs-title, .cta-title');
    titles.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // 描述文字动画
    const descriptions = document.querySelectorAll('.hero-subtitle, .feature-description, .section-description, .sub-description, .specs-subtitle, .cta-description');
    descriptions.forEach(el => {
        el.classList.add('fade-in-up', 'delay-200');
        observer.observe(el);
    });

    // 卡片动画
    const cards = document.querySelectorAll('.spec-card');
    cards.forEach((el, index) => {
        el.classList.add('fade-in-scale');
        el.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el);
    });

    // 图片动画
    const images = document.querySelectorAll('.character, .showcase1, .showcase2, .product-box');
    images.forEach(el => {
        el.classList.add('fade-in-zoom');
        observer.observe(el);
    });

    // 按钮动画
    const buttons = document.querySelectorAll('.cta-button, .buy-button');
    buttons.forEach(el => {
        el.classList.add('fade-in-up', 'delay-300');
        observer.observe(el);
    });

    // CTA内容动画
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        ctaContent.classList.add('fade-in');
        observer.observe(ctaContent);
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 增强按钮悬停效果
    const allButtons = document.querySelectorAll('.cta-button, .buy-button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 增强视差滚动效果
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Hero 背景视差
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // 角色视差
        const characters = document.querySelectorAll('.character');
        characters.forEach(el => {
            const rect = el.getBoundingClientRect();
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);

            // 保持原有的变换并添加视差
            if (el.classList.contains('character-left') || el.style.transform.includes('scaleX(-1)')) {
                el.style.transform = `translateY(${yPos}px) scaleX(-1)`;
            } else {
                el.style.transform = `translateY(${yPos}px)`;
            }
        });

        // 云朵视差
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            const speed = 0.2 + (index * 0.1);
            cloud.style.transform = `translateX(${scrolled * speed}px) translateY(${scrolled * speed * 0.5}px)`;
        });

        // 产品盒子轻微浮动
        const productBox = document.querySelector('img[alt="Product box"]');
        if (productBox) {
            const float = Math.sin(scrolled * 0.002) * 10;
            productBox.style.transform = `translateY(${float}px)`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // 鼠标跟随效果（仅桌面端）
    if (window.innerWidth > 768) {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                const xPos = (clientX / innerWidth - 0.5) * 20;
                const yPos = (clientY / innerHeight - 0.5) * 20;

                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
                }
            });
        }
    }

    // 添加加载完成后的初始动画
    setTimeout(() => {
        document.querySelector('.hero-title')?.classList.add('visible');
        setTimeout(() => {
            document.querySelector('.hero-subtitle')?.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.cta-button')?.classList.add('visible');
            }, 200);
        }, 200);
    }, 100);
});

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    /* 基础淡入动画 */
    .fade-in {
        opacity: 0;
        transition: opacity 0.8s ease;
    }

    .fade-in.visible {
        opacity: 1;
    }

    /* 从下往上淡入 */
    .fade-in-up {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* 缩放淡入 */
    .fade-in-scale {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-in-scale.visible {
        opacity: 1;
        transform: scale(1);
    }

    /* 放大淡入（用于图片） */
    .fade-in-zoom {
        opacity: 0;
        transform: scale(1.1);
        transition: opacity 1s ease, transform 1s ease;
    }

    .fade-in-zoom.visible {
        opacity: 1;
        transform: scale(1);
    }

    /* 延迟类 */
    .delay-100 { transition-delay: 0.1s !important; }
    .delay-200 { transition-delay: 0.2s !important; }
    .delay-300 { transition-delay: 0.3s !important; }
    .delay-400 { transition-delay: 0.4s !important; }

    /* 角色动画增强 */
    .character {
        transition: transform 0.3s ease;
        will-change: transform;
    }

    /* Hero内容鼠标跟随 */
    .hero-content {
        transition: transform 0.3s ease-out;
    }

    /* 按钮增强动画 */
    .cta-button, .buy-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
    }

    .cta-button:hover, .buy-button:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    /* 云朵动画 */
    .cloud {
        animation: float 20s infinite ease-in-out;
    }

    .cloud-2 {
        animation-delay: -5s;
        animation-duration: 25s;
    }

    .cloud-3 {
        animation-delay: -10s;
        animation-duration: 30s;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(10px) translateX(-10px);
        }
        75% {
            transform: translateY(-10px) translateX(20px);
        }
    }

    /* 产品盒子浮动 */
    img[alt="Product box"] {
        transition: transform 0.3s ease;
    }

    /* 视差背景 */
    .hero-bg {
        will-change: transform;
        transition: transform 0.1s linear;
    }

    /* 规格卡片悬停效果 */
    .spec-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .spec-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    /* 初始状态隐藏元素 */
    .hero-title, .hero-subtitle {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hero-title.visible, .hero-subtitle.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* 移动端优化 */
    @media (max-width: 768px) {
        .fade-in-up {
            transform: translateY(20px);
        }

        .hero-content {
            transition: none;
        }
    }

    /* 性能优化 */
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* 加载动画 */
    @keyframes pulse {
        0% {
            opacity: 0.6;
            transform: scale(0.98);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0.6;
            transform: scale(0.98);
        }
    }
`;
document.head.appendChild(style);