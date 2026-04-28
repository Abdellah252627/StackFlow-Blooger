document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Quill Editor
    const quill = new Quill('#editor-content', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'direction': 'rtl' }],                         
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
            ]
        },
        placeholder: 'اكتب سحر منطق البرمجة هنا...',
    });

    // Set default direction to RTL
    quill.format('direction', 'rtl');
    quill.format('align', 'right');

    // 2. Handle Image Upload (Preview only for now)
    const imageInput = document.getElementById('post-image');
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Image selected:", file.name);
            // In a real app, upload to Firebase Storage
        }
    });

    // 3. Publish Post
    const publishBtn = document.getElementById('publish-post');
    publishBtn.addEventListener('click', () => {
        const title = document.getElementById('post-title').value;
        const category = document.getElementById('post-category').value;
        const content = quill.root.innerHTML;

        if (!title || quill.getText().trim().length === 0) {
            alert("يرجى إدخال العنوان والمحتوى أولاً!");
            return;
        }

        console.log("Publishing Post...", { title, category, content });
        
        // Success Feedback
        publishBtn.innerText = 'جاري النشر...';
        publishBtn.disabled = true;

        setTimeout(() => {
            alert("تم نشر المقال بنجاح! (عرض تجريبي)");
            window.location.href = 'index.html';
        }, 1500);
    });

    // 4. Save Draft (Local Storage)
    const saveDraftBtn = document.getElementById('save-draft');
    saveDraftBtn.addEventListener('click', () => {
        const draft = {
            title: document.getElementById('post-title').value,
            content: quill.root.innerHTML
        };
        localStorage.setItem('sf_draft', JSON.stringify(draft));
        alert("تم حفظ المسودة محلياً.");
    });
});
