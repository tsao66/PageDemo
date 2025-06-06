const { createApp } = Vue;

createApp({
    data() {
        return {
            // 網站基本資訊
            siteName: 'MyWebsite',
            heroTitle: '歡迎來到我們的網站',
            heroSubtitle: '提供專業的服務與優質的體驗',
            aboutText: '我們是一個專業的團隊，致力於提供最優質的服務。擁有豐富的經驗和創新的思維，我們能夠為客戶量身打造最適合的解決方案。無論是網頁設計、系統開發還是數位行銷，我們都能提供專業且有效的服務。',
            
            // 導航狀態
            isScrolled: false,
            isMobileMenuOpen: false,
            
            // 服務項目
            services: [
                {
                    id: 1,
                    icon: '💻',
                    title: '網頁設計',
                    description: '響應式網頁設計，提供最佳的使用者體驗'
                },
                {
                    id: 2,
                    icon: '📱',
                    title: 'APP 開發',
                    description: '跨平台應用程式開發，iOS 和 Android 雙平台支援'
                },
                {
                    id: 3,
                    icon: '🎨',
                    title: 'UI/UX 設計',
                    description: '使用者介面與體驗設計，創造直觀易用的介面'
                },
                {
                    id: 4,
                    icon: '🚀',
                    title: '數位行銷',
                    description: 'SEO 優化、社群媒體行銷，提升品牌知名度'
                },
                {
                    id: 5,
                    icon: '⚙️',
                    title: '系統整合',
                    description: '企業系統整合與自動化解決方案'
                },
                {
                    id: 6,
                    icon: '📊',
                    title: '數據分析',
                    description: '大數據分析與商業智能報表系統'
                }
            ],
            
            // 聯絡資訊
            contactInfo: {
                email: 'info@mywebsite.com',
                phone: '+886-2-1234-5678',
                address: '台北市信義區信義路五段7號'
            },
            
            // 表單資料
            form: {
                name: '',
                email: '',
                message: ''
            }
        }
    },
    
    mounted() {
        // 監聽滾動事件
        window.addEventListener('scroll', this.handleScroll);
        
        // 監聽視窗大小改變
        window.addEventListener('resize', this.handleResize);
        
        // 初始化動畫觀察器
        this.initScrollAnimations();
    },
    
    beforeUnmount() {
        // 清除事件監聽器
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    },
    
    methods: {
        // 處理滾動事件
        handleScroll() {
            this.isScrolled = window.scrollY > 50;
        },
        
        // 處理視窗大小改變
        handleResize() {
            if (window.innerWidth > 768) {
                this.isMobileMenuOpen = false;
            }
        },
        
        // 切換手機選單
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        
        // 平滑滾動到指定區塊
        scrollTo(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                const offsetTop = element.offsetTop - 70; // 減去導航列高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            // 關閉手機選單
            this.isMobileMenuOpen = false;
        },
        
        // 選擇服務項目
        selectService(service) {
            // 顯示服務詳情（可以擴展為模態框）
            alert(`您選擇了：${service.title}\n\n${service.description}`);
        },
        
        // 提交表單
        submitForm() {
            // 驗證表單
            if (!this.form.name || !this.form.email || !this.form.message) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            // 驗證 email 格式
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.form.email)) {
                alert('請輸入有效的 Email 地址');
                return;
            }
            
            // 模擬提交（實際應用中會發送到後端）
            this.showSubmitAnimation();
            
            // 重置表單
            setTimeout(() => {
                this.form = {
                    name: '',
                    email: '',
                    message: ''
                };
                alert('感謝您的訊息！我們會盡快回覆您。');
            }, 1000);
        },
        
        // 顯示提交動畫
        showSubmitAnimation() {
            const button = document.querySelector('.contact-form button');
            const originalText = button.textContent;
            button.textContent = '發送中...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        },
        
        // 初始化滾動動畫
        initScrollAnimations() {
            // 創建 Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // 觀察需要動畫的元素
            const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
            animateElements.forEach(el => {
                observer.observe(el);
            });
        },
        
        // 格式化電話號碼
        formatPhone(phone) {
            return phone.replace(/(\d{4})(\d{3})(\d{4})/, '\$1-\$2-\$3');
        },
        
        // 複製到剪貼板
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('已複製到剪貼板');
            }).catch(() => {
                alert('複製失敗，請手動複製');
            });
        }
    },
    
    computed: {
        // 計算當前年份
        currentYear() {
            return new Date().getFullYear();
        },
        
        // 檢查表單是否有效
        isFormValid() {
            return this.form.name && this.form.email && this.form.message;
        }
    }
}).mount('#app');
