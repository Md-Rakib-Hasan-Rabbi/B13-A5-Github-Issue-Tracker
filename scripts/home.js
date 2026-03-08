const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => displayIssues(data.data))
}


const displayIssues = (issues) => {
    const issuesContainer = document.getElementById('IssuesContainer');
    issuesContainer.innerHTML = '';
    issues.forEach(issue => {
        console.log(issue);
        const issueElement = document.createElement('div');
        issueElement.innerHTML = `<div class="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
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
                    <span class="bg-red-50 text-red-500 border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold">
                        ${issue.labels[0]}
                    </span>
                    <span class="bg-orange-50 text-orange-500 border border-orange-100 px-3 py-1 rounded-full text-[10px] font-bold">
                        ${issue.labels[1]}
                    </span>
                </div>
            </div>

            <div class="border-t border-gray-100 p-4 bg-slate-50/50">
                <p class="text-slate-400 text-xs">#${issue.id} by ${issue.author}</p>
                <p class="text-slate-400 text-xs">${issue.createdAt}</p>
            </div>
        </div>`;
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


loadIssues();