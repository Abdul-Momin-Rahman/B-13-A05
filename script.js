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


const loadIssues = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();
    displayIssues(data.data);
}

const displayIssues = (datalist) => {
    const issueContainer = document.getElementById('issues-container');
    issueContainer.innerHTML = "";


    datalist.forEach(data => {

        const card = document.createElement('div');
        card.className = " bg-white rounded-lg border-t-4 border-[#00A96E] shadow-lg";

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
                    <div class="top border-b border-gray-100 p-4">
                        <!-- top -->
                        <div class="flex justify-between">
                            <img src="./assets/${data.status == 'open' ? 'Open-Status.png' : 'Closed-Status.png'}" alt="">
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


