// 页面滚动动画 - 调试版本
console.log('Script.js 开始加载...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 加载完成');

    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        /* Hero人物缓慢漂浮动画 */
        .floating-character {
            animation: slowFloat 8s ease-in-out infinite;
            cursor: pointer;
            transition: transform 0.4s ease;
        }

        /* 悬停时暂停动画 */
        .floating-character.hover-pause {
            animation-play-state: paused !important;
        }

        @keyframes slowFloat {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-30px);
            }
        }

        /* 测试用的高亮边框 */
        .debug-highlight {
            outline: 3px solid red !important;
        }
    `;
    document.head.appendChild(style);
    console.log('CSS 样式已注入');

    // Hero区域人物漂浮动画
    const heroCharacters = document.querySelectorAll('.hero-section .character');
    console.log(`找到 ${heroCharacters.length} 个 hero 人物元素`);

    if (heroCharacters.length === 0) {
        // 如果没找到，尝试其他选择器
        const allCharacters = document.querySelectorAll('.character');
        console.log(`找到 ${allCharacters.length} 个所有人物元素`);

        // 检查是否在 hero-section 内
        allCharacters.forEach(char => {
            const inHero = char.closest('.hero-section');
            if (inHero) {
                console.log('找到在 hero-section 内的人物:', char);
                setupFloatingCharacter(char, 0);
            }
        });
    } else {
        heroCharacters.forEach((char, index) => {
            setupFloatingCharacter(char, index);
        });
    }

    function setupFloatingCharacter(char, index) {
        console.log(`设置人物 ${index + 1} 的漂浮效果`);

        // 添加调试高亮
        char.classList.add('debug-highlight');

        // 添加缓慢漂浮的class
        char.classList.add('floating-character');

        // 设置不同的动画延迟
        char.style.animationDelay = `${index * 2}s`;
        console.log(`人物 ${index + 1} 动画延迟: ${index * 2}s`);

        // 鼠标悬停效果
        char.addEventListener('mouseenter', function() {
            console.log(`鼠标进入人物 ${index + 1}`);
            this.classList.add('hover-pause');

            // 获取当前的 transform
            const currentTransform = window.getComputedStyle(this).transform;
            console.log('当前 transform:', currentTransform);

            // 保持原有的transform并添加放大
            if (this.classList.contains('character-left') || this.style.transform.includes('scaleX(-1)')) {
                this.style.transform = 'scale(1.2) scaleX(-1.2)';
                console.log('应用镜像缩放');
            } else {
                this.style.transform = 'scale(1.2)';
                console.log('应用普通缩放');
            }
        });

        char.addEventListener('mouseleave', function() {
            console.log(`鼠标离开人物 ${index + 1}`);
            this.classList.remove('hover-pause');

            // 恢复原有的transform
            if (this.classList.contains('character-left') || this.style.transform.includes('scaleX(-1)')) {
                this.style.transform = 'scaleX(-1)';
            } else {
                this.style.transform = '';
            }
        });

        console.log(`人物 ${index + 1} 设置完成`);
    }

    // 简化的滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 标题和文字动画
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .feature-title, .feature-description');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease';
        observer.observe(el);
    });

    // 添加 visible 类的样式
    const visibleStyle = document.createElement('style');
    visibleStyle.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(visibleStyle);

    console.log('动画设置完成');
});

console.log('Script.js 加载完成');