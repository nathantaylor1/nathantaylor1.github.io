function elementFromHTML(html) {
    /* Turn PlainText HTML into an HTMLElement. */
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

const results = [];
// Create the "See More" Button
const SeeMoreButton = elementFromHTML(
    `<button onclick="DisplayMoreResults()" id="see-more" class="pt-8 text-center font-header text-2xl font-semibold uppercase text-primary">
        More projects.
        <i class="bx bx-chevron-down hidden text-primary md:block"></i>
    </button>`)
const buttons = document.getElementById("portfolio-buttons");
buttons.appendChild(SeeMoreButton);

function ShowHideButton() {
    buttons.style.display = results.length > 0 ? "relative" : "none";
}
// Display Results
const div = document.getElementById("portfolio-items");
function DisplayMoreResults() {
    var len = results.length
    for (var i = 0; i < len && i < 4; i += 1) {
        div.append(results.shift())
    }
    ShowHideButton();
}
// Gather Results
fetch("/assets/content/portfolio.json")
    .then(response => response.json())
    .then((data) => {
        data.projects.map((project) => {
            const project_html = elementFromHTML(
                `<!-- ${project.name} -->
                <a href="/" class="relative mx-auto transform transition-all hover:scale-105 md:mx-0">
                    <img src="${project.img}" class="w-full shadow" alt="portfolio image" />
                    <div class="absolute w-full h-auto shadow py-1 bottom-0 inset-x-0 bg-primary text-center leading-4">
                        <span class="text-white text-2xl sm:text-lg">${project.name}</span><br>
                        <span class="text-white text-lg sm:text-base">${project.keywords}</span>
                    </div>
                </a>`);
            results.push(project_html);
        });
        DisplayMoreResults();
    })
