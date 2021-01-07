search.focus();
/*Get All Countries by API with fetch*/
fetch("https://restcountries.eu/rest/v2/all")
    .then(dataRaw => dataRaw.json())
    .then(dataJson => {
        /*Search Function*/
        console.log(dataJson)
        search.oninput = () => {
            ul.innerHTML = "";
            let key = search.value.toLowerCase();

            if (key != "") {
                const filtered = dataJson.filter(country => {
                    let truth = true;
                    for (let i = 0; i < key.length; i++)
                        if (country.name[i].toLowerCase() != key[i] || key.length > country.name.length) {
                            truth = false;
                            break;
                        }
                    return truth
                });


                for (let country of filtered) {
                    const li = document.createElement("li");
                    const img = document.createElement("img");
                    img.src = country.flag;
                    img.alt = country.name;
                    img.title = country.name;

                    const span = document.createElement("span");
                    const spanGreen = document.createElement("span");
                    spanGreen.className = "green";

                    for (let i = 0; i < country.name.length; i++) {
                        if (key[i] == country.name[i].toLowerCase()) spanGreen.textContent += country.name[i];
                        else span.textContent += country.name[i];
                    }

                    li.appendChild(spanGreen);
                    li.appendChild(span);
                    li.appendChild(img);
                    ul.appendChild(li);
                }
            } else ul.innerHTML = "";
        }
    })