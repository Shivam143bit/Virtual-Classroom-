

const classData = [];

        // Function to update dropdown and enrolled classes list
        function updateClassUI() {
            const classDropdown = document.getElementById('classDropdown');
            const enrolledClassesList = document.getElementById('enrolledClassesList');
            const classesList = document.getElementById('classesList');

            classDropdown.innerHTML = '<option selected disabled>Choose a Class to Enroll</option>';
            enrolledClassesList.innerHTML = '';
            classesList.innerHTML = '';

            classData.forEach((cls, index) => {
                // Populate dropdown
                const option = document.createElement('option');
                option.value = index;
                option.innerText = cls.title;
                classDropdown.appendChild(option);

                // Populate enrolled classes list
                if (cls.enrolled) {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item', 'enrolled-class');
                    li.innerHTML = `${cls.title} <span class="badge bg-success">Enrolled</span>`;
                    enrolledClassesList.appendChild(li);
                }

                // Populate classes list with View button
                const liClass = document.createElement('li');
                liClass.classList.add('list-group-item');
                liClass.innerHTML = `
                    ${cls.title}
                    <button class="btn btn-info btn-sm float-end viewBtn" data-index="${index}">View</button>
                `;
                classesList.appendChild(liClass);
            });
        }

        // Add Class Form Submission
        document.getElementById('addClassForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const title = document.getElementById('classTitle').value;
            const liveSessions = document.getElementById('liveSessions').value;
            const recordedLectures = document.getElementById('recordedLectures').value;
            const studyMaterials = document.getElementById('studyMaterials').value;

            if (title && liveSessions && recordedLectures && studyMaterials) {
                classData.push({
                    title,
                    liveSessions,
                    recordedLectures,
                    studyMaterials,
                    enrolled: false,
                });

                document.getElementById('addClassForm').reset();
                updateClassUI();
                alert('Class added successfully!');
            } else {
                alert('Please fill out all fields.');
            }
        });

        // Enrollment Feature
        document.getElementById('enrollBtn').addEventListener('click', () => {
            const selectedClassIndex = document.getElementById('classDropdown').value;
            if (selectedClassIndex !== '') {
                classData[selectedClassIndex].enrolled = true;
                document.getElementById('enrollmentStatus').innerText = `You have enrolled in ${classData[selectedClassIndex].title}`;
                updateClassUI();
            } else {
                alert('Please select a class to enroll.');
            }
        });

        // Real-time Discussion Feature (Mock Commenting System)
        document.getElementById('postCommentBtn').addEventListener('click', () => {
            const newComment = document.getElementById('newComment').value.trim();
            if (newComment) {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment-box');
                commentDiv.innerHTML = `
                    <p>${newComment}</p>
                    <button class="btn btn-sm btn-secondary replyBtn">Reply</button>
                    <div class="comment-reply" style="display:none;"></div>
                    <input type="text" class="form-control replyInput" placeholder="Write a reply" style="display:none;">
                    <button class="btn btn-sm btn-success postReplyBtn" style="display:none;">Post Reply</button>
                `;
                document.getElementById('commentsContainer').appendChild(commentDiv);
                document.getElementById('newComment').value = '';

                // Add Reply Functionality
                const replyBtn = commentDiv.querySelector('.replyBtn');
                const replyInput = commentDiv.querySelector('.replyInput');
                const postReplyBtn = commentDiv.querySelector('.postReplyBtn');

                replyBtn.addEventListener('click', () => {
                    replyInput.style.display = 'block';
                    postReplyBtn.style.display = 'block';
                });

                postReplyBtn.addEventListener('click', () => {
                    const replyText = replyInput.value.trim();
                    if (replyText) {
                        const replyDiv = document.createElement('div');
                        replyDiv.classList.add('comment-reply');
                        replyDiv.innerHTML = `<p>${replyText}</p>`;
                        commentDiv.querySelector('.comment-reply').appendChild(replyDiv);
                        replyInput.value = '';
                        replyInput.style.display = 'none';
                        postReplyBtn.style.display = 'none';
                    }
                });
            } else {
                alert('Please write a comment before posting.');
            }
        });

        // View Button Functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('viewBtn')) {
                const index = e.target.dataset.index;
                const cls = classData[index];
                alert(`Class Title: ${cls.title}\nLive Sessions: ${cls.liveSessions}\nRecorded Lectures: ${cls.recordedLectures}\nStudy Materials: ${cls.studyMaterials}`);
            }
        });

        // Initial UI Update
        updateClassUI();

function displayClasses() {
    const classList = document.getElementById('class-list');

    classes.forEach(classItem => {
        const classCard = document.createElement('div');
        classCard.className = 'col-lg-4 col-md-6 mb-4';

        classCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${classItem.title}</h5>
                    <p class="card-text">${classItem.description}</p>
                    <p class="text-muted">Units: ${classItem.units}</p>
                    <a href="#" class="btn btn-primary">View Class</a>
                </div>
            </div>
        `;

        classList.appendChild(classCard);
    });
}


document.addEventListener('DOMContentLoaded', displayClasses);

 function showLectureDetails() {
    document.getElementById('lecture-details').classList.remove('d-none');
}
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values from the form
    const name = document.getElementById('name').value;
    const courseId = document.getElementById('courseId').value;
    const enrolledClasses = document.getElementById('enrolledClasses').value;
    const personalMobile = document.getElementById('personalMobile').value;
    const parentsMobile = document.getElementById('parentsMobile').value;

    // Update the profile output
    document.getElementById('outputName').innerText = `Name: ${name}`;
    document.getElementById('outputCourseId').innerText = `Course ID: ${courseId}`;
    document.getElementById('outputEnrolledClasses').innerText = `Enrolled Classes: ${enrolledClasses}`;
    document.getElementById('outputPersonalMobile').innerText = `Personal Mobile: ${personalMobile}`;
    document.getElementById('outputParentsMobile').innerText = `Parent's Mobile: ${parentsMobile}`;

    // Show profile output
    document.getElementById('profileOutput').style.display = 'block';
});
const classForm = document.getElementById('classForm');
        const submittedClasses = document.getElementById('submittedClasses');

        // Event listener for form submission
        classForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the page from refreshing

            // Get the form values
            const classTitle = document.getElementById('classTitle').value;
            const classIntro = document.getElementById('classIntro').value;
            const classSummary = document.getElementById('classSummary').value;
            const classUnits = document.getElementById('classUnits').value;

            // Create a new class card dynamically
            const classCard = document.createElement('div');
            classCard.classList.add('class-card');
            classCard.innerHTML = `
                <h4>${classTitle}</h4>
                <p><strong>Introduction:</strong> ${classIntro}</p>
                <p><strong>Summary:</strong> ${classSummary}</p>
                <p><strong>Units:</strong> ${classUnits}</p>
            `;

            // Append the new class card to the submitted classes section
            submittedClasses.appendChild(classCard);

            // Clear the form fields
            classForm.reset();
        });