const form = document.getElementById("short-form");
const list = document.getElementById("shortened-urls")

const fetchShortenedURL = async () => {
    const response = await fetch("/links");
    const links = await response.json();

    console.log("Links:", links);

    list.innerHTML = "";

    for (const [shortCode, url] of Object.entries(links)){
        const li = document.createElement('li');
        const truncatedURL = url.length >= 30 ? `${url.slice(0,30)}...`: url ;
        li.innerHTML =`<a href="/${shortCode}" target="_blank">${window.location.origin}/${shortCode}</a> - ${truncatedURL}`
        list.appendChild(li)
    }
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const url = formData.get("url");
    const shortCode = formData.get("shortCode");

    try {
        const response = await fetch("/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, shortCode }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Form submitted successfully");
            form.reset();
            fetchShortenedURL();
        } else {
            alert(data.message || "Something went wrong");
        }
    } catch (error) {
        alert("Something went wrong");
        console.error(error);
    }
});

fetchShortenedURL();