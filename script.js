
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function addNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    if (!title || !content) {
        alert('Please fill in both title and content!');
        return;
    }

    const note = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };


    notes.push(note);
 
    localStorage.setItem('notes', JSON.stringify(notes));
  
    displayNotes();

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

function deleteNote(id) {
   
    notes = notes.filter(note => note.id !== id);
    
    localStorage.setItem('notes', JSON.stringify(notes));
    
    displayNotes();
}

function displayNotes() {
    const container = document.getElementById('notesContainer');

    if (notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">✨</div>
                <p class="empty-state-text">No notes yet. Create your first note above!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3 class="note-title">${escapeHtml(note.title)}</h3>
            <p class="note-content">${escapeHtml(note.content)}</p>
            <p class="note-date">${note.date}</p>
            <button class="btn-delete" onclick="deleteNote(${note.id})">Delete</button>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


displayNotes();

document.getElementById('noteTitle').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('noteContent').focus();
    }
});

document.getElementById('noteContent').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        addNote();
    }
});