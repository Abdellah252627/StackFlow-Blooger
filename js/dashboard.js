document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Existing Settings
    const blogTitleInput = document.getElementById('blog-title');
    const blogDescInput = document.getElementById('blog-desc');
    const savedTitle = localStorage.getItem('sf_blog_title') || 'StackFlow Blogger';
    const savedDesc = localStorage.getItem('sf_blog_desc') || 'مدونة التقنية الحديثة';

    blogTitleInput.value = savedTitle;
    blogDescInput.value = savedDesc;

    // 2. Template Selection Logic
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            templateCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const template = card.getAttribute('data-template');
            console.log("Template selected:", template);
            localStorage.setItem('sf_blog_template', template);
        });
    });

    // 3. Save Settings Action
    const saveBtn = document.getElementById('save-settings');
    saveBtn.addEventListener('click', () => {
        const title = blogTitleInput.value;
        const desc = blogDescInput.value;
        
        if (!title) {
            alert("يرجى إدخال عنوان للمدونة!");
            return;
        }

        localStorage.setItem('sf_blog_title', title);
        localStorage.setItem('sf_blog_desc', desc);
        
        saveBtn.innerText = 'تم الحفظ!';
        saveBtn.style.background = '#27c93f';
        
        setTimeout(() => {
            saveBtn.innerText = 'حفظ التغييرات';
            saveBtn.style.background = '';
        }, 2000);
    });

    // 4. Create New Blog Action (Mock)
    const createBlogBtn = document.getElementById('create-blog-btn');
    const blogsContainer = document.getElementById('blogs-container');

    createBlogBtn.addEventListener('click', () => {
        const name = prompt("ما هو اسم مدونتك الجديدة؟");
        if (name) {
            const blogItem = document.createElement('div');
            blogItem.className = 'blog-item';
            blogItem.innerHTML = `
                <div>
                    <strong>${name}</strong>
                    <p class="text-muted" style="font-size: 0.8rem;">تم إنشاؤها حديثاً</p>
                </div>
                <button class="btn btn-outline">إدارة</button>
            `;
            blogsContainer.appendChild(blogItem);
            alert(`تم إنشاء مدونة "${name}" بنجاح!`);
        }
    });

    // 5. Sidebar Navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.classList.contains('logout')) {
                // Logout logic
            }
        });
    });
});
