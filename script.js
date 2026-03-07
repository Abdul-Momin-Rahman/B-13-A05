const loginVerify = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username == "admin" && password == "admin123") {
        window.location.href = "homepage.html";
    }

    else {
        alert('wrong username or password!')
    }
}

const openIssue = [];
const closedIssue = [];
const AllIssue = [];

const showSpinner = () => {
    const Spinner = document.getElementById('spinner');
    const issuesContainer = document.getElementById('issues-container');
    
    Spinner.classList.remove('hidden');
    issuesContainer.classList.add('hidden');

}

const hideSpinner = () => {
    const Spinner = document.getElementById('spinner');
    const issuesContainer = document.getElementById('issues-container');

    issuesContainer.classList.remove('hidden');
    Spinner.classList.add('hidden');
}

const loadIssues = async () => {
    showSpinner();
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const Json = await response.json();
    const data = Json.data;
    data.forEach(data => {

        const StatusIsOpen = data.status == 'open';

        if (StatusIsOpen) {
            openIssue.push(data);
        }
        else {
            closedIssue.push(data);
        }

        AllIssue.push(data);

    });
    displayIssues(AllIssue);
    hideSpinner();
}

const changingTabs = (clickedBtn) => {

    alltabs = document.querySelectorAll('.tabButton');
    const issueCount = document.getElementById('issue-count');

    alltabs.forEach(tab => {
        tab.classList.remove('btn-primary');
        tab.classList.add('btn-outline');
    });

    clickedBtn.classList.remove('btn-outline');
    clickedBtn.classList.add('btn-primary');

    if (clickedBtn.innerText == 'Open') {
        showSpinner();

        setTimeout(() => {
            displayIssues(openIssue);
            issueCount.innerText = openIssue.length;
            hideSpinner();
        }, 2000);
    }
    else if (clickedBtn.innerText == 'Closed') {
        showSpinner();

        setTimeout(() => {
            displayIssues(closedIssue);
            issueCount.innerText = closedIssue.length;
            hideSpinner();
        }, 2000);
    }
    else if (clickedBtn.innerText == 'All') {
        showSpinner();

        setTimeout(() => {
            displayIssues(AllIssue);
            issueCount.innerText = AllIssue.length;
            hideSpinner();
        }, 2000);
    }

}

const loadAllInfo = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url);
    const Json = await response.json();
    displayAllInfo(Json.data);
}

const displayAllInfo = (data) => {


    const allInfoContainer = document.getElementById('all-info-container');

    allInfoContainer.innerHTML

    if (data.priority == 'high') {
        priorityText = 'HIGH';
        classList = 'bg-[#FEECEC] text-[#EF4444]';
    }
    else if (data.priority == 'medium') {
        priorityText = 'MEDIUM';
        classList = 'bg-[#FFF6D1] text-[#F59E0B]';
    }
    else if (data.priority == 'low') {
        priorityText = 'LOW';
        classList = 'bg-[#EEEFF2] text-[#9CA3AF]';
    }

    allInfoContainer.innerHTML = ` <div class="px-5 py-2">

                        <div class="space-y-4">
                            <h2 class="font-bold text-2xl text-[#1F2937]">${data.title}</h2>
                            <div class="flex items-center gap-2">
                                <p class="bg-[#${data.status == 'open' ? '00A96E' : 'A855F7'}] text-white text-xs font-medium px-5 py-1 rounded-4xl flex justify-between items-center]">${data.status}</p>

                                <p class="w-1.5 h-1.5 bg-gray-500 rounded-full"></p>
                                <p class="text-xs text-[#64748B]">Opened by ${data.author}</p>
                                <p class="w-1.5 h-1.5 bg-gray-500 rounded-full"></p>
                                <p class="text-xs text-[#64748B]">${data.createdAt.slice(0, 10)}</p>
                            </div>
                        </div>

                        <div class="flex gap-1 mt-6">
                            <div id="label-container" class="flex gap-1 mt-3">
                            ${data.labels.map(label => `
                                <p
                                class="bg-[#FEF3C7] text-[#B45309] text-xs font-medium px-1 py-1 rounded-xl flex justify-between items-center border border-[#FDE68A]">
                                ${label}</p>
                                `).join('')}
                        </div>
                        </div>

                        <div>
                            <p class="text-[#64748B] font-normal text-base my-6">${data.description}</p>
                        </div>

                        <div class="bg-[#F8FAFC] flex justify-between p-4 gap-2.5 rounded-2xl">
                            <div class="space-y-2">
                                <div class="text-[#64748B] font-normal text-base">Assignee:</div>
                                <div class="font-bold text-[#1F2937]">${data.assignee ? data.assignee : "Not Found!"}</div>
                            </div>

                            <div class="space-y-2">
                                <div class="text-[#64748B] font-normal text-base">
                                    Priority
                                </div>
                                <p  id="priority"
                                class="${classList} text-xs font-medium px-5 py-1 rounded-4xl flex justify-between items-center">
                                ${priorityText}</p>
                            </div>
                        </div>

                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary">Close</button>
                        </form>
                    </div>`;


    document.getElementById('showAllInfo').showModal();
}

const displayIssues = (datalist) => {
    const issueContainer = document.getElementById('issues-container');
    issueContainer.innerHTML = "";


    datalist.forEach(data => {

        const card = document.createElement('div');

        const StatusIsOpen = data.status == 'open';

        card.className = `bg-white rounded-lg border-t-6 border-[#${StatusIsOpen ? "00A96E" : "A855F7"}] shadow-lg cursor-pointer`;


        if (data.priority == 'high') {
            priorityText = 'HIGH';
            classList = 'bg-[#FEECEC] text-[#EF4444]';
        }
        else if (data.priority == 'medium') {
            priorityText = 'MEDIUM';
            classList = 'bg-[#FFF6D1] text-[#F59E0B]';
        }
        else if (data.priority == 'low') {
            priorityText = 'LOW';
            classList = 'bg-[#EEEFF2] text-[#9CA3AF]';
        }

        const labels = data.labels;



        card.innerHTML = `
         <!-- TOP part -->
                    <div onclick="loadAllInfo(${data.id})" class="top border-b border-gray-100 p-4">
                        <!-- top -->
                        <div class="flex justify-between">
                            <img src="./assets/${StatusIsOpen ? 'Open-Status.png' : 'Closed-Status.png'}" alt="">
                            <p  id="priority"
                                class="${classList} text-xs font-medium px-5 py-1 rounded-4xl flex justify-between items-center">
                                ${priorityText}</p>
                        </div>

                        <!-- middle -->
                        <div class="flex flex-col gap-2 mt-3">
                            <h2 class="text-[#1F2937] font-semibold text-sm line-clamp-2 min-h-10">${data.title}</h2>
                            <p class="text-[#64748B] font-normal text-xs line-clamp-2 grow">${data.description}</p>
                        </div>

                        <!-- end -->
                        <div id="label-container" class="flex gap-1 mt-3">
                            ${labels.map(label => `
                                <p
                                class="bg-[#FEF3C7] text-[#B45309] text-xs font-medium px-1 py-1 rounded-xl flex justify-between items-center border border-[#FDE68A]">
                                ${label}</p>
                                `).join('')}
                        </div>
                    </div>

                    <!-- Bottom Part -->
                    <div class="p-4 flex flex-col gap-2">
                        <p class="font-normal text-xs text-[#64748B]">#${data.id} by ${data.author}</p>
                        <p class="font-normal text-xs text-[#64748B]">${data.createdAt.slice(0, 10)}</p>
                    </div>
        `


        issueContainer.append(card);
    });

}

loadIssues();


