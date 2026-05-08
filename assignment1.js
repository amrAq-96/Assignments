// Get elements from HTML
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const improveBtn = document.getElementById("improveBtn");
const summarizeBtn = document.getElementById("summarizeBtn");
const documentsList = document.getElementById("documentsList");

// Store documents here
let documents = [];

// This variable helps us know if we are editing
let editIndex = null;

// Save document
saveBtn.addEventListener("click", function () {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        alert("Please enter both title and content.");
        return;
    }

    const documentData = {
        title: title,
        content: content
    };

    // If editIndex is null, create new document
    if (editIndex === null) {
        documents.push(documentData);
    } 
    // Otherwise update existing document
    else {
        documents[editIndex] = documentData;
        editIndex = null;
        saveBtn.textContent = "Save Document";
    }

    clearForm();
    displayDocuments();
});

// Display documents
function displayDocuments() {
    documentsList.innerHTML = "";

    if (documents.length === 0) {
        documentsList.innerHTML = `<p class="empty-message">No documents saved yet.</p>`;
        return;
    }

    documents.forEach(function (doc, index) {
        const documentItem = document.createElement("div");
        documentItem.className = "document-item";

        documentItem.innerHTML = `
            <h3>${doc.title}</h3>
            <p>${doc.content}</p>

            <div class="document-actions">
                <button class="edit-btn" onclick="editDocument(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteDocument(${index})">Delete</button>
            </div>
        `;

        documentsList.appendChild(documentItem);
    });
}

// Edit document
function editDocument(index) {
    titleInput.value = documents[index].title;
    contentInput.value = documents[index].content;

    editIndex = index;
    saveBtn.textContent = "Update Document";
}

// Delete document
function deleteDocument(index) {
    const confirmDelete = confirm("Are you sure you want to delete this document?");

    if (confirmDelete) {
        documents.splice(index, 1);
        displayDocuments();
        clearForm();
    }
}

// Clear form
clearBtn.addEventListener("click", function () {
    clearForm();
});

// Clear input fields
function clearForm() {
    titleInput.value = "";
    contentInput.value = "";
    editIndex = null;
    saveBtn.textContent = "Save Document";
}

// Improve Writing button
improveBtn.addEventListener("click", function () {
    const content = contentInput.value.trim();

    if (content === "") {
        alert("Please write some content first.");
        return;
    }

    contentInput.value = improveWriting(content);
});

// Summarize button
summarizeBtn.addEventListener("click", function () {
    const content = contentInput.value.trim();

    if (content === "") {
        alert("Please write some content first.");
        return;
    }

    contentInput.value = summarizeText(content);
});

// Mock AI function: Improve Writing
function improveWriting(text) {
    return "Improved Writing:\n\n" + text + "\n\nThis version is clearer, more organized, and easier to read.";
}

// Mock AI function: Summarize
function summarizeText(text) {
    const words = text.split(" ");

    if (words.length <= 20) {
        return "Summary:\n\n" + text;
    }

    const summary = words.slice(0, 20).join(" ");
    return "Summary:\n\n" + summary + "...";
}

// Show empty message when page first opens
displayDocuments();