/*Get All Countries by API with fetch*/
fetch("https://restcountries.eu/rest/v2/all")
    .then(dataRaw => dataRaw.json())
    .then(dataJson => {
        //console.log(dataJson);

        /*Search*/
        search.oninput   = () => {
            ul.innerHTML = ""; //clear List
            let keyWord  = search.value.toLowerCase();

            if (keyWord) //if keyWord not null
            {
                const filtered = filterArray(dataJson, keyWord);

                if (filtered.length) display(filtered, keyWord);
                else ul.innerHTML = "<li class='no-result'>No results found...</li>";
            }
        };

        /*Display all Country*/
        btnAll.onclick   = () => {
            ul.innerHTML = ""; //clear List
            display(dataJson);
        };
    });


/*Function filter array*/
function filterArray(array, key) 
{
    let filtered = array;

    for(let i=0; i<key.length; i++) //recursive filter
    {
        filtered = filtered.filter(country => { 
            if (country.name[i].toLowerCase() == key[i]) 
                return true; //if country, add it to filtered
        });
    }

    return filtered;
}

/*Function display Array*/
function display(array, key) 
{
    if(key == null) key = ""; //need it to use display All country

    for (let country of array) 
    {
        const li = document.createElement("li");
        const spanContainer = document.createElement("span");
        const img = document.createElement("img");
        img.src = country.flag;
        img.alt = country.name;
        img.title = country.name;

        const span = document.createElement("span");
        const spanGreen = document.createElement("span");
        spanGreen.className = "green";

        for (let i = 0; i < country.name.length; i++) 
        {
            if (key[i] == country.name[i].toLowerCase()) 
                 spanGreen.textContent += country.name[i];
            else span.textContent += country.name[i];
        }

        spanContainer.appendChild(spanGreen);
        spanContainer.appendChild(span);
        li.appendChild(img);
        li.appendChild(spanContainer);
        ul.appendChild(li);
    }
}