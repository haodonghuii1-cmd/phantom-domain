// 页面滚动动画
document.addEventListener('DOMContentLoaded', function() {
    // 滚动显示动画配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 处理分层动画（第二、三、四屏）
                if (entry.target.classList.contains('has-layers')) {
                    // 先显示背景层
                    const backgrounds = entry.target.querySelectorAll('.layer-background');
                    backgrounds.forEach((bg, index) => {
                        setTimeout(() => {
                            bg.classList.add('visible');
                        }, index * 200);
                    });

                    // 延迟显示人物层
                    const characters = entry.target.querySelectorAll('.layer-character');
                    characters.forEach((char, index) => {
                        setTimeout(() => {
                            char.classList.add('visible');
                        }, 800 + (index * 200));
                    });
                }
            }
        });
    }, observerOptions);

    // Hero区域人物漂浮动画
    const heroCharacters = document.querySelectorAll('.hero-section .character');
    heroCharacters.forEach((char, index) => {
        // 添加缓慢漂浮的class
        char.classList.add('floating-character');
        // 设置不同的动画延迟，让漂浮不同步
        char.style.animationDelay = `${index * 2}s`;
    });

    // 为第二、三、四屏添加分层动画
    // 第二屏
    const section2 = document.querySelector('.features-section:nth-of-type(2)');
    if (section2) {
        section2.classList.add('has-layers');
        const productBox = section2.querySelector('.product-box');
        const character2 = section2.querySelector('img[alt="Girl with dog"]');
        if (productBox) productBox.classList.add('layer-background', 'fade-in-up');
        if (character2) character2.classList.add('layer-character', 'fade-in-up');
    }

    // 第三屏
    const section3 = document.querySelector('.features-section:nth-of-type(3)');
    if (section3) {
        section3.classList.add('has-layers');
        const showcase1 = section3.querySelector('.showcase1');
        const showcase2 = section3.querySelector('.showcase2');
        const character1 = section3.querySelector('img[alt="Girl character"]');
        if (showcase1) showcase1.classList.add('layer-background', 'fade-in-up');
        if (showcase2) showcase2.classList.add('layer-background', 'fade-in-up', 'delay-200');
        if (character1) character1.classList.add('layer-character', 'fade-in-zoom');
    }

    // 第四屏
    const section4 = document.querySelector('.engineering-section');
    if (section4) {
        section4.classList.add('has-layers');
        const engineeringBg = section4.querySelector('img[alt="Engineering background"]');
        const character3 = section4.querySelector('img[alt="Character in action"]');
        if (engineeringBg) engineeringBg.classList.add('layer-background', 'fade-in');
        if (character3) character3.classList.add('layer-character', 'fade-in-up');
    }

    // 标题和文字动画
    const titles = document.querySelectorAll('.hero-title, .feature-title, .section-title, .specs-title, .cta-title');
    titles.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

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

    // 按钮动画
    const buttons = document.querySelectorAll('.cta-button, .buy-button');
    buttons.forEach(el => {
        el.classList.add('fade-in-up', 'delay-300');
        observer.observe(el);
    });

    // 观察所有section
    document.querySelectorAll('.features-section, .engineering-section, .specs-section, .cta-section').forEach(section => {
        observer.observe(section);
    });

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

    // 按钮悬停效果
    const allButtons = document.querySelectorAll('.cta-button, .buy-button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 简化的视差效果（仅云朵）
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;

        // 云朵轻微移动
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            const speed = 0.1 + (index * 0.05);
            cloud.style.transform = `translateX(${scrolled * speed}px)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Hero区域初始动画（减慢速度）
    setTimeout(() => {
        document.querySelector('.hero-title')?.classList.add('visible');
        setTimeout(() => {
            document.querySelector('.hero-subtitle')?.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.cta-button')?.classList.add('visible');
            }, 400);
        }, 400);
    }, 300);
});

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    /* 基础淡入动画 */
    .fade-in {
        opacity: 0;
        transition: opacity 1.2s ease;
    }

    .fade-in.visible {
        opacity: 1;
    }

    /* 从下往上淡入（减慢速度） */
    .fade-in-up {
        opacity: 0;
        transform: translateY(60px);
        transition: opacity 1.2s ease, transform 1.2s ease;
    }

    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* 缩放淡入 */
    .fade-in-scale {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 1s ease, transform 1s ease;
    }

    .fade-in-scale.visible {
        opacity: 1;
        transform: scale(1);
    }

    /* 放大淡入（用于人物） */
    .fade-in-zoom {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 1.5s ease, transform 1.5s ease;
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
    .delay-600 { transition-delay: 0.6s !important; }
    .delay-800 { transition-delay: 0.8s !important; }

    /* Hero人物缓慢漂浮动画 */
    .floating-character {
        animation: slowFloat 8s ease-in-out infinite;
        cursor: pointer;
        transition: transform 0.4s ease;
    }

    .floating-character:nth-child(1) {
        animation-duration: 7s;
    }

    .floating-character:nth-child(2) {
        animation-duration: 9s;
        animation-delay: -2s;
    }

    .floating-character:nth-child(3) {
        animation-duration: 10s;
        animation-delay: -4s;
    }

    /* 悬停时完全停止动画并应用缩放 */
    .floating-character:hover {
        animation: none !important;
        transform: scale(1.1) !important;
    }

    /* 特殊处理镜像的人物 */
    .character-left:hover {
        animation: none !important;
        transform: scale(-1.1, 1.1) !important;
    }

    @keyframes slowFloat {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-30px);
        }
    }

    /* 分层动画初始状态 */
    .layer-background,
    .layer-character {
        opacity: 0;
    }

    .layer-background {
        transform: translateY(40px);
        transition: opacity 1s ease, transform 1s ease;
    }

    .layer-character {
        transform: translateY(60px);
        transition: opacity 1.2s ease, transform 1.2s ease;
    }

    .layer-background.visible,
    .layer-character.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* 特殊处理第三屏人物的镜像 */
    .layer-character[style*="scaleX(-1)"].visible {
        transform: translateY(0) scaleX(-1);
    }

    /* Hero内容动画速度调整 */
    .hero-content {
        transition: transform 0.6s ease-out;
    }

    /* 按钮动画 */
    .cta-button, .buy-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
    }

    .cta-button:hover, .buy-button:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    /* 云朵缓慢飘动 */
    .cloud {
        animation: gentleFloat 30s infinite ease-in-out;
    }

    .cloud-2 {
        animation-delay: -10s;
        animation-duration: 35s;
    }

    .cloud-3 {
        animation-delay: -20s;
        animation-duration: 40s;
    }

    @keyframes gentleFloat {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-10px) translateX(20px);
        }
        50% {
            transform: translateY(5px) translateX(-10px);
        }
        75% {
            transform: translateY(-5px) translateX(15px);
        }
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
        transform: translateY(40px);
        transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
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

        .floating-character {
            animation: none;
        }
    }

    /* 性能优化 */
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
document.head.appendChild(style);