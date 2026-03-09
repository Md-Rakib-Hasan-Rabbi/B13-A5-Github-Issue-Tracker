let allIssues = [];
const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            allIssues = data.data;
            displayIssues(allIssues);
        });

}

document.getElementById('all-btn').addEventListener('click', () => {
    displayIssues(allIssues);
});

document.getElementById('open-btn').addEventListener('click', () => {
    const openIssues = allIssues.filter(issue => issue.status && issue.status.toLowerCase() === 'open');
    displayIssues(openIssues);
});

document.getElementById('closed-btn').addEventListener('click', () => {
    const closedIssues = allIssues.filter(issue => issue.status && issue.status.toLowerCase() === 'closed');
    displayIssues(closedIssues);
});


const displayIssues = (issues) => {
    document.getElementById('issue-count').textContent = `${issues.length} Issues`;
    const issuesContainer = document.getElementById('IssuesContainer');
    issuesContainer.innerHTML = '';
    issues.forEach(issue => {
        const borderClass = issue.status === "open" ? "border-t-4 border-green-400" : "border-t-4 border-purple-400";
        const issueElement = document.createElement('div');
        issueElement.innerHTML = `<div class="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${borderClass}">
            <div class="p-5 flex-grow">
                <div class="flex justify-between items-start mb-4">
                    <img src="./assets/Open-Status.png" alt="Status" class="w-8 h-8">
                    <span class="text-[10px] font-bold px-3 py-1 rounded-full uppercase priority-type">
                        ${issue.priority}
                    </span>
                </div>

                <h2 class="text-slate-800 font-bold text-lg mb-2 leading-tight">
                    ${issue.title}
                </h2>
                <p class="text-slate-500 text-sm mb-4">
                    ${issue.description}
                </p>

                <div class="flex gap-2">
                 ${issue.labels
                .filter(label => label)
                .map(label => `
                  <span class="bg-red-50 text-red-500 border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold">
                  ${label}
                 </span>
              `).join('')}
                </div>
            </div>

            <div class="border-t border-gray-100 p-4 bg-slate-50/50">
                <p class="text-slate-400 text-xs">#${issue.id} by ${issue.author}</p>
                <p class="text-slate-400 text-xs">${issue.createdAt}</p>
            </div>
        </div>`;
        issueElement.firstElementChild.addEventListener('click', () => {
            showIssueModal(issue.id);
        });
        issuesContainer.appendChild(issueElement);

    });

    const priorityTypeElements = document.querySelectorAll('.priority-type');
    priorityTypeElements.forEach(element => {
        const priority = element.textContent.trim().toUpperCase();
        if (priority === 'HIGH') {
            element.classList.add('bg-red-50', 'text-red-500');
        } else if (priority === 'MEDIUM') {
            element.classList.add('bg-yellow-50', 'text-yellow-500');
        } else if (priority === 'LOW') {
            element.classList.add('bg-[#EEEFF2]', 'text-[#9CA3AF]');
        }

    });
}

const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');
const btns = [allBtn, openBtn, closedBtn];

function setActiveButton(activeBtn) {
    btns.forEach(btn => {
        btn.classList.add('btn-outline');
    });
    activeBtn.classList.remove('btn-outline');
}

setActiveButton(allBtn);

btns.forEach(btn => {
    btn.addEventListener('click', function () {
        setActiveButton(btn);
    });
});
async function showIssueModal(issueId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await res.json();
    const issue = data.data;

    document.getElementById('modal-title').textContent = issue.title;

    const statusEl = document.getElementById('modal-status');
    statusEl.textContent = issue.status.charAt(0).toUpperCase() + issue.status.slice(1);
    if (issue.status.toLowerCase() === 'open') {
        statusEl.className = "px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white";
    } else {
        statusEl.className = "px-3 py-1 rounded-full text-xs font-bold bg-purple-500 text-white";
    }

    document.getElementById('modal-author').textContent = `Opened by ${issue.author}`;
    document.getElementById('modal-date').textContent = new Date(issue.createdAt).toLocaleDateString();

    const labelsEl = document.getElementById('modal-labels');
    labelsEl.innerHTML = '';
    (issue.labels || []).forEach(label => {
        if (label) {
            let colorClass = "bg-red-50 text-red-500 border border-red-100";
            if (label.toLowerCase().includes('help')) colorClass = "bg-yellow-50 text-yellow-600 border border-yellow-100";
            labelsEl.innerHTML += `<span class="px-3 py-1 rounded-full text-xs font-bold ${colorClass}">${label}</span>`;
        }
    });

    document.getElementById('modal-desc').textContent = issue.description;
    document.getElementById('modal-assignee').textContent = issue.author;
    const priorityEl = document.getElementById('modal-priority');
    priorityEl.textContent = issue.priority;
    if (issue.priority.toLowerCase() === 'high') {
        priorityEl.className = "ml-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white";
    } else if (issue.priority.toLowerCase() === 'medium') {
        priorityEl.className = "ml-2 px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-white";
    } else {
        priorityEl.className = "ml-2 px-3 py-1 rounded-full text-xs font-bold bg-gray-300 text-gray-700";
    }

    document.getElementById('loadSingleIssue').showModal();
}

loadIssues();

document.getElementById('search-btn').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const filteredIssues = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query)
    );
    displayIssues(filteredIssues);
});