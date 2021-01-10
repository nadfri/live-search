/*Get All Countries by API with fetch*/
fetch("https://restcountries.eu/rest/v2/all")
    .then(dataRaw => dataRaw.json())
    .then(dataJson => {
        //console.log(dataJson);
        /*Display all Country*/
        btnAll.onclick   = () => {
            ul.innerHTML = ""; //clear List
            display(dataJson);
        };

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
    });


/*Function filter array*/
function filterArray(array, key) 
{
    const filtered = array.filter(country => 
    {
        let truth = true;
        for (let i = 0; i < key.length; i++)
        {
            if (country.name[i].toLowerCase() != key[i] || key.length > country.name.length) 
                return false; //if false test next country
        }

        return truth; //if true, add country in filtered tab
    });

    return filtered; //return the filtered array
}

/*Function display Array*/
function display(array, key) 
{
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